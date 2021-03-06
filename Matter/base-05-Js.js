'use strict';

/* ================================_______________________ fUNCTIONS PART __________________________================================== */

/*==========================  Closures  ====================================================*/
// Automatically happens in some situations
// Any function always has acess to the varible enviromental of the execution context
// The variable enviromental attached to the function excltly as it was at the time and place the functionwas created
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking(); // Even though the function birth place was gone booker can remember their variables because closure

booker(); // Even though the function was alredy executed the return function passengerCount++ can acess the passengerCount variable
booker();
booker();

console.dir(booker); // Visualization of closure and more

// More examples
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // Even defined outside we can acess - acess a variable
console.dir(f);

// Re-assingning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    // Independent of boardPassengers function but can acess all variables in variable enviroment that was created
    console.log(`We are boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000); // Timer - excecute a function after a declared time, in this case one second * wait

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // Closure have priority of scope chain so perGroup still 180 / 3, if we remove const perGroup = n / 3; so it will be 1000
boardPassengers(180, 3);

/*==========================  Immediately Invoked Function Expressions (IIFE) ====================================================*/

/* // Function that run only one time
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
// IIFE Put function inside () and after use () to call it
(function () {
  console.log('This will never run again');
  const isPrivate = 23; // Private data, encapsulated (IMPORTANT!)
})();
// console.log(isPrivate);

(() => console.log('This will never run again'))();

{
  // So block are more effective than IIFE but we can't use var iside them
  const isPrivate = 23; // Private data
  var notPrivate = 46; // NOT private because var
}
// console.log(isPrivate);
console.log(notPrivate); */

/*========================== The Call, Apply and Bind Methods ====================================================*/

/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function(){}
  book(fligthNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${fligthNum}`
    );
    this.bookings.push({ Flight: `${this.iataCode}${fligthNum}`, name });
  },
};

