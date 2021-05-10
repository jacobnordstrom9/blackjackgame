/**
 * 1. 52 cards
 *  ace, 2,3,4,5,6,7,8,9,10,jack,queen,king
 *  4 suits; diamond, heart, club, spade
 *  each card is given a value
 *  match an image to each card
 *  
 */

var suits = ["spade","diamonds","clubs","hearts"];
var values = ["ace" ,"2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
var deck = new Array();


function getDeck(){
	for(var i = 0; i < suits.length; i++){
		for(var x = 0; x < values.length; x++){
            var weight = parseInt(values [x]);
            if (values[x] == "jack" || values[x] == "queen" || values[x] == "king")
                weight = 10;
            if (values [x] == "ace")
                weight == 11;
			var card = {Value: values[x], Suit: suits[i], Weight: weight, Image: `./images/${value[x]}_of_${suits[i]}`
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
    for (var i = deck.length - 1; i > 0; i--) {
     var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[x];
        deck[x] = temp;
    }
    return deck;
}

