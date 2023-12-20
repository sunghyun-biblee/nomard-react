import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  padding: 10px 0 30px 0;
  font-size: 18px;
`;
const Photo = styled.img`
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
  cursor: pointer;
`;
export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  // 게시물을 삭제하는 함수
  const onDelete = async () => {
    const ok = confirm("게시글을 삭제하시겠습니까?");
    console.log(ok);
    if (!ok || user?.uid !== userId) return;
    // ok에서 취소를 누르면 ok가 true이기때문에 return 함수가 실행 > 방지하고자 !ok
    // 로그인한 유저의 아이디와 게시물의 유저아이디가 같지 않다면 함수종료

    try {
      await deleteDoc(doc(db, "tweets", id));
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
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo}></Photo>
        </Column>
      ) : null}
    </Wrapper>
  );
}
