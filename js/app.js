/* Show side by side 3 images
track their clicks
after 25 clicks diplay the results of how many clicks each pic received

control image size

show products based on past times shown
don't repeat back to back
don't repeat in a single cycle
don't show the same products next to itself

Randomizing the products shown

Oject needs
how many times its been clicked
how many times its been shown
times clicked/ times shown = percentage of popularity 

*/
'use strict';
//===============Global Variables================//

Product.collection = [];
var totalClicks = 0;
var maxClicks = 5;

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//============Constructor======================//

function Product(imageSource, caption) {
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.textCaption = caption;

  Product.collection.push(this);
}

// Product.productCollection = [];

//==============Products======================//

new Product('images/bag.jpg', 'Star Wars Luggage');
new Product('images/banana.jpg', 'Banana Slicer');
new Product('images/bathroom.jpg', 'TP Stand');
new Product('images/boots.jpg', 'Rainboots');
new Product('images/breakfast.jpg', 'All in One Breakfast');
new Product('images/bubblegum.jpg', 'Meatball Bubble Gum');
new Product('images/chair.jpg', 'Chari');
// new Product('images/cthulhu.jpg', 'Action Figure');
// new Product('images/dog-duck.jpg', 'A Dog or a Duck');
// new Product('images/dragon.jpg', 'Dragon Meat');
// new Product('images/pen.jpg', 'Utensil Pens');
// new Product('images/pet-sweep.jpg', 'Pet Sweep');
// new Product('images/scissors.jpg', 'Pizza Cutter');
// new Product('images/shark.jpg', 'Shark Sleeper');
// new Product('images/sweep.png', 'Sweep and Crawl');
// new Product('images/tauntaun.jpg', 'Sleeping Bag');
// new Product('images/unicorn.jpg', 'Unicorn Meat');
// new Product('images/usb.gif', 'USB Tentacles');
// new Product('images/water-can.jpg', 'Water the Watering Can');
// new Product('images/wine-glass.jpg', 'Wine Glass');



var productImageSection = document.getElementById('product-images');

productImageSection.addEventListener('click', handleClickOnAProduct);

// ================Callback Function================


function createRandomNumbers() {
  var firstRandom = pickRandom(0, Product.collection.length);
  console.log('first new', Product.collection[firstRandom]);

  var secondRandom = pickRandom(0, Product.collection.length);
  console.log('second new', Product.collection[secondRandom]);

  var thirdRandom = pickRandom(0, Product.collection.length);
  console.log('third new', Product.collection.length);

  while (secondRandom === firstRandom) {
    secondRandom = pickRandom(0, Product.collection.length);
    console.log('second new (reroll)', Product.collection[secondRandom]);
  }
  while (thirdRandom === firstRandom || thirdRandom === secondRandom) {
    thirdRandom = pickRandom(0, Product.collection.length);
    console.log('third new (reroll)', Product.collection[thirdRandom]);
  }

  return [firstRandom, secondRandom, thirdRandom];
}

function handleClickOnAProduct(event) {
  console.log('click');
  // debugger;
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    console.log(totalClicks);

    var targetSrc = event.target.getAttribute('src');
    for (var i = 0; i < Product.collection.length; i++) {
      if (Product.collection[i].imageSrc === targetSrc) {
        Product.collection[i].clicked++;
      }
    }
    if (totalClicks === maxClicks) {
      productImageSection.removeEventListener('click', handleClickOnAProduct);
    }
    renderSomeRandomImages();
  }
}

function renderSomeRandomImages() {
  var myRandomNumbers = createRandomNumbers();
  var firstImage = document.getElementById('first-image');
  var firstText = document.getElementById('first-text');
  var secondImage = document.getElementById('second-image');
  var secondText = document.getElementById('second-text');
  var thirdImage = document.getElementById('third-image');
  var thirdText = document.getElementById('third-text');

  var firstProduct = Product.collection[myRandomNumbers[0]];
  firstImage.src = firstProduct.imageSrc;
  firstText.textContent = firstProduct.textCaption;
  firstProduct.shown++;

  var secondProduct = Product.collection[myRandomNumbers[1]];
  secondImage.src = secondProduct.imageSrc;
  secondText.textContent = secondProduct.textCaption;
  secondProduct.shown++;

  var thirdProduct = Product.collection[myRandomNumbers[2]];
  thirdImage.src = thirdProduct.imageSrc;
  thirdText.textContent = thirdProduct.textCaption;
  thirdProduct.shown++;

}

renderSomeRandomImages();

if (totalClicks === maxClicks) {
  document.getElementById('first').style.display = 'none';
  document.getElementById('second').style.display = 'none';
  document.getElementById('third').style.display = 'none';

var resultsList = document.getElementById('product-list');
var listHeader = document.getElementById('h3');
var listContent = document.getElementById('li');

listHeader.textContent = 'Survey Results';
renderSomeRandomImages.appendChild(listHeader);

for (var i = 0; i < Product.collection.length; i++) {

  listContent = document.createElement('li');
  listContent.textContent = 'The image ' + Product.collection[i].imageSrc + 'received ' + Product.collection[i].clicked + ' chosen out of ' + Product.collection[i].shown + ' times shown';
  resultsList.appendChild(listContent);

  if(Product.collection[i].clicked === 1){
    listContent.textContent = 'The image ' + Product.collection[i].imageSrc + ' received ' + Product.collection.clicked + ' voted out of ' + Product.collection[i].shown + ' times shown.';
    resultsList.appendChild(listContent);
  }
}
}
