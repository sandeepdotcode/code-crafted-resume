function AddMoreBtn({ divClass, btnClass, clickHandler }) {
  return (
    <div className={divClass}>
      <button type="button" className={btnClass} onClick={clickHandler}>Add more</button>
    </div>
  )
}

export { AddMoreBtn };
