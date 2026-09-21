const util = require("util");

// const obj = {
//   name: "Alice",
//   details: {
//     age: 25,
//     hobbies: ["reading", "coding"],
//   },
// };

// console.log(util.inspect(obj, { depth: 2, colors: true }));



// util.inherits(constructor, superConstructor)
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + " makes a noise.");
};

function Dog(name) {
  Animal.call(this, name);
}

util.inherits(Dog, Animal); // 继承 Animal 的原型方法

Dog.prototype.speak = function () {
  console.log(this.name + " barks.");
};

const d = new Dog("Rex");
d.speak(); // Rex barks.
