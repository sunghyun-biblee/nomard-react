import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  // ?: 의미는 photo는 필수값이 아니다 라고 설정하는것
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}
const Wrapper = styled.div``;
export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  //react에서 이것은 tweets 배열이고, 기본값은 빈 배열이라고 알려줌
  const fetchTweets = async () => {
    // 1. 쿼리생성 > 어떤 트윗을 원하는지에 대한 쿼리를 생성
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    // db안에 tweets이라는 폴더안의 내용을 , createAt을 기준으로 내림차순 정렬한다.

    const resultSnapshot = await getDocs(tweetsQuery);
    // 해당 쿼리를 실행하면 QuerySnapshot을 결과값으로 받음

    const tweets = resultSnapshot.docs.map((doc) => {
      // 쿼리에서 반환된 각 문서내부의 데이터를 console로 출력
      // map은 map내의 함수에서 반환한 항목을 가지고 배열을 만들어줌

      const { photo, tweet, userId, username, createAt } = doc.data();
      console.log(doc.data());
      return {
        photo,
        tweet,
        userId,
        username,
        createAt,
        id: doc.id,

        //id는 데이터에 있는것이 아닌 document에 있기때문에 doc.id로 지정
      };
    });
    console.log(tweets);
    setTweet(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet}></Tweet>
        // props로 key는 tweet.id를 넘겨주고 나머지 데이터들도 {...tweet}으로 넘겨줌
      ))}
    </Wrapper>
  );
}
