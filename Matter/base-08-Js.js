//// OPP Object-Oriented Programming ////
'use strict';

/// Constructor Functions and the new Operator ///

// Initializate with Capital letters
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this ↓ => cause creat a function to every object created
  // this.calcAge = function () {
  //   console.log(2021 - this.birthYear);
  // };
};

// Calling constructor with 'new'
// What happen => 1. New empty {} object is created
// 2. function is called, this (keyword) = {}
// 3. New object {} is linked to a prototype
// 4. function automatically return {}
const jonas = new Person('Jonas', 1991);
console.log(jonas);

const tiago = new Person('Tiago', 2001);
const jack = new Person('Jack', 1975);
console.log(tiago, jack);

console.log(jonas instanceof Person); // Checkinh if is a instance of function constructor
const jay = { firstName: 'Jay', birthYear: 1999 };
console.log(jay instanceof Person);

/// Prototypes ///

// All objects creat by the constructor function inherit (acces) all methods and properties
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  // Do this -> creat only one copy of this function => that objects can acess (ihnreritance)
  console.log(2021 - this.birthYear);
}; // ↓
jonas.calcAge();
tiago.calcAge();

console.log(tiago.__proto__); // prototype of object
console.log(tiago.__proto__ === Person.prototype); // prototype of object === prototype property of constructor function
console.log(Person.prototype.isPrototypeOf(tiago)); // Checking if is a prototype of an object
console.log(Person.prototype.isPrototypeOf(Person)); // Person.prototype means => Prototype Of Linked Objects

// Setting properties
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, tiago.species);

// Own property => declared on object itself NOT on Prototype property (ihnreted)  ↓
console.log(tiago.hasOwnProperty('firstName')); // Checking own property
console.log(tiago.hasOwnProperty('species')); // Checking own property
