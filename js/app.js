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
//===============Global Variables================//
var productCollection = [];
var totalClicks = 0;
var maxClicks = 5;

//============Constructor======================//

function Product(imageSource, caption) {
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.imageCaption = caption;

  productCollection.push(this);
}

new Product('images/pen.jpg', 'Utensil Pens');
new Product('images/bag.jpg', 'Star Wars Luggage');
new Product('images/banana.jpg', 'Banana Slicer');
new Product('images/bathroom.jpg', 'TP Stand');
new Product('images/boots.jpg', 'Rainboots');
new Product('images/breakfast.jpg', 'All in One Breakfast');
new Product('images/bubblegum.jpg', 'Meatball Bubble Gum');



var productImageSection = document.getElementById('product-images');

productImageSection.addEventListener('click', handleClickOnAProduct);

function handleClickOnAProduct(event) {
  console.log('click');
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    if (totalClicks === maxClicks) {
      productImageSection.removeEventListener('click', handleClickOnAProduct);
    }
  }

  var targetSrc = event.target.getAtrribute('src');
  for (var i = 0; i < productCollection.length; i++) {
    if (productCollection[i].imageSrc === targetSrc) {
      productCollection[i].clicked++;
    }
  }
}

renderSomeRandomImages();


function renderSomeRandomImages() {
  var firstRandom = pickRandom(0, productCollection.length);
  console.log('first new', productCollection[firstRandom]);

  var secondRandom = pickRandom(0, productCollection.length);
  console.log('second new', productCollection[secondRandom]);

  var thirdRandom = pickRandom(0, productCollection.length);
  console.log('third new', productCollection.length);

  while (secondRandom === firstRandom) {
    secondRandom = pickRandom(0, productCollection.length);
    console.log('second new (reroll)', productCollection[secondRandom]);
  }
  while (thirdRandom === firstRandom || thirdRandom === secondRandom) {
    thirdRandom = pickRandom(0, productCollection.length);
    console.log('third new (reroll)', productCollection[thirdRandom]);
  }
  return[firstRandom, secondRandom, thirdRandom];
}

var myRandomNumbers = renderSomeRandomImages();

var firstImage = document.getElementById('first-image');
var firstText = document.getElementById('first-text');
var secondImage = document.getElementById('second-image');
var secondText = document.getElementById('second-text');
var thirdImage = document.getElementById('third-image');
var thirdText = document.getElementById('third-text');

firstImage.src = productCollection[myRandomNumbers[0]].imageSrc;
firstText.textContent = productCollection[myRandomNumbers[0]].imageCaption;
productCollection[myRandomNumbers[0]].shown++;

var secondProduct = productCollection[myRandomNumbers[1]];
secondImage.src = secondProduct.imageSrc;
secondText.textContent = secondProduct.imageCaption;
secondProduct.shown++;

var thirdProduct = productCollection[myRandomNumbers[2]];
thirdImage.src = thirdProduct.imageSrc;
thirdText.textContent = thirdProduct.imageCaption;
thirdProduct.shown++;

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
