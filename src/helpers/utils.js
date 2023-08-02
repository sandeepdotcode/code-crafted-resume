import uniqid from "uniqid";

function getNewBullet() {
  return { id: uniqid(), text: '' };
}

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

function getProjObj() {
  const bullets = [];
  for (let i = 0; i < 3; ++i) {
    bullets.push(getNewBullet());
  }

  return {
    name: '',
    tech: '',
    code: { text: '', link: '' },
    demo: { text: '', link: '' },
    bullets,
  };
}

export { getNewBullet, getWorkObj, getProjObj };