import "../styles/gameOver.css"

export default function GameOver({ res, handleRestart }) {
  const [classNm,text] = res === 1?["win","You Won"]:["lose","You Lost"];
  return (
    <div className="overlay">
      <div className={classNm}>
        <p className="result">{text}</p>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}
