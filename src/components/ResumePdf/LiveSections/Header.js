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
      <a target="_blank" href={ "mailto:" + email }>{ email }</a>
      <a href={ links.web.link }>{ links.web.text }</a>
      <a href={ links.linkedin.link }>{ links.linkedin.text }</a>
      <a href={ links.github.link }>{ links.github.text }</a>
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