//props로 App.js로 부터 영화의 정보들을 가져온다
//Movie component는 매개변수로 전달받을 properties를 부모 component로부터 받아온다
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Movie({ coverImg, title, summary, genres, id }) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        {/* react에서 원하는 경로로 이동하는 방법은 link component를 사용하여 이동 
        > react의 장점을 살려 로딩되지않고 이동 > 빠르게 반응하는것처럼 보임  */}
        <Link to={`/movie/${id}`}>{title}</Link>
        {/* /movie/${id} 경로에 넘어가는 파라미터의 값은 " ${id} "가 되는것이다 

        <a href="/movie">{title}</a>
         a 태그에 movie로 가는 경로를 줘서 사용가능하지만 이렇게 사용하면 홈페이지가 rende된다. react의 장점을 사용못함*/}
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
