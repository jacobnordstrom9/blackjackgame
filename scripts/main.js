window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load

var suits = ["spades","diamonds","clubs","hearts"];
var values = ["ace" ,"2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];


// Helper Functions //

function getDeck(){
  deck = [];
	for(var i = 0; i < suits.length; i++){
		for(var x = 0; x < values.length; x++){
            var weight = parseInt(values [x]);
            if (values[x] === "jack" || values[x] === "queen" || values[x] === "king")
                weight = 10;
            if (values [x] === "ace")
                weight = 11;
      if (values [x] === "ace") {
      }
			var card = {value: values[x], suit: suits[i], weight: weight
            };
			deck.push(card);
		};
    
	};
	return deck;
};

/** Shuffling
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

function shuffleDeck(deck) {
  console.log('shuffled Deck', deck)
  for (var i = deck.length - 1; i > 0; i--) {
    // console.log("i", i)
   var j = Math.floor(Math.random() * (i + 1));
      var temp = deck[i];
      // console.log("temp", temp)
      deck[i] = deck[j];
      deck[j] = temp;
  }
  return deck;
}

function getCardImage (value, suit){
// console.log("")
// take the 2 cards from dealerHand/playerHand, bring forth the corresponding images from file.

// expected output = '/page/images/5_of_hearts.png'
return `./images/${value}_of_${suit}.png`;
}

let fullDeck =  getDeck()
// console.log('fulldeck', fullDeck)

var myShuffledDeck = shuffleDeck(fullDeck)

// console.log('myshuffleddeck', myShuffledDeck)

// // 1. When deal button is clicked
// - listen for button click
//      - attach an event listener
//      - pop 4 objects from cards array
//           - 2 cards go into dealerHand
//           - 2 cards go into playerHand
const dealButton = document.querySelector("#deal-button")
// console.log(dealButton)
const dealerHandContainer = document.querySelector("#dealer-hand")
const dealerPointsContainer = document.querySelector("#dealer-points")
const playerHandContainer = document.querySelector("#player-hand")
const playerPointsContainer = document.querySelector("#player-points")



let playerHand = []; // remove 2 cards from beginning of myShuffledDeck and place in playerHand.
let dealerHand = []; // remove 2 cards from beginning of myShuffledDeck and place in dealerHand.
var playerCount = 0;
var dealerCount = 0;
// console.log('dealerCount starts as: ', dealerCount);


var dealClicked = false


dealButton.addEventListener("click", (e)=>{
  if (dealClicked === false){
    // 1. Push cards to correct variables
    playerHand.push(myShuffledDeck.shift());
    playerHand.push(myShuffledDeck.shift());
    console.log('playerHand', playerHand)

    dealerHand.push(myShuffledDeck.shift());
    dealerHand.push(myShuffledDeck.shift());
    console.log('dealerHand', dealerHand)
    // console.log('dealerHand.length', dealerHand.length)
    
    // 2. Loop through dealerHand, and for each card grab the suit and value,
    //  then use those to generate correct imagesrc, and output images on page
    // console.log('-- Loop begins! -- ')
    for (var i = 0; i < dealerHand.length; i++){
      // console.log('dealerHand[i] = ', dealerHand[i])
      const value = dealerHand[i].value;
      // console.log("each value", value)
      const suit = dealerHand[i].suit;
      // console.log("each suit", suit)/
      const imageSrc = getCardImage(value, suit)
      // console.log('each image', imageSrc);

      // create <img/> element
      var myImage = new Image(100, 200);
      myImage.src = imageSrc
      // console.log(myImage)

      dealerHandContainer.appendChild(myImage)
      // console.log("myImage", myImage)

      // 3. Create a dealerCount variable, that outputs the current total for the cards inside
      // the dealerHand array
      // console.log('dealerCount is: ', dealerCount);
      let weight = dealerHand[i].weight;
      // console.log("weight is: ", weight)
      dealerCount = (dealerCount + weight)
      // console.log("newDealerCount", dealerCount)
      // console.log('--');
      
      // console.log("dealerCount", dealerCount)
    }
    //Dealer Counter 
    var dealerCounterOnScreen = document.createTextNode(`${dealerCount}`);
    // console.log("dealerCounterOnScreen", dealerCounterOnScreen)
    dealerPointsContainer.appendChild(dealerCounterOnScreen)

    // playerHand = [{}, {}]
    for (var i = 0; i < playerHand.length; i++){
      console.log("playerHand", playerHand[i])
      const value = playerHand[i].value;
      // console.log("each value", value)
      const suit = playerHand[i].suit;
      // console.log("each suit", suit)
      const imageSrc = getCardImage(value, suit)
      // console.log('each image', imageSrc);

      var myImage = new Image(100,200);
      myImage.src = imageSrc
      // console.log(myImage)

      //Creating the Counter for the Player
      let weight = playerHand[i].weight;
      // console.log("player weight is :", weight)
      playerCount = (playerCount + weight)
      console.log("playerCount is: ", playerCount)

      playerHandContainer.appendChild(myImage)
    }

    var playerCounterOnScreen = document.createTextNode(`${playerCount}`);
    console.log("playerCountOnScreen", playerCounterOnScreen)
    playerPointsContainer.appendChild(playerCounterOnScreen)

  }
  dealClicked = true;
})

var hitButtonIdentifyer = false

const hitButton = document.querySelector("#hit-button")
hitButton.addEventListener('click', ()=>{
  // if (hitButtonIdentifyer === false){
  //   playerHand.push(myShuffledDeck.shift());
  // }

  // 1. shifts 1 card from shuffled deck into playerHand.
  var hitCard = myShuffledDeck.shift() 
  playerHand.push(hitCard);
  console.log("hitCard", hitCard)

  // 2. Grab new data needed to output image and updated playerCount
  const value = hitCard.value;
  const suit = hitCard.suit;
  const weight = hitCard.weight;

  // 3. Create new image element and add to page
  const imageSrc = getCardImage(value, suit)
  var myImage = new Image(100,200);
  myImage.src = imageSrc
  playerHandContainer.appendChild(myImage)

  // 4. Add the new weights of the hitCard to the playerCounts

  playerCount = (playerCount + weight)
  console.log("playerCount after first hit is: ", playerCount)
  playerPointsContainer.innerText = (`${playerCount}`)

  
  // Need to be able to add images when I hit hit. 
  // be able to hit hit until i hit Stay. 
  const stayButton = document.querySelector("#stay-button")
  // console.log('stayButton', stayButton)

stayButton.addEventListener("click", ()=>{
  console.log('clicked stay')
  hitButtonIdentifyer = true;

  // Player chooses to 'Stay' and the dealer will keep hitting until 17 or more points. anyhting at 16 or below, it will keep hitting. 
  if (dealerCount <= 16){
    // let dealerHandHit = dealerHand
    dealerHand.push(myShuffledDeck.shift());
  }

})




  // for (var i = 1; i < playerHand.length; i++){
  //   console.log("playerHand", playerHand[i])
  //   const value = playerHand[i].value;
  //   console.log("each value", value)
  //   const suit = playerHand[i].suit;
  //   console.log("each suit", suit)
  //   const imageSrc = getCardImage(value, suit)
  //   console.log('each image', imageSrc);

  //   var myImage = new Image(100,200);
  //   myImage.src = imageSrc
  //   console.log(myImage)

  //   playerHandContainer.appendChild(myImage)
  // }

})



const stayButton = document.querySelector("#stay-button")
// console.log(stayButton)


stayButton.addEventListener("click", ()=>{
  // Player chooses to 'stay' and the dealer will keep hitting until 17 or more points. anyhting at 16 or below, it will keep hitting. 
})




function displayDealerCards(){

}

function displayPlayerCards(){

}





hitButton.addEventListener("click", ()=>{

})

stayButton.addEventListener("click", () => {

})










// var players = newArray();
// function createPlayer(num){
//   player = newArray();
//   for(var i = 1; i <= num; i++){
//     var hand = newArray();
//     var player = {Name: "Player" + i, ID: i, Points: 0, Hand: hand};
//     player.push(player);
//   }
// }

})