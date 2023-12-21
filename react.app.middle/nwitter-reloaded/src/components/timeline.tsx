import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  // ?: 의미는 photo는 필수값이 아니다 라고 설정하는것
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #925353;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: gray;
  }
`;
export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  //react에서 이것은 tweets 배열이고, 기본값은 빈 배열이라고 알려줌

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      // 1. 쿼리생성 > 어떤 트윗을 원하는지에 대한 쿼리를 생성
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );
      // db안에 tweets이라는 폴더안의 내용을 , createAt을 기준으로 내림차순 정렬한다.
      /*
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
      });*/

      // 해당 함수는 데이터베이스 및 쿼리와 실시간 연결을 생성하고, 해당 쿼리에서 새 요소가 생성되거나, 요소가 삭제되었거나 또는 업데이트 됐을때 쿼리에 알려줌
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        /* snapshot(정보)을 받게되는데, snapshot의 크기,쿼리,메타데이터,문서,문서의변경사항을 볼 수 있다.
            >> onSnapshot 함수는 unsubscribe(구독취소) 함수를 반환한다
         
         > 이벤트 리스너를 늘 켜놓고 싶지않다.
         > 사용자가 자리를 비우고 별도의 화면으로 이동하면 
         > 이벤트리스너에 대한 구독을 취소해야 한다
         > 계속 켜놓으면  그만큼의 우리가 비용을 지불해야하기때문에
         > 필요할때만 사용가능하도록 변경해보자 (useEffect 사용하기)
         > fetchTweets 함수를 uesEffect 내부로 이동
         > unsubscribe 변수에 구독 취소 함수를 저장
        */
        const tweets = snapshot.docs.map((doc) => {
          // 문서를 보면 이벤트 리스너를 연결시킨다고 적혀져있음
          // 여기서 이벤트란 쿼리에서 무언가가 삭제되거나,추가,업데이트 된 경우를 뜻함
          const { photo, tweet, userId, username, createAt } = doc.data();
          console.log(doc.data());
          return {
            photo,
            tweet,
            userId,
            username,
            createAt,
            id: doc.id,
          };
        });
        // 지금함수는 문서를 한번만 가져오는 대신 쿼리에 리스너를 추가하는 것
        // 무언가 삭제,편집or 생성되었다는 알림을 받으면 해당 쿼리의 문서를 쭉 보면서 우리한테 필요한 데이터를 출력하고 그걸 map으로 배열을 만듬
        // 이후 객체를 생성하고 트윗 객체배열을 tweets 변수에 넣은다음 set 해준다
        console.log(tweets);
        console.log("@@@");
        setTweet(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
      /*  unsubscribe가 참으로 된다면(null이 아니라면) unsubscribe를 부를것이다.
       여기서 동작하는 것은 단순히 useEffet의 teardown, cleanup 기능을 사용하는 것
       타임라인 컴포넌트가 안보일때 clean up이 실행
       
       ex) 유저가 프로필페이지로 이동하면 
           타임라인의 이벤트를 계속 실행시킬 필요가 없다.
           useEffect는 더 이상 타임라인 컴포넌트가 사용되지 않을때
             () => { unsubscribe && unsubscribe() }; 함수를 호출함
        즉, 컴포넌트가 렌더링 되고 , fetchtweets이 작동되면 unsubscribe 변수에는 null이 아닌 value가 들어있는 상태이기때문에 리스너가 작동되지만, 컴포넌트를 벗어 났을때는 unsubscribe값이 기본값인 null로 할당되어있기때문에 리스너가 작동되지않는다.
      */
    };
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
