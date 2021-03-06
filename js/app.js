'use strict';
//===============Global Variables================//

Product.collection = [];
var totalClicks = 0;
var maxClicks = 25;

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//============Constructor======================

function Product(imageSource, caption, clicked = 0, shown = 0) {
  this.clicked = clicked;
  this.shown = shown;
  this.imageSrc = imageSource;
  this.textCaption = caption;

  Product.collection.push(this);
}

// ================Local Storage===================

var productFromLocalStorage = localStorage.getItem('productCollection');
if (productFromLocalStorage !== null) {
  var unstringProduct = JSON.parse(productFromLocalStorage);
  for (var i = 0; i < unstringProduct.length; i++) {
    var prod = unstringProduct[i];
    var clicked = prod.clicked;
    var shown = prod.shown;
    var imageSrc = prod.imageSrc;
    var textCaption = prod.textCaption;
    new Product(imageSrc, textCaption, clicked, shown);
  }

} else {
  new Product('images/bag.jpg', 'Star Wars Luggage');
  new Product('images/banana.jpg', 'Banana Slicer');
  new Product('images/bathroom.jpg', 'TP Stand');
  new Product('images/boots.jpg', 'Rainboots');
  new Product('images/breakfast.jpg', 'All in One Breakfast');
  new Product('images/bubblegum.jpg', 'Meatball Bubble Gum');
  new Product('images/chair.jpg', 'Chair');
  new Product('images/cthulhu.jpg', 'Action Figure');
  new Product('images/dog-duck.jpg', 'A Dog or a Duck');
  new Product('images/dragon.jpg', 'Dragon Meat');
  new Product('images/pen.jpg', 'Utensil Pens');
  new Product('images/pet-sweep.jpg', 'Pet Sweep');
  new Product('images/scissors.jpg', 'Pizza Cutter');
  new Product('images/shark.jpg', 'Shark Sleeper');
  new Product('images/sweep.png', 'Sweep and Crawl');
  new Product('images/tauntaun.jpg', 'Sleeping Bag');
  new Product('images/unicorn.jpg', 'Unicorn Meat');
  new Product('images/usb.gif', 'USB Tentacles');
  new Product('images/water-can.jpg', 'Water the Watering Can');
  new Product('images/wine-glass.jpg', 'Wine Glass');
}


var productImageSection = document.getElementById('product-images');

productImageSection.addEventListener('click', handleClickOnAProduct);

// ================Callback Function================
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

var lastImages = [];

function createRandomNumbers() {
  var firstRandom = pickRandom(0, Product.collection.length);
  var secondRandom = pickRandom(0, Product.collection.length);
  var thirdRandom = pickRandom(0, Product.collection.length);
  while (lastImages.includes(firstRandom)) {
    firstRandom = pickRandom(0, Product
      .collection.length);
  }
  while (secondRandom === firstRandom || lastImages.includes(secondRandom)) {
    secondRandom = pickRandom(0, Product.collection.length);
  }
  while (thirdRandom === firstRandom || thirdRandom === secondRandom || lastImages.includes(thirdRandom)) {
    thirdRandom = pickRandom(0, Product.collection.length);
  }
  lastImages = [firstRandom, secondRandom, thirdRandom];
  return [firstRandom, secondRandom, thirdRandom];
}

function handleClickOnAProduct(event) {
  if (event.target.tagName === 'IMG') {
    totalClicks++;

    var targetSrc = event.target.getAttribute('src');
    for (var i = 0; i < Product.collection.length; i++) {
      if (Product.collection[i].imageSrc === targetSrc) {
        Product.collection[i].clicked++;
        var productCollection = JSON.stringify(Product.collection);
        localStorage.setItem('productCollection', productCollection);

      }
    }
    if (totalClicks === maxClicks) {
      productImageSection.removeEventListener('click', handleClickOnAProduct);
      document.getElementById('product-images').style.display = 'none';
      renderResultList();
      renderChart();
    }
  }
  renderSomeRandomImages(); 
}

renderSomeRandomImages(); 


// =================Render Results====================

function renderResultList() {
  var resultsList = document.getElementById('product-list');

  var listHeader = document.createElement('h3');
  listHeader.textContent = ('Survey Results');
  resultsList.appendChild(listHeader);

  for (var i = 0; i < Product.collection.length; i++) {

    var listContent = document.createElement('li');
    listContent.textContent = 'The ' + Product.collection[i].textCaption + ' received ' + Product.collection[i].clicked + ' votes and was showed ' + Product.collection[i].shown + ' times.';
    resultsList.appendChild(listContent);

  }
}

// ==============Render Chart====================

function chartTotals() {
  Product.productCaption = [];
  Product.productClicks = [];
  Product.productShown = [];
  for (var i = 0; i < Product.collection.length; i++) {
    Product.productCaption.push(Product.collection[i].textCaption);
    Product.productClicks.push(Product.collection[i].clicked);
    Product.productShown.push(Product.collection[i].shown);
  }
}

function renderChart() {
  chartTotals();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.productCaption,
      datasets: [{
        label: 'Times Product Shown',
        data: Product.productShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132,0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Product Votes',
        data: Product.productClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