lufthansa.book(239, 'Tiago Assunção');
lufthansa.book(635, 'Will Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // Book function
// DOES NOT work
// book(23, 'Sara Williams');

// Call Method - (this , fligthNum, name) - Define what is the 'this.' of the function. Use the same property
book.call(eurowings, 23, 'Sara Williams');
book.call(lufthansa, 239, 'Mary Blood');
console.log(lufthansa);
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Aplly method - Basic iqual to Call method but receive just this keyword and a array of arguments
const flightData = [583, 'George Maison'];
book.apply(swiss, flightData);
// OR with call
book.call(swiss, ...flightData);
// console.log(swiss);

// Bind method
// book.call(eurowings, 23, 'Sara Williams');
// Creat a new function and the this keyword are always set to 'eurowings'
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steve Williams');
// console.log(eurowings);

// Creat a function just for EW23 - just need the name
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Tiago Assunção');
bookEW23('Vittoria Zapella');
//console.log(eurowings); */

// ===================================================

/* // With Event Listener
lufthansa.planes = 300;
lufthansa.buyplanes = function () {
  this.planes++;
  console.log(this.planes);
  console.log(this);
};
// lufthansa.buyplanes();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyplanes.bind(lufthansa)); // Just lufthansa.buyplanes this keyword poits to te button, element who calls, using bind we set this to lufthansa

// Partial Aplication
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // We set parameter 'rate' to 0.23, must be the first argument
// addVAT = value => value + value * rate;
console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23)); */

/*========================== Functions Returning Functions ====================================================*/

/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeteHey = greet('hey');

greeteHey('Tiago');
greeteHey('Steve');

greet('Hello')('Tiago');

// Doing with arrow functions
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('I luv')('Vittoria'); */

/*========================== Functions Accepting Callback Functions ====================================================*/

/* const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function - In this case higher-order = transformer, callback = fn
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // Functions have methods and properties, '.name'
};

transformer('JavaScript is the best!', upperFirstWord); // Just pass the the function value, NOT calling!
transformer('JavaScript is the best!', oneWord);

// JS uses call-back ALL the time!
const high5 = function () {
  console.log('✋🏾');
};

document.body.addEventListener('click', high5);

// Another Examples
['Tiago', 'Vittoria', 'Stive'].forEach(high5);

const sum = function (a, b) {
  console.log(a + b);
};
const subtraction = function (a, b) {
  console.log(a - b);
};
const multiplication = function (a, b) {
  console.log(a * b);
};
const division = function (a, b) {
  console.log(a / b);
};
const mathTwoVariables = function (a, b, fn) {
  fn(a, b);
};
mathTwoVariables(4, 5, sum);
mathTwoVariables(4, 5, subtraction);
mathTwoVariables(4, 5, multiplication);
mathTwoVariables(4, 5, division); */

/*========================== First-Class and Higher-Order Functions ====================================================*/

/* 
First-class functions (concept): Functions are treadted as values, functions are just another type of objects.
Functions = Values: We can store them in variables like function epressions (const add = (a, b) => a + b) or Object methods. Or pass functions as arguments to another functions like DOM manipulation (when this button is clicked execute this function). Or return a function from functions
So we have methods for functions as Objects like (bind)

Higher-order functions (practice): Function that receives a function as a argument (function (High-order function), when this button is clicked execute this another function (callback function)) or a function that return a function
*/

/*========================== How Passing Arguments Works: Value vs. Reference ====================================================*/

/* const flight = 'LH234'; // Primitive type (String)
const tiago = {
  // Reference type (Object)
  name: 'Tiago Assunção',
  passport: 5434241412998,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 5434241412998) {
    alert('Check in');
  } else alert('Wrong passport!');
};
// checkIn(flight, tiago);
// console.log(flight);
// console.log(tiago);

// Is the same as doig...
// const flightNum = flight; // Creat another variable that is a copy pf flight variable so we just change the copy, not the flight variable
// const passenger = tiago; // Reference copy the path/way/reference of object, so affects the object, in this case tiago

const newPassaport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};
newPassaport(tiago); // Changing tiago passport
checkIn(flight, tiago); // Alert wrong passport, cause we have a new tiago.passport now */

/*========================== Functions default parameters ====================================================*/

/* const bookings = [];

const creatBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers //to do this must be after numPassengers
) {
  // ES6 default way ^
  // ES5 Old way to get default values
  //numPassengers = numPassengers || 1; // Using or operator working with boleans
  //price = price || 199;

  const booking = {
    flightNum, // = to (flightNum = fligthNum)
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(bookings);
};
creatBooking('LH123');
creatBooking('TA445', 2, 800);
creatBooking('TH8585', 2);
creatBooking('FR234', undefined, 1000); // Use undefined to set to default value, skip paramether */

/* ================================_______________________ STRINGS PART __________________________================================== */

/*========================== Strings Part 3 ====================================================*/
/* // Split and Join
console.log('a+very+nice+string'.split('+')); // Split string
console.log('Tiago Assunção'.split(' '));

const [firstName, lastName] = 'Tiago Assunção'.split(' ');

console.log(['Mr.', firstName, lastName.toUpperCase()].join(' ')); // Join strings

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1)); - one way uppercasing te first letter + rest of the word
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // Replacing first letter for first letter uppercased
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('Jessica ann smith davis');
capitalizeName('tiago assunção');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+')); // (Length we want to the string, with what we want to complete padding)

// Masking credit card
const maskCreditCard = function (number) {
  const str = String(number);
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(21873987489));
console.log(maskCreditCard('832048471768216382'));

// Repeat
const message2 = 'Bad weather... All Departues Deplayed...';
console.log(message2.repeat(10));

const planeInLines = function (n) {
  console.log(`Thera are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planeInLines(5);
planeInLines(3);
planeInLines(12); */

/*========================== Strings Part 2  ====================================================*/

/* const airline = 'TAP Air Portugal';
console.log(airline.toLowerCase()); // Lowercase
console.log(airline.toLocaleUpperCase()); // Uppercase

// Fix capitalization in name
const passenger = 'jOnAs'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toLocaleUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing Email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

//const lowerEmail = loginEmail.toLocaleLowerCase();
//const trimmedEmail = lowerEmail.trim(); // Remove espaces, have trim start and trim end
//console.log(trimmedEmail);

// In one step
const normalizedEmail = loginEmail.toLocaleLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); // Replace
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // Just replace the first
console.log(announcement.replaceAll('door', 'gate')); // Replace All
// OR
console.log(announcement.replace(/door/g, 'gate')); // /door/g = global

//Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); // Methods similar to arrays
console.log(plane.includes('Boeing')); // If contains
console.log(plane.startsWith('Air')); // Start with

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of the NEW Airbus family'); // Good at decisions made based on the string content

// Practice exercise - Checking baggage
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection'); */

/*========================== Strings Part 1  ====================================================*/

/* const airline = 'TAP air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(Number(plane[1]));
console.log(plane[2]);
console.log(plane[3]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // indexof = position number
console.log(airline.lastIndexOf('r')); // lats position (of 'r')
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // slice() = Get part of an string - Return new string
console.log(airline.slice(4, 7)); // End on 7, this case on the espace

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Slice - beginning last word string + 1 to remove espace, finishing nothing, goes ultil final

console.log(airline.slice(-2)); // Start from the end
console.log(airline.slice(1, -1)); // Star position 2 ende in position last -1

const checkMiddleSeat = function (seat) {
  // B and E are the meddle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('Thats a middle seat ✈ 😥')
    : console.log('Thats not a middle seat ✈ ✈️');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E'); // Works because Js convert that string primitive to string object with same content, and in thet object methods are call - BOXING

console.log(new String('jonas')); // Object
console.log(typeof new String('jonas'));
console.log(typeof new String('jonas').slice(1)); // Turns back to string
 */
