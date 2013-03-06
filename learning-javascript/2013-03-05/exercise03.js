var out = "";
for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++){
		if (i===j){
			if (j===10)
				out += "1" + "\t";
			else
				out += "1," + "\t";
		}
		else{
			if (j===10)
				out += "0" + "\t";
			else
				out += "0," + "\t";
		}
	}
	out += "\n";
}
console.log(out);