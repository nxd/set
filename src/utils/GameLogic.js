

const GameLogic = {

	shuffleArray(array) {
		return array.sort(() => Math.random() - 0.5);
	},

	dealCards(numCards) {
		var cardList = [];
		while(cardList.length < numCards){
		    var newCardNum = Math.floor(Math.random() * 81) + 1;
		    if(cardList.indexOf(newCardNum) === -1) cardList.push(newCardNum);
		}

		return(cardList)   
	},

	calcCardDims(cardList) {
		let cardDims = []
		for (var i = 0; i < cardList.length; i++) {
		  let x = cardList[i] - 1;
		  let d1 = parseInt(x/27);
		  let d2 = parseInt((x-27*d1)/9);
		  let d3 = parseInt((x-27*d1-9*d2)/3);
		  let d4 = x%3;

		  let newDims = [d1,d2,d3,d4];
		  // console.log('Card number:')
		  // console.log(cardList[i])
		  // console.log('Card dimensions:')
		  // console.log(newDims)

		  cardDims.push(newDims)
		}
		return cardDims;
	},

	calcCardDim(cardNum) {
		  let x = cardNum - 1;
		  let d1 = parseInt(x/27);
		  let d2 = parseInt((x-27*d1)/9);
		  let d3 = parseInt((x-27*d1-9*d2)/3);
		  let d4 = x%3;

		  return [d1,d2,d3,d4];
	},

	initializeCard(cardNum) {
		return {
			number: cardNum,
			dims: this.calcCardDim(cardNum),
			active: false,
			success: false,
			fail: false,
			imgSrc: `../../img/card_${cardNum}.png`
		}
	},

	defineCardData(cardList) {
		let cardData = []
		for (var i = 0; i < cardList.length; i++) {
			let card = this.initializeCard(cardList[i]);

			cardData.push(card);
		}

		return cardData;

	},

	allDifferent(array) {
	    var valuesSoFar = [];
	    for (var i = 0; i < array.length; ++i) {
	        var value = array[i];
	        if (valuesSoFar.indexOf(value) !== -1) {
	            return false;
	        }
	        valuesSoFar.push(value);
	    }
	    return true;
	},

	allEqual(array) {
		return array.every( v => v === array[0] )
	},

	isSetinArray(array, item) {
	    for (var i = 0; i < array.length; i++) {
	        // This if statement depends on the format of your array
	        if (array[i][0] === item[0] && array[i][1] === item[1]  && array[i][2] === item[2]) {
	            return true;   // Found it
	        }
	    }
	    return false;   // Not found
	},

	checkMatch(cardList) {

		// loop through dimensions
		for(var dd=0; dd<4; dd++){
			// initialize array of dimensions for card list
			var dimValues = []
			// loop through cards
			for(var cc=0; cc<cardList.length; cc++){
				// get dims for card by number
				let cardDims = this.calcCardDim(cardList[cc])
				// add to list of dim ff for card list
				dimValues.push(cardDims[dd])
			}

			// check if dims are all the same or all different
			if(!this.allEqual(dimValues) && !this.allDifferent(dimValues)){
				// if dimension across cardList is neither all same or all diff, return false
				return false;
			}
		}
		// if never found a dim mismatch until now, then return true
		return true;
	},


	findSets(cardList) {
		// function to find all SETs from a list of card numbers
		var setsFound = [];
	    for(var c1=0; c1<cardList.length; c1++){

	    	for(var c2=0; c2<cardList.length; c2++){

	    		for(var c3=0; c3<cardList.length; c3++){
	    			// only proceed if all are different
	    			if(this.allDifferent([c1,c2,c3])){
	    				var selectedSet = [cardList[c1], cardList[c2], cardList[c3]]
	    				if(this.checkMatch(selectedSet)){
	    					selectedSet.sort(function(a, b){return a-b})
	    					// console.log(`Sets found so far: ${setsFound}`)
	    					// console.log(`New set found: ${selectedSet}`)
	    					// console.log(setsFound)
	    					// console.log(selectedSet)
	    					if(!this.isSetinArray(setsFound, selectedSet)){
	    						setsFound.push(selectedSet)
	    						// console.log(`Added set: ${selectedSet}`)
	    					}
	    					
	    				}
	    
	    			}

	    		}

	    	}

	    }

	    console.log(setsFound);
	    return setsFound;
	 },

	 shuffleDealtCards(cardList, cardData) {
	 	// determine number of cards
	 	let nCards = cardList.length;

	 	// create array for index of cards
	 	let cardOrder = Array.from(Array(nCards).keys());
	 	console.log(cardOrder)
	 	// shuffle order
	 	cardOrder = this.shuffleArray(cardOrder);

	 	//initialize new cardList and cardData
	 	let newCardList = [];
	 	let newCardData = [];
	 	console.log(cardOrder)
	 	//reconstruct lists using new order
	 	for(let ii=0; ii<nCards; ii++) {
	 		newCardList.push(cardList[cardOrder[ii]]);
	 		newCardData.push(cardData[cardOrder[ii]]);
	 	}

	 	// return both new card lists
	 	return [newCardList, newCardData];


	 },


	 findMissingSets(allSets, foundSets) {
	 	// this function returns any unfound SETs, given a list of
	 	// all SET solutions and list of found Sets
	 	// items in sets should already be sorted by this point
	 	// so no additional sorting operations needed

	 	var missingSets = [];

	 	for(let ii=0; ii < allSets.length; ii++) {
	 		if(!this.isSetinArray(foundSets, allSets[ii])){
	 			missingSets.push(allSets[ii]);
	 		}
	 	}

	 	return(missingSets);
	 }



};

export default GameLogic;