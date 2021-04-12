'use strict';

/* ================================_______________________ fUNCTIONS PART __________________________================================== */

/*========================== Default parameters ====================================================*/

const bookings = [];

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
creatBooking('FR234', undefined, 1000); // Use undefined to set to default value, skip paramether

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
