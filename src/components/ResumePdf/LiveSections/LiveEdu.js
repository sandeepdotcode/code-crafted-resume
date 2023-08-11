import useFormStore from "../../../store";
import LiveBullet from "./LiveBullet";

function Education({ education }) {
  const bullets = education.bullets.map((bullet) => (<LiveBullet bulletText={bullet.text} key={bullet.id} />));

  return (
    <>
      <div className="live-sub-head-1">
        <span>{ education.name }</span>
        <span>{ education.grad }</span>
      </div>
      <div className="live-sub-head-2">
        <span>{ education.degree }</span>
        <span>{ education.address }</span>
      </div>
      <div className="live-bullet-block">{ bullets }</div>
    </>
  );
}

function LiveEdu() {
  const eduArray = useFormStore((state) => state.education);

  const eduItems = eduArray.map((education, index) => (<Education education={education} key={index} />));

  return (
    <>
      <div className="live-heading">EDUCATION</div>
      { eduItems }
    </>
  );
}

export default LiveEdu;

