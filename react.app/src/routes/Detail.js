import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/*  영화들이 렌더링 되고 제목을 클릭하면 영화의 id가 있는 페이지로 넘어가게된다.
  react router가 똑똑한 놈이라 영화 id값을 useparams로 통해 가져올 수 있다.
  가져온 id값으로 해당 영화의 정보를 api로 통해 fetch 해올수있다.
  fetch해서 가져온 값을 usestate에 저장하고 사용함
*/
/* useParams는 리액트에서 라우터 사용시 파라미터 정보를 가져와서 활용할 수 있게 도와주는 함수이다.
1. 파라미터의 값을 url로 통해서 넘겨받은 페이지에서 사용할수있도록해주는 것
2. ex )_파라미터의 값은 Movie.js 에서 Link component안에있는 {id}값을 의미함
*/
function Detail() {
  const { movieid } = useParams();
  const [movie, setMovie] = useState([]);
  const getmovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${movieid}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    console.log(json);
  };
  //useparams로 전달받은 id값을 참조하여 api에서 해당 id의 영화 데이터정보를 가져온다.
  useEffect(() => {
    getmovie();
  }, []);
  console.log(movie);
  return (
    <div>
      <h1>Detail</h1>
      <h2>{movie.title}</h2>
    </div>
  );
}
export default Detail;
