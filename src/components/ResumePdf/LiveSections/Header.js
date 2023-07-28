import useFormStore from "../../../store";

function PersonalLive() {
  const personalData = useFormStore((state) => state.personal);

  return (
    <>
      <p className="live-name">{ personalData.name }</p>
      <p className="live-title">{ personalData.title }</p>
    </>
  )
}

function Header() {
  return (
    <div className="live-header">
      <PersonalLive />
    </div>
  );
}

export default Header;