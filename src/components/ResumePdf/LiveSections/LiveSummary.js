import useFormStore from "../../../store";

function LiveSummary() {
  const summary = useFormStore((state) => state.personal.summary);

  if (summary === '') return null;

  return (
    <div className="live-summary-div">
      { summary }
    </div>
  );
}

export default LiveSummary;