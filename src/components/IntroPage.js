import './IntroPage.css';

function IntroPage({ isFirstVisit, getStartedFn }) {
  return (
    <div className="intro-container">
      <h1 className="intro-head">
        <span>{'//'}</span>
        <span className="head-text">
        <span>Code </span>
        <span>Crafted </span>
        <span>Resume.</span>
      </span>
      </h1>
      <p className="intro-desc">A free resume builder for developers & software engineers.</p>
      <div className="start-btn-container">
        <button type="button" onClick={getStartedFn} className="get-started-btn">Get Started!</button>
      </div>
    </div>
  );
}

export default IntroPage;