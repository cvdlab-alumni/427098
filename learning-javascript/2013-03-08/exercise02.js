function pushRandomInteger(array, n){
	var range = 10;
	if (n>0){
		array.push(Math.round(Math.random()*range));
		return f2(array, n-1);
	}
	return array;
}

function getOddNumber(array){
	return array.filter(function(item, index, array){ return item%2!==0; })
}

function smallToLargeSort(array){
	return array.sort()
}

smallToLargeSort(getOddNumber(pushRandomInteger([],10)));