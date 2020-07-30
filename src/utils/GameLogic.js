

const GameLogic = {

	shuffleArray(array) {
		return array.sort(() => Math.random() - 0.5);
	},

	randomizeEasyMode(cardList) {
		// this method randomizes which dimension is dropped when Easy mode is On

		// randomly select dropped dim 0-3
		let dropDim = Math.floor(Math.random() * 4);
		// randomly select what that dropped dim should be fixed to
		let fixedDim = Math.floor(Math.random() * 3);

		
		let newCardList = []
		for(let ii=0; ii<cardList.length; ii++) {
			//calculate card dims based on card numbers
			let newDim = this.calcCardDim(cardList[ii])
			// drop first dim, which is the default 0 value
			newDim.shift();
			// insert a 0 in the dropDim spot to make it the dropped dimension
			newDim.splice(dropDim, 0, fixedDim)

			// calculate new card num based on dims
			let cardNum = newDim[0]*27 + newDim[1]*9 + newDim[2]*3 + newDim[3] + 1;

			// insert into newCardList array
			newCardList.push(cardNum);
		}

		return(newCardList);

	},

	dealCards(numCards, easyMode=false) {

		//if easy mode is enabled, reduce number of cards to 27 (3-dim)
		let deckSize = 81;
		if(easyMode){
			deckSize = 27;
		}

		var cardList = [];
		while(cardList.length < numCards){
		    var newCardNum = Math.floor(Math.random() * deckSize) + 1;
		    if(cardList.indexOf(newCardNum) === -1) cardList.push(newCardNum);
		}

		// randomize dropped dim
		if(easyMode){
			cardList = this.randomizeEasyMode(cardList);
		}

		return(cardList)   
	},

	// calcCardDims(cardList) {
	// 	let cardDims = []
	// 	for (var i = 0; i < cardList.length; i++) {
	// 	  let x = cardList[i] - 1;
	// 	  let d1 = parseInt(x/27);
	// 	  let d2 = parseInt((x-27*d1)/9);
	// 	  let d3 = parseInt((x-27*d1-9*d2)/3);
	// 	  let d4 = x%3;

	// 	  let newDims = [d1,d2,d3,d4];
	// 	  // console.log('Card number:')
	// 	  // console.log(cardList[i])
	// 	  // console.log('Card dimensions:')
	// 	  // console.log(newDims)

	// 	  cardDims.push(newDims)
	// 	}
	// 	return cardDims;
	// },

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
	 },

	 getRandomSet() {
	 	// this function generates a single random matching set
	 	var deckSize = 81;
	 	// select random value for first card
	 	var firstCard = Math.floor(Math.random() * deckSize) + 1;
	 	// initialize second card as null
	 	var secondCard = null
	 	// use while loop to ensure second card is not the same as first
	 	while(secondCard == null || secondCard == firstCard) {
	 		secondCard = Math.floor(Math.random() * deckSize) + 1;
	 	}
	 	// find the third card that completes the set
	 	var firstCardDims = this.calcCardDim(firstCard)
	 	var secondCardDims = this.calcCardDim(secondCard)
	 	var thirdCardDims = []

	 	// define possible dim values
	 	const dimVals = [0,1,2]

	 	for(let ii=0; ii < 4; ii++) {
	 		// if dims of first two cards are different, find the third
	 		if(firstCardDims[ii] != secondCardDims[ii]) {
	 			// put dims of 1st and 2nd cards in array for filtering
		 		let foundDims = [firstCardDims[ii], secondCardDims[ii]]
		 		// find match dim using filter
		 		let newDim = dimVals.filter( ( el ) => !foundDims.includes( el ) );
		 		// add to thirdCardDims
		 		thirdCardDims = thirdCardDims.concat(newDim);
		 		console.log(`-----dim #${ii+1}-----`)
		 		console.log(`first card dim: ${foundDims[0]}`)
		 		console.log(`second card dim: ${foundDims[1]}`)
		 		console.log(`matching dim: ${newDim[0]}`)
	 		} else {
	 			// otherwise, make the third the same
	 			let newDim = firstCardDims[ii];
		 		// add to thirdCardDims
		 		thirdCardDims = thirdCardDims.concat(newDim)
	 		}
	 		
	 	}

	 	// convert thirdCard dims back to cardnum
	 	let thirdCard = 27*thirdCardDims[0] + 9*thirdCardDims[1] + 3*thirdCardDims[2] + thirdCardDims[3] + 1;
	 	console.log([firstCard, secondCard, thirdCard])
	 	console.log([firstCardDims, secondCardDims, thirdCardDims])
	 	return([firstCard, secondCard, thirdCard]);
	 }



};

export default GameLogic;