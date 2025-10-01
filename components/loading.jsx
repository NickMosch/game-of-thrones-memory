import "../styles/loader.css";

export default function LoadingScreen() {
  return (
    <>
      <div className="overlay">
        <div className="loader-panel">
            <p>Loading Assets</p>
            <div className="loader-icon"></div>
        </div>
      </div>
    </>
  );
}
