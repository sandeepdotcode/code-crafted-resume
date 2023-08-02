import useFormStore from "../../../store";

function Interests() {
  const [ certInt, setCertInt ] = useFormStore((state) => [
    state.certInt, state.setCertInt
  ]);

  const handleInputChange = (e) => {
    setCertInt({
      ...certInt,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="interest-container">
      <label className="cert-label"><span>Certificates</span>
        <textarea name="certification" placeholder='' onChange={handleInputChange}
          value={certInt.certification}></textarea>
      </label>
      <label className="soft-skills-label"><span>Skills</span>
        <textarea name="skills" placeholder='' onChange={handleInputChange}
          value={certInt.skills}></textarea>
      </label>
      <label className="interests-label"><span>Interests</span>
        <textarea name="interests" placeholder='' onChange={handleInputChange}
          value={certInt.interests}></textarea>
      </label>
    </div>
  );
}

export default Interests;