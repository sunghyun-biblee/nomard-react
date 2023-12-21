import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { TextArea } from "./post-tweet-form";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-bottom: 10px;
`;

const Column = styled.div``;
const Username = styled.span`
  display: inline-block;
  font-weight: 600;
  font-size: 15px;
  padding-bottom: 20px;
`;
const Payload = styled.p`
  padding: 10px 0 30px 0;
  font-size: 18px;
`;
const Photo = styled.img`
  border-radius: 10px;
  height: 100px;
  width: 100px;
  border: 15px;
`;
const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 10px;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;
const Imgbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const EditButton = styled.button`
  background-color: rgb(83, 71, 255);
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 10px;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: rgb(1, 0, 10);
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 10px;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;

const EditPhoto = styled.input`
  display: none;
`;
const EditPhotoLabel = styled.label`
  display: inline-block;
  border-radius: 10px;
  margin-top: 10px;
  padding: 7px;
  color: white;
  /* color: #1d9bf0; */
  background-color: #1d9bf0;
  /* background-color: #011f33; */
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [editMode, setEditMode] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [file, setFile] = useState<File | null>(null);

  // 게시물을 삭제하는 함수
  const onDelete = async () => {
    const ok = confirm("게시글을 삭제하시겠습니까?");
    console.log(ok);
    if (!ok || user?.uid !== userId) return;
    // ok에서 취소를 누르면 ok가 true이기때문에 return 함수가 실행 > 방지하고자 !ok
    // 로그인한 유저의 아이디와 게시물의 유저아이디가 같지 않다면 함수종료

    try {
      await deleteDoc(doc(db, "tweets", id));
      // doc()은 어떠한값인지 찾기위해 조회함 db : fireDatabase,"tweets" : 콜렉션 , id: 참조값 > frieDatebase에 있는 tweets 폴더안에 해당 id값을 가진 데이터를 가져옴
      // deleteDoc(doc()) : doc로 조회한 값을 삭제

      /*  deleteDoc의 매개변수는 삭제할 문서에 대한 참조이다 (3개의 인자를 필요로함)
      첫번째는 doc함수를 사용하여 참조할 데이터를 불러옴 > firebase의 인스턴스(db)
      두 번째는 문서가 저장된 경로 
      세 번째는 문서의 ID (문서 id는 타임라인 컴포넌트에서 받아옴 )

      > 문서를 삭제하고싶으니 deleteDoc 함수를 작성하고 매개변수로 doc함수를 통해서
      문서가 어디있는지 찾아 낼 수 있다 > 해당 문서는 db내에 tweets 컬렉션에 있고,
      문서 아이디를 통해 해당 문서를 삭제
      > 그리고 유저가 게시글을 만들때 , 첨부했던 이미지도 삭제해야 한다
      (게시글이 삭제되고 나서도, 첨부된 이미지를 스토리지에 보관하고 싶지 않기 때문)
      post-tweet에서 게시글id와 첨부된이미지id 전부 userid로 저장되었기때문에 userid만 비교하여 게시글과 게시글에 첨부된 이미지를 동시에 삭제 할 수 있다.
      */
      if (photo) {
        // 우선 사진이 있는지 먼저 확인 한 후 사진이 있다면 해당사진에 대한 참조를 받아야한다.
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        // photoref 는 해당사진을 삭제하기위해 사진이 어디있는지 경로를 알기위해 작성한 코드이다.

        await deleteObject(photoRef);
        // deleteObject는 객체를 삭제하기위한 함수
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
    //원한다면 로딩이나 삭제 중인 것을 상태로 만들어봐라
  };
  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setEditTweet(value);
  };
  const onCancel = () => {
    setEditMode((mode) => !mode);
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    console.log(event);
    console.log(files);
    if (files && files.length === 1) {
      if (files[0].size > 1000000) {
        event.target.value = "";
        return alert("Photo size too big! \n you can upload under 1MB");
      }
      alert("변경 완료");
      setFile(files[0]);
    }
  };
  const onEdite = async () => {
    setEditMode((mode) => !mode);
    if (!editMode) return;
    try {
      if (file !== null) {
        //새 이미지 트윗 업데이트
        const locationRef = ref(storage, `tweets/${userId}/${id}`);
        //ref() => 어디에 저장할것인지, 어떤경로에 저장한것인지 작성
        //storage에 선택한 파일이미지를 업로드함

        const result = await uploadBytes(locationRef, file);
        //파일을 어디에 저장할 것인지, 그리고 value
        // 이후 업로드한 이미지의 URL을 받아서 doc에 URL정보를 저장하고싶음

        //uploadBytes(ref > locationRef , data > file)
        const imgUrl = await getDownloadURL(result.ref);
        // getDownloadURL(): firebase/sotrage에서 불러옴 , 해당함수는 result의 퍼블릭 URL을 반환함
        updateDoc(doc(db, "tweets", id), {
          tweet: editTweet,
          imgUrl,
        });
      } else {
        //트윗만 업데이트
        updateDoc(doc(db, "tweets", id), {
          tweet: editTweet,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
      setFile(null);
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {editMode ? (
          <TextArea onChange={onTextChange} value={editTweet}></TextArea>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={onEdite}>
              {editMode ? "save" : "edit"}
            </EditButton>
            {editMode ? (
              <CancelButton onClick={onCancel}>Cancel</CancelButton>
            ) : null}
          </>
        ) : null}
      </Column>
      {editMode ? (
        <>
          <Imgbox>
            <Photo src={photo}></Photo>
            <EditPhotoLabel htmlFor="editfile">Edit photo</EditPhotoLabel>
          </Imgbox>
        </>
      ) : photo ? (
        <Imgbox>
          <Photo src={photo}></Photo>
        </Imgbox>
      ) : null}

      <EditPhoto type="file" id="editfile" onChange={onFileChange}></EditPhoto>
    </Wrapper>
  );
}
