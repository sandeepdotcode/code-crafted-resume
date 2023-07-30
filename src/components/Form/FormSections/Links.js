import useFormStore from "../../../store";

function Links() {
  const [ links, setLinks ] = useFormStore((state) => [
    state.links,
    state.setLinks
  ]);
  const { web, linkedin, github } = links;

  const handleChange = (e) => {
    const [ item, type ] = e.target.name.split('-');
    setLinks({
      links: {
        ...links,
        [item]: {
          ...links[item],
          [type]: e.target.value,
        },
      },
    });
  };

  return (
    <div className="link-container">
      <div className="link-div">
        <p>Website</p>
        <label>
          <span>URL</span><input type="text" name="web-link" placeholder="https://www.johndoe.com"
             value={web.link} onChange={handleChange}></input>
        </label>
        <label>
          <span>Text</span><input type="text" name="web-text" placeholder="johndoe.com"
             value={web.text} onChange={handleChange}></input>
        </label>
      </div>
      <div className="link-div">
        <p>LinkedIn</p>
        <input type="text" name="linkedin-link" placeholder="https://www.linkedin.com/john-doe-123"
           value={linkedin.link} onChange={handleChange}></input>
        <input type="text" name="linkedin-text" placeholder="john-doe-123" 
          value={linkedin.text} onChange={handleChange}></input>
      </div>
      <div className="link-div">
        <p>GitHub</p>
        <input type="text" name="github-link" placeholder="https://www.github.com/johndoe"
           value={github.link} onChange={handleChange}></input>
        <input type="text" name="github-text" placeholder="johndoe" value={github.text} onChange={handleChange}></input>
      </div>
    </div>
  );
}

export default Links;