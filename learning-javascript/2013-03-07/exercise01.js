function identity(n){
	var output = "";
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (i!==j)
				output += "0\t";
			else
				output += "1\t";
		}
		output += "\n";
	}
	return output;
}