'use strict';




// there is a collection of Pickone photos
// user is presented them in 2s — two Pickones photos at a time\
// should be 2 different photos
// user vote on their favorite photo by clicking on it

// 15 match ups per round — so 15 total votes
// display the results of the vote

/*
- Global variables
  score
  count the number of rounds
  some way to count images
  window into DOM
  Pickone array of Pickone instances. ex.: Pickone[randomNumber].src
  Pickone Constructor
    - Pickone photo (src)
    - Pickone photo alt text
    - score - how many times has this Pickone been voted on
    - views - hhow many times did the user see the Pickone
    Pickone Methods
      - change the Pickone image, increment the Pickone's views
      - generate a random number, pass it into my Pickone array
      - check to make sure the Pickone images are different
      - event listener (click) — tally the vote for the Pickone
  create all the instances of Pickone
  After 15 rounds of voting ...?
    - Give the user the results (views and the score)
    - stop voting
    - stop generating new Pickone photos
*/

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


let howManyTimesUserHasVoted = 0;
let maxNumberOfVotes = 15;

// console.log(image2.src);

// image2.src = 'images/sassy-Pickone.jpg';

function Pickone(name, fileExtension = 'jpeg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `images/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
}

let bag = new Pickone('bag');
let banana = new Pickone('banana');
let bathroom = new Pickone('bathroom');
let boots= new Pickone('boots');
let breakfast = new Pickone('breakfast');
let bubblegum = new Pickone('bubblegum');
let chair = new Pickone('chair');
let cthulhu=new Pickone('cthulhu');
let dogduck= new Pickone('dog-duck');
let dragon =new Pickone('dragon');
let pen = new Pickone('pen');
let petsweep=new Pickone('pet-sweep');
let scissors= new Pickone('scissors');
let shark= new Pickone('shark');
let sweep= new Pickone('sweep','png');
let tauntaun= new Pickone('tauntaun');
let unicorn= new Pickone('unicorn');
let watercan= new Pickone('water-can');
let wineglass= new Pickone('wine-glass');

// image2.src = sassy.src;

let allPickones = [bag, banana,bathroom,boots,breakfast, bubblegum,chair,cthulhu,dogduck,dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];
console.log(allPickones);

// image2.src = allPickones[6].src;

function selectRandomPickone() {
  // random number between 0 and length of the array (19)
  // not inclusive
  return Math.floor(Math.random() * allPickones.length);
}

//this function will pick a 3 random numbers, which will be used as index to pickout the imgs from image array.
function renderPickones() {
  let P1 = selectRandomPickone(); 
  let P2 = selectRandomPickone(); 
  let P3 = selectRandomPickone(); 
  console.log(P1, P2, P3);
  //this array will contain the 3 unique images from renderPickones()
  while(P1===P2 || P1===P3 || P2===P3){
    P2 = selectRandomPickone(); 
    P3 = selectRandomPickone(); 
  }


  


 /*  while (Pickone1 === Pickone2) {
    Pickone2 = selectRandomPickone(); // 2
    console.log(Pickone1, Pickone2);
  } */


  image1.src = allPickones[P1].src;
  image1.alt = allPickones[P1].name;
  allPickones[P1].views++;
  // console.log(allPickones[Pickone1]);
  image2.src = allPickones[P2].src;
  image2.alt = allPickones[P2].name;
  allPickones[P2].views++;
  image3.src = allPickones[P3].src;
  image3.alt = allPickones[P3].name;
  allPickones[P3].views++;
}

function renderResults() {
  for (let i = 0; i < allPickones.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allPickones[i].name}: ${allPickones[i].views} views, ${allPickones[i].score} votes`;
    results.appendChild(li);
  }
}


function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image')
  }
  console.log(event.target.alt);
  howManyTimesUserHasVoted++;
  let clickedPickone = event.target.alt;

  for (let i = 0; i < allPickones.length; i++) {
    if (event.target.alt === allPickones[i].name) {
      console.log(allPickones[i]);
      allPickones[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberOfVotes) {
    renderResults();
    myContainer.removeEventListener('click', handleClick);
    r/* esultBtn.className = 'clicks-allowed'; */
    /* resultBtn.addEventListener('click',  */
  } else {
    renderPickones();
  }
}


myContainer.addEventListener('click', handleClick);

renderPickones();