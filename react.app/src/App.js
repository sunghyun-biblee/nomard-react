import { useState, useEffect } from "react";

function App() {
  const buy = (event) => {
    event.preventDefault();
    setSelectbuy(true);
  };
  const selectMoney = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    setSelectbuy(false);
    setMoney(e.target.value);
    console.log(money);
  };
  const selectCoin = (e) => {
    setSelectbuy(false);
    setGetcoin(e.target.value);
    console.log(e.target.value);
  };
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [selectbuy, setSelectbuy] = useState(false);
  const [getcoin, setGetcoin] = useState();
  useEffect(() => {
    // fetch로 request 보내고 response로 데이터를 받아옴 > 받아온 response를 json 형식으로 변환 > json을 console에 출력
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((Response) => Response.json())
      .then((json) => {
        setCoins(json); // 가져온 데이터를 setcoins에 할당하여 , coins를 변경
        setLoading(false); // 첫 render에만 보여주기위해 값을 가져온이후 false로 변경하여  render 되지않게 함
      });
  }, []);
  return (
    <div>
      {/* coins의 usestate에 기본값을 지정해주지않으면 undefind가 나오므로 
        아무값이 없는 기본값이라도 지정해주어야 h1에서 coins.length를 가져올때 오류가생기지않음
        */}
      <h1>Coins {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <b>Loading..</b>
      ) : (
        <form onSubmit={buy}>
          <select onChange={selectCoin}>
            <option>select coin</option>
            {coins.map((items, index) => (
              <option key={index} value={items.quotes.USD.price}>
                {items.name.toUpperCase()} [{items.first_data_at}] price:$
                {Math.floor(items.quotes.USD.price)}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="금액을 입력해주세요"
            onChange={selectMoney}
            maxLength={9}
          />
          <p>{money} 원 있습니다</p>
          <button>구매하기</button>
          {selectbuy ? (
            <a>구매수량 {parseInt(money / getcoin).toFixed(100)}</a>
          ) : null}
        </form>
      )}
    </div>
  );
}

export default App;
