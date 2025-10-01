class Character{
  constructor(id,clicked = false){
    this.clicked = clicked;
    this.id = id;
  }
}

const data = [
  new Character(0),
  new Character(2),
  new Character(6),
  new Character(7),
  new Character(8),
  new Character(9),
  new Character(14),
  new Character(15),
  new Character(19),
  new Character(21),
  new Character(39),
  new Character(42),
];

const ids = data.map(data=>data.id);

export { data,ids };
