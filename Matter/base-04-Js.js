'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object literals
  openingHours,

  // Better sintax of functions in object literals
  order(StarterIndex, mainIndex) {
    // Give the object as an single argument, and destructuring in 'function ()' - the order is not important
    return [this.starterMenu[StarterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({
    starterIndex = 1, // '=1' default value
    mainIndex = 0,
    time = '20:00',
    addres,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${addres} at ${time}`
    );
  },

  // Usual function in object
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicius pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngridients) {
    console.log(mainIngredient);
    console.log(otherIngridients);
  },
};

/*========================== Which Data Structure to use ???  ====================================================*/

// Sources of Data: [1, From the program itself (Status mesages)] [2, From the UI (From web page - input or from DOM)] [3, From external sources (API)]
// We use data structure to collect Data - We have 4 to decide
// 1) Simple list = Array or Sets - Just values whithout description
// 2) Key/Values pairs - We have a way to describe values
// Most commun source API, come in JSON, can be convert - we use keys so thats why it's comes in objects
// Arrays VS. Sets :
// Arrays: when need to store values in order and this values might contain duplicade, manipulate dat
// Sets: only be use when working with unique values, when high performance is really important, remove duplicate values from arrays
// Objects VS. Maps
//Objects: traditional, easy to write and acess data - So if need functions as values(methods) and use this key word, use to work with JSON
//Maps: better performace, any data type - So when simple need to map keys with values and keys that are not strings

/*========================== Maps: Interation ====================================================*/

/* const question = new Map([
  //arr of arrs
  ['question', 'What is the best programming language in the word?'],
  [1, 'c'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again :('],
]);

console.log(question); // Work like Object.entries, so we can conver object to maps

// Convert Object to map
console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours)); // Objects are not iterable so use .entries to convert
console.log(hourMap);

// QUIZ APP
// Using for loop because maps are iterables
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`); // if type of key iqual number
}
//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer)); // cl(question.get(boolean))

  // answer === question.get('correct')
  //? console.log(question.get(true))
  //: console.log(question.get(false)); // Made in my way
 
// Convert map to arrar
console.log([...question]);
console.log(question.entries());
console.log(...question.keys());
console.log(question.values()); */

/*========================== Maps ====================================================*/
/* // Like Objects, but key can be any type( String, Number even other maps)
// (key, value)
key: 'Categories';
value: (4)[('Italian', 'Pizzeria', 'Vegetarian', 'Organic')];
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenza, Italy');
rest.set(2, 'Lisbon, Portugal');
console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :('); // Value can be anything
console.log(rest.get('name')); // Get and Read Date - .get
console.log(rest.get(true));
console.log(rest.get(1));

const time = 22;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // Two boolean values creating another boolean c.loging the bolean value - ('We are open :D')
console.log(rest.has('categories'));
rest.delete(2);
//rest.clear();

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading'); // We can use Oject as map keys, usefull in DOM elements, that are especial type of object
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr)); */

/*========================== Sets ====================================================*/
/* const ordersSet = new Set([
  //Unique and no index (no way getting values out of Set)
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // Duplicade values gone, like arrays are iterables, order are irrelevant
console.log(new Set('Tiago'));

console.log(ordersSet.size); // In this case how many different meals we have

console.log(ordersSet.has('Pizza')); // Show if contains
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread'); // Add
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto'); // Delete
//ordersSet.clear(); // Delete all
console.log(ordersSet);

// Iterable, so we can loop over them
for (const order of ordersSet) console.log(order);

//Example - remove duplicade values of arrays
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; // Just staff, cause is alredy a iterable
// Spread operator work in all iterables - Converting Set in Array
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); // Show how many different works we have in arr

console.log(new Set('Tiago').size); // how many different letters are in my name (String is also a iterable) */
