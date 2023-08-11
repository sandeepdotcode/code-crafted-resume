import useFormStore from "../../../store";
import LiveBullet from "./LiveBullet";

function WorkItem({ work }) {
  const bullets = work.bullets.map((bullet) => (<LiveBullet bulletText={bullet.text} key={bullet.id} />));

  return (
    <>
      <div className="live-sub-head-1">
        <span>{ work.name }</span>
        <span>{ work.duration }</span>
      </div>
      <div className="live-sub-head-2">
        <span>{ work.title }</span>
        <span>{ work.address }</span>
      </div>
      <div className="live-bullet-block">{ bullets }</div>
    </>
  );
}

function LiveWork() {
  const workArray = useFormStore((state) => state.work);

  const workItems = workArray.map((work, index) => (<WorkItem work={work} key={index} />));

  return (
    <>
      <div className="live-heading">WORK EXPERIENCE</div>
      { workItems }
    </>
  );
}

export default LiveWork;

