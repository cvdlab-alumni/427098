var out = "";
for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++){
		if (j !== 10)
			out += i*j + "," + "\t";
		else
			out += i*j + "\t";
	}
	out +="\n";
}
console.log(out);