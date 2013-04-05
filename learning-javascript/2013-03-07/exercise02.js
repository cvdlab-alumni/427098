function fibonacci(i){
	if (!(i in fibonacci))
		fibonacci[i] = fibonacci(i-1) + fibonacci(i-2);
	return fibonacci[i];
}

fibonacci[1] = 1;
fibonacci[2] = 1;