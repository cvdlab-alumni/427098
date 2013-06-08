
/**
	-Input:
		v = array di vertici del modello
		fv = matrice compatta delle facce 2d del modello
	-Output:
		stringa che rappresenta il contenuto di un file obj
**/
function convertToObjFormat(model){

	var v = model[0]
	var fv = model[1]

	var output = "";
	output += "# List of Vertices, with (x,y,z) coordinates\n";
	v.map(function(item){
		output += "v " + item[0] + " " + item[1] + " 0\n";
	});

	output += "\n";
	output += "# Face Definitions\n";
	fv.map(function(item){
		var tmp = "f ";
		item.map(function(e){
			tmp += e + "";
		});
		output += tmp + "\n";
	});
	return output
}

//Esempio di test

FV = [[5,6,7,8],
[0,5,8],
[0,4,5],
[1,2,4,5],
[2,3,5,6],
[0,8,7], [3,6,7], [1,2,3], [0,1,4]
]

V = [[0,6],
[0,0],
[3,0],
[6,0],
[0,3],
[3,3],
[6,3],
[6,6],
[3,6]]

var out = convertToObjFormat([V,FV]);
console.log(out)