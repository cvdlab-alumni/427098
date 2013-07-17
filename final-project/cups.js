function generateCup(profile,depth,ray){
	var internal_profile = [];
	var external_profile = [];

	profile.forEach(function(coord){
		internal_profile.push([coord[0]-depth,coord[1],coord[2]]);
		external_profile.push([coord[0]+depth,coord[1],coord[2]]);
	});

	internal_profile.sort();
	external_profile.sort();
	var step = (external_profile[internal_profile.length-1][0] - internal_profile[internal_profile.length-1][0])/3;
	var profile_conjuction = [  internal_profile[internal_profile.length-1],
								[internal_profile[internal_profile.length-1][0] + step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
								[internal_profile[internal_profile.length-1][0] + 2*step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
								external_profile[internal_profile.length-1] ];

	traslaPointsX(internal_profile,ray);
	traslaPointsX(external_profile,ray);
	traslaPointsX(profile_conjuction,ray);

	return STRUCT([ rotateProfileNoTraslate(internal_profile),
					rotateProfileNoTraslate(external_profile),
					rotateProfileNoTraslate(profile_conjuction),
					TNC([2])([minValueCoordinate(internal_profile,2)])(circle(internal_profile[0][0]-ray+0.05))]);
}




var cup1 = generateCup([[0.93, 0.25], [1.09, 0.25], [1.28, 0.43], [1.4, 0.58]],0.03,0.2)

draw(cup1)

