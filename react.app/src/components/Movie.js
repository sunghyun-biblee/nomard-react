//props로 App.js로 부터 영화의 정보들을 가져온다
//Movie component는 매개변수로 전달받을 properties를 부모 component로부터 받아온다
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({ coverImg, title, summary, genres, id }) {
  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <h2 className={styles.movie__title}>
        {/* react에서 원하는 경로로 이동하는 방법은 link component를 사용하여 이동 
        > react의 장점을 살려 로딩되지않고 이동 > 빠르게 반응하는것처럼 보임  */}
        <Link to={`/movie/${id}`}>{title}</Link>
        {/* /movie/${id} 경로에 넘어가는 파라미터의 값은 " ${id} "가 되는것이다 

        <a href="/movie">{title}</a>
         a 태그에 movie로 가는 경로를 줘서 사용가능하지만 이렇게 사용하면 홈페이지가 rende된다. react의 장점을 사용못함*/}
      </h2>
      <p>
        {summary.length > 235
          ? `${summary.slice(0, 235)} ...!!`
          : summary.length === 0
          ? "Summary none"
          : summary}
      </p>
      {/* summary는 string이기때문에 array method를 사용할 수 있다.
        slice():시작값과 끝값이 필요함 
        ex)summary.slice(0,235) : summary의 문자열을 0부터 235까지 자를것이다
         글자수가 235개 이상이면 235개까지 자른후 "..."을 작성하여 이후에 문자열이 더 있다는걸 암시하게 만들어줌 , 235 미만일때 summary의 문자열을 공백인지 확인 후 공백이라면 Summary none 을 출력 , 공백이 아니라면 summary값을 출력

      */}
      <ul className={styles.movie__genres}>
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
