import PropTypes from "prop-types";
import styles from "./Button.module.css"; // << styles를 js오브젝트로 변환

//css modules > 각 컴포넌트에 따로따로 css 를 적용하고싶을 때 해당 component가있는 jsx 파일에 해당 css 파일을 import 해준다

// css 파일이름에 .module.css 가 무조건 명시되어야 한다

// 스타일을 적용할땐 className을 css에서 작성한 클래스명과 동일하게 작성하여준다 ex) .btn (css파일 내의 클래스이름) => styles.btn (css적용)

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
// };
export default Button;
