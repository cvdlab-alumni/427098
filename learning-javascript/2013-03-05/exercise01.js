var out = "";
for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++){
		out += i*j + "\t";
	}
	out +="\n";
}
console.log(out);