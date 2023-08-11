import useFormStore from "../../../store";


function LiveCertInt() {
  const certInt = useFormStore((state) => state.certInt);

  return (
    <>
      <div className="live-heading">
        { certInt.certification !== '' && 'CERTIFICATES' }
        { certInt.certification !== '' && certInt.skills !== '' && ', ' }
        { certInt.skills !== '' && 'SKILLS ' }
        { ((certInt.certification !== '' || certInt.skills !== '') && certInt.interests !== '') && '& '}
        { certInt.interests !== '' && 'INTERESTS' }
      </div>
      <div className="live-cert-block">
        { certInt.certification !== '' && <div className="live-skill-line">
            <div className="live-skill-subheading">Languages:&nbsp;</div>
            { certInt.certification }
          </div>
        }
        { certInt.skills !== '' &&
          <div className="live-skill-line">
           <div className="live-skill-subheading">Skills:&nbsp;</div>
           { certInt.skills }
          </div>
        }
        { certInt.interests !== '' &&
          <div className="live-skill-line">
            <div className="live-skill-subheading">Interests:&nbsp;</div>
            { certInt.interests }
          </div>
        }
      </div>
    </>
  );
}

export default LiveCertInt;
