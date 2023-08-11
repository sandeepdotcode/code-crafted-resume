function LiveBullet({ bulletText }) {
  return (
    <div className="live-bullet">
      <div>•   </div>
      <div>{ bulletText }</div>
    </div>
  );
}

export default LiveBullet;
