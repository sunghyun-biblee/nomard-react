import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
    height: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Tweets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
`;
export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const onAvatarChage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    // 파일이 선택된 태그의 정보
    if (!user) return; //유저의 정보가 없다면 함수 종료
    if (files && files.length === 1) {
      // 파일이 선택되었고, 선택된 파일의 길이(갯수)가 1일떄
      const file = files[0];
      // file 변수에 첫 번째 파일을 할당
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      // 유저 프로필사진을 저장하기위한 경로 지정
      /* 
      "tweets"폴더가이닌 "avatars"폴더에 프로필에 대한 정보를 저장할 수있도록
       > "avatars"폴더에 유저 id로 사진을 업로드함
       위와 같이 작성하면 유저가 프로필사진을 변경해도 동일한 파일 이름을 업로드가 되어 덮어쓰기가 됨
       > 사용자가 이전에 올렸던 이미지는 필요가 없고 변경될할것이기 때문에 
       > 유저는 유저 이미지를 많이 변경하기 때문에 
         한명의 유저를 위해 100개의 이미지를 저장할 필요는 없다
       */
      const result = await uploadBytes(locationRef, file);
      // 업로드
      const avatarUrl = await getDownloadURL(result.ref);
      // 업로드한 해당 url을 가져옴
      setAvatar(avatarUrl);
      // 유저이미지를 <AvatarImg src={avatar} /> 해당 컴포넌트에 출력하기때문에 사진이 변경되면 setAvatar를 해주어 변경된 avatar의 사진을 보여줌
      await updateProfile(user, { photoURL: avatarUrl });
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      //collection()으로 tweets에 있는 모든 게시물을 가져온뒤, where 함수(조건문)을 이용하여 게시글의 유저id와 현재 로그인한 유저 id가 같은 게시물들만 가져온다.(userId가 user?.uid와 같은 것들만)
      orderBy("createdAt", "desc"),
      limit(25) // 모든것을 로드 하지않고, 최대 25개 까지만 로드
    );
    const snapshot = await getDocs(tweetQuery);
    // document의 정보를 가져오는 함수
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {Boolean(avatar) ? (
          <AvatarImg src={avatar ?? ""} />
        ) : (
          // JavaScript의 nullish coalescing 연산자로 avatar가 null or undefined 일 경우 "" (빈 문자열)을 사용하여 경로없음으로 설정
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChage}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Name>
        {/* {user?.displayName?user.displayName:"Anonymous"} */}
        {user?.displayName ?? "Anonymous"}
      </Name>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
        {/* 위와 같이 작성시 console에 오류가 발생하게 되는데 
        이는 Firebase의 데이터베이스인 Firestore를 사용할때 
        이것이 너무 개방적이고 유연하기때문에
        어떤구조의 데이터를 넣을수있고,엄격하게 걸러내지않는다, 
        where문으로 조건을걸어 필터링을 할려고했지만, 
        '해당 조건문으로 필터를 발생할 것'이라고 firestore에 알려줘야한다 
        > (Firestore에 내가 어떤 종류의 필터를 사용할지 알려주어야한다), 
        (firestore는 where문 같은 필터를 바로 제공해주지않는다 
          > firebase가 예상하지 못한 필터를 사용해버렸음 > 그래서 firebase는 우리에게 이것이 어떠한 필터인지 알려달라고하는 오류를 발생시킨 것)
        알려주지못하여 생긴 오류  
        > 오류해결
          1. 콘솔창에 생긴 오류를 보면 링크가 있을 것이다 
          2. 링크에 접속하면 해당 인덱스를 설정할 수 있는 곳으로 갈 수 있다
             (우리는 firebase한테 어떤 종류의 필터를 사용할 것인지 미리 알려줘야함)
          3. index들이 다 적혀져있으니 우리가 할 건 save만 눌러주면 된다
          ---------------------------------------------------------------
          즉, 우리가 하고 있는 일은 데이터베이스에서 필터링 해야 할 것을 
              firebase에 알려주고 있는 것
          따라서 지금부터 firebase와 firestore 데이터베이스가
           이(tweetQuery) 쿼리를 사용 할 것이라는 것을 알게 됨

           <우리가 햇던 방식대로 데이터를 필터링 하려는 경우 그냥 데이터를 가져오는 것 이외에 where 이나 orderby 같은 조건을 사용하여 다른 순서로 가져오고 싶거나 또는 필터링하여 가져오고 싶다면 firebase와 firestore에 어떤식으로 필터링할 것인지 더욱 더 자세하게 알려줘야 한다>
           따라서 firebase, firestore는 해당 조건에 대해 맞지않으면 먼저 인덱스를 만든후 해당 조건을 사용하여 쿼리하는 것이 매우 쉬울것이다 
        */}
      </Tweets>
    </Wrapper>
  );
}
