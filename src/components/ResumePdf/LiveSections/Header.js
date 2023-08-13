import { FaGithub, FaLaptop, FaLinkedin, FaRegEnvelope } from "react-icons/fa6";
import useFormStore from "../../../store";

function PersonalLive() {
  const personalData = useFormStore((state) => state.personal);

  return (
    <>
      <p className="live-name">{ personalData.name }</p>
      <p className="live-title">{ personalData.title }</p>
      <div>
        <p className="live-phone">{ personalData.phone }</p>
        <p className="live-address">{ personalData.address }</p>
      </div>
    </>
  )
}

function LinksLive() {
  const email = useFormStore((state) => state.personal.email);
  const links = useFormStore((state) => state.links);

  return (
    <div className="live-link-line">
      { email !== '' &&
        <a target="_blank" rel="noreferrer" href={ "mailto:" + email }>
          <FaRegEnvelope />
          { email }
        </a> }
      { links.web.link !== '' &&
        <a target="_blank" rel="noreferrer" href={ links.web.link }>
          <FaLaptop />
          { links.web.text }
        </a> }
      { links.linkedin.link !== '' &&
        <a target="_blank" rel="noreferrer" href={ links.linkedin.link }>
          <FaLinkedin />
          { links.linkedin.text }
        </a> }
      { links.github.link !== '' &&
        <a target="_blank" rel="noreferrer" href={ links.github.link }>
          <FaGithub />
          { links.github.text }
        </a> }
    </div>
  )
}

function Header() {

  return (
    <div className="live-header">
      <PersonalLive />
      <LinksLive />
    </div>
  );
}

export default Header;