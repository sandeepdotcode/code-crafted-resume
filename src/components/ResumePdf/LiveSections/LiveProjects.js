import useFormStore from "../../../store";
import LiveBullet from "./LiveBullet";

function Project({ project }) {
  const bullets = project.bullets.map((bullet) => (<LiveBullet bulletText={bullet.text} key={bullet.id} />));

  return (
    <>
      <div className="live-proj-header">
        <span className="live-proj-title">{ project.name }&nbsp;</span>
        <span className="live-proj-stack">- { project.tech }</span>
      </div>
      <div className="live-bullet-block">{ bullets }</div>
      <div className="live-proj-links">
        <p className="live-proj-link-item">
          <span>Code:&nbsp;</span>
          <a href={project.code.link} target="_blank" rel="noreferrer">{ project.code.text }</a>
        </p>
        <p className="live-proj-link-item">
          <span>Demo:&nbsp;</span>
          <a href={project.demo.link} target="_blank" rel="noreferrer">{ project.demo.text }</a>
        </p>
      </div>
    </>
  );
}

function LiveProjects() {
  const projectsArray = useFormStore((state) => state.projects);

  const projects = projectsArray.map((project, index) => (<Project project={project} key={index} />));

  return (
    <>
      <div className="live-heading">PROJECTS</div>
      { projects }
    </>
  );
}

export default LiveProjects;
