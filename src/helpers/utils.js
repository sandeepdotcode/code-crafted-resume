import uniqid from "uniqid";

function getWorkObj(index) {
  const bullets =[];
  for (let i = 0; i < 4 - index; ++i) {
    bullets.push({id: uniqid(), text: ''});
  }

  return {
    name: '',
    title: '',
    duration: '',
    address: '',
    bullets,
  };
}

export { getWorkObj };