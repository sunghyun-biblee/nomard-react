import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  resize: none;
  padding: 20px;
  border-radius: 20px;
  font-size: 20px;
  color: white;
  background-color: black;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  background-color: #011f33;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export default function PostTweetForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };
  //   file은 event.target.value가 아닌 event.files가 있기 때문에 따로작성
  /* 타입이 file인 input이 변경될 때 마다 파일의 배열을 받게된다
    > 왜냐하면 어떤 input은 복수의 파일을 업로드하게 해준다
  */
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    // const {files}에서 input파일을 추출하는데 딱 하나만 있는지 확인하고있음
    // 유저가 단 하나의 파일만 업로드할 수 있도록 하고싶기때문에
    //event.target에는 files가 존재 > 그 후 배열의 첫 번째 파일을 state에 저장
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const user = auth.currentUser;
    if (!user || loading || tweet === "" || tweet.length > 180) {
      // 로그인이 되어있지않거나, 로딩중이거나, tweet 내용이 없거나 내용이 180자 초과한 경우 함수를 바로 종료
      return;
    }
    try {
      setLoading(true); // 포스트 전달중이라는 의미로 loading 을 true로 셋팅
      await addDoc(collection(db, "tweets"), {
        tweet, //작성한 내용
        createdAt: Date.now(), // 작성한 날짜
        username: user.displayName || "Anonymous", // 작성자명
        userId: user.uid, //나중에 작성글을 삭제할때, 글삭제 권한이 있는 유저를 구분하기위하여 해당 게시글을 생성한 사용자의 id를 저장한다, 나중에 유저id와 게시글에 저장된 userid가 일치 한지 확인하기 위해서
      });
      //   firebase sdk에 포함된 addDoc 함수를 사용
      //      > 데이터베이스에 들어갈 새로운 Document를 생성
      // 첫번재 인수는 Collection ,두 번째 인수는 value
      // colleciton은 함수를 사용하여 firebase.ts에 export해둔 db를 선택하고, 여러collection중에 어떤컬렉션을 선택할지 지정하기위해 "tweets"작성
      // value 부분에는 데이터베이스를 insert할때와 비슷하듯이, 어떤값을 넣을건지 작성
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // 포스트를 작성할 수 있다는 의미로 loading을 false
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="what is happening"
      ></TextArea>
      {/* 텍스트를 작성하는 영역 */}
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add Photo"}
      </AttachFileButton>
      {/* 유저가 파일을 첨부하기 위한 클릭버튼 > file라는 id를가진 input을 위한 label*/}
      <AttachFileInput
        onChange={onFileChange}
        id="file"
        accept="image/*"
        type="file"
      />
      {/* 이미지 파일만 받는다 */}
      <SubmitBtn type="submit" value={loading ? "Posting" : "Post Tweet"} />
    </Form>
  );
}

// cloud firestore 사용
// cloud firestore는 우리가 사용할 NoSQL 데이터베이스이다
