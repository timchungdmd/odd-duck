// a local coffee shop wants your help to build a simple application they can ues to record custsomer orders and maintain a record of what has been ordered (for any period of any amount of time).

// create a very simple app that has two components
// -- a way to create an order
//          - form
// -- a way to dispslay the data
//          - lists (ul)

'use strict';

console.log('hi');

// GLOBAL VALUES

// ------ Global variables ------ //

// DOM elements:
const ul = document.querySelector('ul');
const form = document.querySelector('form');

// an array of the instances of our constructor
let drinkOrders = [];

// ------ Constructor ------ //

// name, drink size, milk, drink type

function Drink(name, drinkSize, milk, drinkType) {
  this.name = name;
  this.drinkSize = drinkSize;
  this.milk = milk;
  this.drinkType = drinkType;
}


// ------ prototype methods on our Constructor ------ //

Drink.prototype.renderADrink = function() {
  // created a li
  let li = document.createElement('li');
  // add the content (AKA text)
  // ex: Sheyna ordered a 12oz tea with whole milk
  li.textContent = `${this.name} ordered a ${this.drinkSize}oz ${this.drinkType} with ${this.milk} milk`;
  // appended it to parent
  ul.appendChild(li);
}


// FUNCTIONS

// ------ Global functions ------ //

function makeADrink(name, drinkSize, milk, drinkType) {
  // created the drink
  let myDrink = new Drink(name, drinkSize, milk, drinkType);
  // added the new drink to the drinkOrders array
  drinkOrders.push(myDrink);
  // render the drink on the page:
  myDrink.renderADrink();
}

function storeDrinks() {
  // turn the data into a string
  console.log(drinkOrders);
  let strinfifiedOrders = JSON.stringify(drinkOrders);
  console.log(strinfifiedOrders);
  // put data in localStorage
  // create a key for the data I want to put in local storage
  // "orders" is our key
  localStorage.setItem('orders', strinfifiedOrders);
}

function getDrinks() {
  // check if localstorage has orders?
  // if there are no orders potentialOrders will be null
  let potentialOrders = localStorage.getItem('orders');
  // if it does have orders, unpack them
  if (potentialOrders) {
    // turn it back an array,
    let parsedOrders = JSON.parse(potentialOrders);
    console.log(parsedOrders);
    // POJO — Plain old JavaScript objects
    // reinstantiate — turn them POJOs back into instances of Drink
    // OLD WAY: for (let i = 0; i < parsedOrders.length; i++)
    // NEW WAY: for (let varNameToReferToEachItemInArray of nameOfArray )
    for (let order of parsedOrders) {
      console.log(order);
      let name = order.name;
      let drinkSize = order.drinkSize;
      let milk = order.milk;
      let drinkType = order.drinkType
      //makeADrink(name, drinkSize, milk, drinkType)
      makeADrink(name, drinkSize, milk, drinkType);
    }
  }

}

// ------ Event Handler ------ //

function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  // console.log('submit happened');
  console.log(e.target.name.value);

  // get data from the event (the stuff the user submitted):
  let userName = e.target.name.value;
  let drinkType = e.target.drink.value;
  let milk = e.target.milk.value;
  let size = e.target.drinkSize.value;

  // create an instance of drink using our helper function:
  // Drink(name, drinkSize, milk, drinkType)
  makeADrink(userName, size, milk, drinkType);
  console.log(drinkOrders);

  // put drink in localStorage?
  storeDrinks();
}


// EXECUATBLE CODE

console.log(drinkOrders);
getDrinks()

// ------ Event Listener ------ //

// under the hood, addEventListener will listen for submit event on the form element. When a submit happens, addEventListener will invoke our callback (handleSubmit). And it will pass an arguemnt which is an event object with data about the event that occurred.
form.addEventListener('submit', handleSubmit);
