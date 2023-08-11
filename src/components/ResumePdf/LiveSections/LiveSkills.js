import useFormStore from "../../../store";

function SkillItem({ text, index }) {
  if (text === '')
    return null;
  if (index === 0)
    return (<span>&nbsp;{ text }</span>);
  return (<span>, { text }</span>);
}

function Skills() {
  const skills = useFormStore((state) => state.skills);

  const langs = skills.lang.map((skill, index) => (<SkillItem text={skill.text} index={index} key={skill.id} />));
  const frames = skills.frame.map((skill, index) => (<SkillItem text={skill.text} index={index} key={skill.id} />));
  const toolss = skills.tools.map((skill, index) => (<SkillItem text={skill.text} index={index} key={skill.id} />));

  return (
    <div className="live-skill-block">
      <div className="live-skill-line">
        <div className="live-skill-subheading">Languages:</div>
        { langs }
      </div>
      <div className="live-skill-line">
        <div className="live-skill-subheading">Frameworks, Libraries & Databases:</div>
        { frames }
      </div>
      <div className="live-skill-line">
        <div className="live-skill-subheading">Tools & Other Technologies:</div>
        { toolss }
      </div>
    </div>
  );
}

function SimpleSkills() {
  const simpleSkills = useFormStore((state) => state.simpleSkills);

  const skillDivs = simpleSkills.map((skill, index) => (<div key={index}>{ skill.name }</div>));

  return (
    <div className="live-simple-skills">
      { skillDivs }
    </div>
  );
}

function LiveSkills() {
  const isSimpleSkills = useFormStore((state) => state.isSimpleSkills);
  
  return (
    <>
      <div className="live-heading">TECHNICAL SKILLS</div>
      { isSimpleSkills 
        ? <SimpleSkills />
        : <Skills /> }
    </>
  );
}

export default LiveSkills;

