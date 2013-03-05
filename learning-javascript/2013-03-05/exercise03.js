for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++){
		if (i===j)
			document.write("1," + "\t");
		else
			document.write("0," + "\t");
	}
	document.writeln();
}