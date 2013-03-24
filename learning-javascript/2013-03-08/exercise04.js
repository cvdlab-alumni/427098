var data = [
  {id:'01', name:'duffy'},
  {id:'02', name:'michey'},
  {id:'03', name:'donald'},
  {id:'04', name:'goofy'},
  {id:'05', name:'minnie'},
  {id:'06', name:'scrooge'}
];
var key = 'name';
var values = ['goofy', 'scrooge'];

function select(data, key, values){
	var out = [];
	//for (obj in data){
	data.forEach(function(obj){
		console.log(data[obj][key]);
		if (values.some(function(item, index, array){ return item === data[obj][key]; }))
			out.push(data[obj]);
	});
	return out;
}

vedere 419489