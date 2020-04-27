

const Helper = {

	findWithAttr(array, attr, value) {
	    for(var i = 0; i < array.length; i += 1) {
	        if(array[i][attr] === value) {
	            return i;
	        }
	    }
	    return -1;
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
}

export default Helper