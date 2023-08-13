import useFormStore from "../../store";
import Header from "./LiveSections/Header";
import LiveCertInt from "./LiveSections/LiveCertInt";
import LiveEdu from "./LiveSections/LiveEdu";
import "./LiveSections/LivePreview.css";
import LiveProjects from "./LiveSections/LiveProjects";
import LiveSkills from "./LiveSections/LiveSkills";
import LiveSummary from "./LiveSections/LiveSummary";
import LiveWork from "./LiveSections/LiveWork";

const liveSEctions = {
  skills: LiveSkills,
  work: LiveWork,
  projects: LiveProjects,
  education: LiveEdu,
  certInt: LiveCertInt,
}

function LiveSection({ sectionName }) {
  const Section = liveSEctions[sectionName];

  if (sectionName === 'personal' || sectionName === 'links')
    return null;
  return (<Section />);
}

function LivePreview() {
  const added = useFormStore((state) => state.sections.added);

  const liveSections = added.map((section, index) => (<LiveSection sectionName={section} key={index} />));

  return (
    <div className="live-container">
      <div className="live-sheet">
        <Header />
        <LiveSummary />
        { liveSections }
      </div>
    </div>
  );
}

export default LivePreview;