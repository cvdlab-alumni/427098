function f(numbers, n){
	for (var i = 1; i <= n; i++) {
		numbers.push(i);
	};	
	return numbers.filter(function(item, index, array){return item%2===1;})
					.map(function(item, index, array){return item*2;})
					.filter(function(item, index, array){return item%4===0})
					.reduce(function(a,b){return a+b});
}