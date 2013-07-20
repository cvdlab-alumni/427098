//                                              Auxiliary Functions and Global Variables

var line_domain = INTERVALS(1)(8)
var area_domain = PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])

var drawable_objects = [];

function draw(obj){
    drawable_objects.push(obj);
    DRAW(obj);
}


function hide(obj){
    drawable_objects = drawable_objects.filter( function(item){
        return item !== obj;
    });
    HIDE(obj);
}

function hideAll(){
    while(drawable_objects.length>0)
        HIDE(drawable_objects.pop());   
}

function rgb(color){
    return [color[0]/255, color[1]/255, color[2]/255];
}

function addYValue(points, y){
    return points.map(function(item){
        return [item[0],y,item[1]];
    });
}

function circle(r){
    return DISK(r)([64,2])
}

var scalePoints = function(points,values) {
    return points.map(function(item){
        return item.map(function(elem){
            return elem*values;
        });
    });
}

function traslaPointsX(points,value){
    return points.map(function(item){
        return [item[0]+value,item[1],item[2]];
    });
}

function traslaPointsY(points,value){
    return points.map(function(item){
        return [item[0],item[1]+value,item[2]];
    });
}

function traslaPointsZ(points,value){
    return points.map(function(item){
        return [item[0],item[1],item[2]+value];
    });
}

function unifyBezierCurves(map_curve_1,map_curve_2){
    return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)]));
}

function bezier_full_circle(r){
    return MAP(BEZIER(S1)([bezier_circle_map(r),[0,0,0]]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)]));
}

var scalePointsX = function(points,values) {
    return points.map(function(item){
        return [item[0]*values,item[1],item[2]];
    });
}

var scalePointsY = function(points,values) {
    return points.map(function(item){
        return [item[0],item[1]*values,item[2]];
    });
}

var scalePointsZ = function(points,values) {
    return points.map(function(item){
        return [item[0],item[1],item[2]*values];
    });
}

var minValueCoordinate = function(points,axis){
    minVal = points[0][axis]
    for (i=1; i<points.length; i++)
        if (points[i][axis]<minVal)
            minVal = points[i][axis]
    return minVal
}

var maxValueCoordinate = function(points,axis){
    maxVal = points[0][axis]
    for (i=1; i<points.length; i++)
        if (points[i][axis]>maxVal)
            maxVal = points[i][axis]
    return maxVal
}

function rotateProfileNoTraslate(points){
    var area_domain = PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]);
    var curve_map = BEZIER(S0)(points);
    return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}

function bezier_circle(r){
    return MAP(bezier_circle_map(r))(INTERVALS(1)(8));
}

function traslateToOrigin(points){
    var minX = minValueCoordinate(points,0);
    var minY = minValueCoordinate(points,1);
    var minZ = minValueCoordinate(points,2);
    if (minX !== 0)
        points = traslaPointsX(points,-minX);
    if (minY !== 0)
        points = traslaPointsY(points,-minY);
    if (minZ !== 0)
        points = traslaPointsZ(points,-minZ);
    return points
}

function adjustCurveFromCanvas(curve_Points, startPoint, endPoint){

    var newCurve = traslateToOrigin(curve_Points);

    var relationship_x = 0;
    var relationship_y = 0;
    var relationship_z = 0;

    if (curve_Points[0][0]-curve_Points[curve_Points.length-1][0] !== 0)
        relationship_x = Math.abs(endPoint[0]-startPoint[0]) / Math.abs(curve_Points[0][0]-curve_Points[curve_Points.length-1][0]);
    if (curve_Points[0][1]-curve_Points[curve_Points.length-1][1] !== 0)
        relationship_y = Math.abs(endPoint[1]-startPoint[1]) / Math.abs(curve_Points[0][1]-curve_Points[curve_Points.length-1][1]);
    if (curve_Points[0][2]-curve_Points[curve_Points.length-1][2] !== 0)
        relationship_z = Math.abs(endPoint[2]-startPoint[2]) / Math.abs(curve_Points[0][2]-curve_Points[curve_Points.length-1][2]);

    newCurve = scalePointsX(scalePointsY(scalePointsZ(newCurve,relationship_z),relationship_y),relationship_x);
    newCurve = traslaPointsX(traslaPointsY(traslaPointsZ(newCurve,startPoint[2]),startPoint[1]),startPoint[0]);
    return newCurve;
}

function bezier_circle_map(r,selector){

    if (selector === undefined)
        selector = S0

    var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

    var circle_points = scalePoints(base_points,r);

    return BEZIER(selector)(circle_points)
}

function bezier_circle_not_centered_map(r,x_value,y_value,z_value,selector){

    if (selector === undefined)
        selector = S0

    var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];
    var circle_points = scalePoints(base_points,r);

    if (x_value !== 0)
        circle_points = traslaPointsX(circle_points,x_value)
    if (y_value !== 0)
        circle_points = traslaPointsY(circle_points,y_value)
    if (z_value !== 0)
        circle_points = traslaPointsZ(circle_points,z_value)

    return BEZIER(selector)(circle_points)
}

function bezier_full_circle_not_centered(r,x_value,y_value,z_value){
    return MAP(BEZIER(S1)([bezier_circle_not_centered_map(r,x_value,y_value,z_value),[x_value,y_value,z_value]]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)]));
}

//Richiama l'omonima funzione senza clone
function TNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione senza clone
function RNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().rotate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione senza clone
function SNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().scale(dims, values);
      };
    };
  }

function nubs_circonference_control_point_xy(r){
    var points = [[0,-1,0],[0.33,-0.966,0],[0.7,-0.733,0],[0.966,-0.33,0],[1,0,0],[0.966,0.33,0],[0.7,0.733,0],[0.33,0.966,0],
                    [0,1,0],[-0.33,0.966,0],[-0.7,0.733,0],[-0.966,0.33,0],[-1,0,0],[-0.966,-0.33,0],[-0.7,-0.733,0],[-0.33,-0.966,0],[0,-1,0]];
    for(var i=0; i<points.length; i++)
        for(var j=0; j<points[i].length; j++)
            points[i][j] = points[i][j]*r;
    return points;
}

function nubs_circonference_control_point_xz(r){
    var points = [[0,0,1],[0.33,0,0.966,],[0.7,0,0.733],[0.966,0,0.33],[1,0,0],[0.966,0,-0.33],[0.7,0,-0.733],[0.33,0,-0.966],
                    [0,0,-1],[-0.33,0,-0.966],[-0.7,0,-0.733],[-0.966,0,-0.33],[-1,0,0],[-0.966,0,0.33],[-0.7,0,0.733],[-0.33,0,0.966],[0,0,1]];
    for(var i=0; i<points.length; i++)
        for(var j=0; j<points[i].length; j++)
            points[i][j] = points[i][j]*r;
    return points;
}

function getNodes(points,degree){
    var m = points.length;
    var k = degree;
    var n = (m + k + 1);
    var l = n - 3;
    var j = 1;
    var knots = [];
    for (var i = 0; i < 3; i++) 
        knots[i] = 0;
    for (var i = 3; i < l; i++, j++)
      knots[i] = j;
    for (var i = l; i < n; i++)
      knots[i] = j;
    return knots;
}

function arraycopy(array){
    var copied = [];
    for (var i=0; i<array.length; i++)
            copied[i] = array[i];
    return copied;
}

function traslatePoints(points,x,y,z){ 
    return points.map(function(point){
        return traslatePoint(point,x,y,z);
    });
}

function traslatePoint(point,x,y,z){
    point[0] += x;
    point[1] += y;
    point[2] += z;  
    return point;
}

function traslatePoints2(array,coordinate,value){
    switch(coordinate){
        case 0: return traslaPointsX(array,value);
        case 1: return traslaPointsY(array,value);
        case 2: return traslaPointsZ(array,value);
        default: console.log("wrong coordinate: " + coordinate); return; 
    }
}

function ruota_cerchio_nubs(ray,h,points){
    var d=0;
    var circonference_r = [];
    for(var i=0;i<points.length;i++){
        circonference_r[i] = arraycopy(points[i])
    }

    var increm1 = h/8; 
    var increm2 = (0.2*ray)/3
    var increm3 = (0.15*ray)/3

    traslatePoint(circonference_r[0],0,d+increm3,(increm1+increm2))
    traslatePoint(circonference_r[points.length-1],0,d+increm3,(increm1+increm2))
    traslatePoint(circonference_r[(points.length-1)/2],0,h+0.15*8,h*8/3-(increm1*8))

    for(var k = 1; k < (points.length-1)/2; k++){           
        traslatePoint(circonference_r[k],0,d+(increm1+0.15)*k,h*k/3-(increm1*k))
        traslatePoint(circonference_r[points.length-1-k],0,d+(increm1+0.15)*k,h*k/3-(increm1*k))
    }
    return circonference_r;
}

function unitary_tube_generator(width,height){

    var domain = DOMAIN([[0,1],[0,1]])([30,40]);
    var ray = 1
    var degree = 90

    var tube_distance_y = 0;

    var start_1 = nubs_circonference_control_point_xz(ray)
    var end_1 = traslatePoints2(start_1,1,width)

    var nodes = getNodes(start_1,2)

    var nubs1 = NUBS(S0)(2)(nodes)(start_1);
    var nubs2 = NUBS(S0)(2)(nodes)(end_1);

    var tube_distance_z2 = 1;

    var radiants = (degree*2*PI)/360
    var increm15 = (0.15*ray)/3
    var y_2 = height * Math.cos(radiants) //cateto 1 base
    var z_2 = height * Math.sin(radiants) //cateto 2 altezza

    var new_circumference = nubs_circonference_control_point_xy(ray)

    var start_2 = traslatePoints(new_circumference,0,tube_distance_y+width+ray*1.1,ray*1.2)
    var fine_2 = traslatePoints2(start_2,2,height)

    var nubs3 = NUBS(S0)(2)(nodes)(start_2);
    var nubs4 = NUBS(S0)(2)(nodes)(fine_2);

    var array_bezier = new Array();
    array_bezier[0] = nubs1;
    array_bezier[1] = nubs2;

    var incremz = tube_distance_z2/5
    
    var points = traslatePoints2(nubs_circonference_control_point_xz(1.1),1,width)
        for(i=1;i<5;i++){
        var r_i = ruota_cerchio_nubs(ray,incremz*i,points);//1 0 1
        array_bezier[i+1] = NUBS(S0)(2)(nodes)(r_i);
        var u = MAP(array_bezier[i+1])(INTERVALS(1)(8));
    }

    array_bezier[6] = nubs3;
    array_bezier[7] = nubs4;

    var bez = BEZIER(S1)(array_bezier);
    var unione_1 = MAP(bez)(domain);


    return unione_1;
}

function tube_generator(width,height,ray){
    return RNC([0,1])(-PI/2)(SNC([0,1,2])([ray,ray,ray])(unitary_tube_generator(width/ray,height/ray)));
}

function cilynder(r,h){
    return EXTRUDE([h])(DISK(r)([64, 2]))
}


//                                                          Tac Tea Pot
var pot_color = rgb([300,300,300]);

var pot_central_profile = addYValue([[3.75, 1.68], [3.51, 2.47], [3.19, 2.55], [2.99, 2.62]],0);
var pot_bottom_profile = addYValue([[3.75, 1.68], [3.76, 1.61], [3.78, 1.49], [3, 1.41]],0);

var pot_r1 = 0.5;
var traslate_x = -(pot_central_profile[pot_central_profile.length-1][0]-pot_r1-0.01);
var traslate_z = -pot_bottom_profile[pot_bottom_profile.length-1][2];

pot_central_profile = traslaPointsX(pot_central_profile, traslate_x);
pot_bottom_profile = traslaPointsX(pot_bottom_profile, traslate_x);
pot_central_profile = traslaPointsZ(pot_central_profile, traslate_z);
pot_bottom_profile = traslaPointsZ(pot_bottom_profile, traslate_z);

var pot_r2 = 0.9;
var pot_central = STRUCT([ rotateProfileNoTraslate(pot_central_profile),
                            rotateProfileNoTraslate(pot_bottom_profile),
                            bezier_full_circle_not_centered(pot_r1,0,0,pot_central_profile[pot_central_profile.length-1][2]),
                            bezier_full_circle(pot_r2)
                          ]);


var base_h = 0.05;
var base_incomplete = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_r2,0,0,base_h),
                            bezier_circle_not_centered_map(1.05*pot_r2,0,0,base_h/2),
                            bezier_circle_map(pot_r2)   ]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)]));
var base = STRUCT([base_incomplete,bezier_full_circle(pot_r2)])


//Top part
var top_points = addYValue([[2.98, 3.02], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0);
var top_points_central = addYValue([[2.98, 3.05], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0.02);
top_points = traslaPointsX(top_points, traslate_x);
top_points = traslaPointsZ(top_points, traslate_z);
top_points_central = traslaPointsX(top_points_central, traslate_x);
top_points_central = traslaPointsZ(top_points_central, traslate_z);
var top_points_t = traslaPointsY(top_points,0.1);
var top_points_central_t = traslaPointsY(top_points_central,0.06);
var top_points_x = traslaPointsX(top_points,-0.02)
var top_points_t_x = traslaPointsX(top_points_t,-0.02)

var top_curve = BEZIER(S0)(top_points)
var top_curve_central = BEZIER(S0)(top_points_central)
var top_curve_t = BEZIER(S0)(top_points_t)
var top_curve_central_t = BEZIER(S0)(top_points_central_t)
var top_curve_x = BEZIER(S0)(top_points_x)
var top_curve_t_x = BEZIER(S0)(top_points_t_x)

var top_part1_back = MAP(BEZIER(S1)([ top_curve,top_curve_central,top_curve_central_t,top_curve_t ]))(area_domain);
var top_part1_front = MAP(BEZIER(S1)([ top_curve_x,top_curve_central,top_curve_central_t,top_curve_t_x ]))(area_domain);
var top_part1_conjuction1 = unifyBezierCurves(top_curve, top_curve_x);
var top_part1_conjuction2 = unifyBezierCurves(top_curve_t, top_curve_t_x);


var top_part2_points1 = [[2.98, 0.0, 3.03], [2.84, -0.02, 3.06], [2.8, 0.0, 3.05], [2.75, 0.0, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points2 = [[2.98, 0.0, 3], [2.86, -0.02, 3.01], [2.78, 0.0, 3.02], [2.75, 0.0, 3.02], [2.69, 0.05, 3.03]];
var top_part2_points3 = [[2.98, 0.1, 3.03], [2.84, 0.12, 3.06], [2.8, 0.07, 3.05], [2.75, 0.1, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points4 = [[2.98, 0.1, 3], [2.86, 0.12, 3.01], [2.78, 0.07, 3.02], [2.75, 0.1, 3.05], [2.69, 0.05, 3.03]];

var top_part2_points5 = [[2.98, 0.05, 3.05], [2.84, 0.05, 3.08], [2.8, 0.05, 3.07], [2.75, 0.05, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points6 = [[2.98, 0.05, 3], [2.84, 0.05, 2.98], [2.8, 0.05, 2.97], [2.75, 0.05, 3], [2.69, 0.05, 3.03]];

top_part2_points1 = traslaPointsX(top_part2_points1, traslate_x);
top_part2_points1 = traslaPointsZ(top_part2_points1, traslate_z);
top_part2_points2 = traslaPointsX(top_part2_points2, traslate_x);
top_part2_points2 = traslaPointsZ(top_part2_points2, traslate_z);
top_part2_points3 = traslaPointsX(top_part2_points3, traslate_x);
top_part2_points3 = traslaPointsZ(top_part2_points3, traslate_z);
top_part2_points4 = traslaPointsX(top_part2_points4, traslate_x);
top_part2_points4 = traslaPointsZ(top_part2_points4, traslate_z);
top_part2_points5 = traslaPointsX(top_part2_points5, traslate_x);
top_part2_points5 = traslaPointsZ(top_part2_points5, traslate_z);
top_part2_points6 = traslaPointsX(top_part2_points6, traslate_x);
top_part2_points6 = traslaPointsZ(top_part2_points6, traslate_z);

var top_part2_curve1 = BEZIER(S0)(top_part2_points1)
var top_part2_curve2 = BEZIER(S0)(top_part2_points2)
var top_part2_curve3 = BEZIER(S0)(top_part2_points3)
var top_part2_curve4 = BEZIER(S0)(top_part2_points4)
var top_part2_curve5 = BEZIER(S0)(top_part2_points5)
var top_part2_curve6 = BEZIER(S0)(top_part2_points6)

var top_part2 = STRUCT([  MAP(BEZIER(S1)([ top_part2_curve1,top_part2_curve2 ]))(area_domain),
                            MAP(BEZIER(S1)([ top_part2_curve3,top_part2_curve4 ]))(area_domain),
                            MAP(BEZIER(S1)([ top_part2_curve1, top_part2_curve5, top_part2_curve3 ]))(area_domain),
                            MAP(BEZIER(S1)([ top_part2_curve2, top_part2_curve6, top_part2_curve4 ]))(area_domain) ]);  

var top_obj = STRUCT([ top_part1_back,top_part1_front,top_part1_conjuction1,top_part1_conjuction2, top_part2])

// Beak

var beak_profile = [[0.84,0.03 ,2.72], [0.89, 0.00,2.74], [0.94, -0.01,2.79], [1, 0,2.81]]
var beak_profile2 = [[0.84,0.03 ,2.72], [0.89, 0.05,2.74], [0.94, 0.07,2.79], [1, 0.06,2.81]]
var beak_profile3 = [[1, 0,2.81], [1.02,0.03,2.81],[1, 0.06,2.81]]
beak_profile = traslaPointsX(beak_profile, traslate_x);
beak_profile = traslaPointsZ(beak_profile, traslate_z);
beak_profile2 = traslaPointsX(beak_profile2, traslate_x);
beak_profile2 = traslaPointsZ(beak_profile2, traslate_z);
beak_profile3 = traslaPointsX(beak_profile3, traslate_x);
beak_profile3 = traslaPointsZ(beak_profile3, traslate_z);

var beak_increase1 = 1.3;
var beak_profile_external = scalePointsX(scalePointsY(beak_profile,beak_increase1), beak_increase1)
var beak_profile2_external = scalePointsX(scalePointsY(beak_profile2,beak_increase1), beak_increase1)
var beak_profile3_external = scalePointsX(scalePointsY(beak_profile3,beak_increase1), beak_increase1)

beak_profile_external = traslaPointsY(traslaPointsX(beak_profile_external,0.46),-0.01);
beak_profile2_external = traslaPointsY(traslaPointsX(beak_profile2_external,0.46),-0.01);
beak_profile3_external = traslaPointsY(traslaPointsX(beak_profile3_external,0.46),-0.01);

var beak_increase2 = 0.6;
var beak_centered = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), -0.47), -0.02), 0.2);


var beak_increase2 = 5;
var beak_end = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);

var beak_end = [[1.21, -0.05,1.42], [1.4, -0.15,1.9], [1.64, -0.2,2.14], [2.28, -0.3,2.43]];
var beak_end2 = [[1.21, 0.05,1.42], [1.4, 0.15,1.9], [1.64, 0.2,2.14], [2.28, 0.3,2.43]];
var beak_end3 = [[2.28, -0.3,2.43], [2.18,-0.1,2.43],[2.18,0.1,2.43],[2.28, 0.3,2.43]];
beak_end = traslaPointsX(beak_end, traslate_x+0.1);
beak_end = traslaPointsZ(beak_end, traslate_z+0.15);
beak_end2 = traslaPointsX(beak_end2, traslate_x+0.1);
beak_end2 = traslaPointsZ(beak_end2, traslate_z+0.15);
beak_end3 = traslaPointsX(beak_end3, traslate_x+0.1);
beak_end3 = traslaPointsZ(beak_end3, traslate_z+0.15);

var beak_curve = BEZIER(S0)(beak_profile);
var beak_curve2 = BEZIER(S0)(beak_profile2);
var beak_curve3 = BEZIER(S0)(beak_profile3);
var beak_curve_external = BEZIER(S0)(beak_profile_external);
var beak_curve2_external = BEZIER(S0)(beak_profile2_external);
var beak_curve3_external = BEZIER(S0)(beak_profile3_external);
var beak_centered_curve = BEZIER(S0)(beak_centered);
var beak_centered2_curve = BEZIER(S0)(beak_centered2);
var beak_centered3_curve = BEZIER(S0)(beak_centered3);
var beak_centered_curve_external = BEZIER(S0)(beak_centered_external);
var beak_centered2_curve_external = BEZIER(S0)(beak_centered2_external);
var beak_centered3_curve_external = BEZIER(S0)(beak_centered3_external);
var beak_end_curve = BEZIER(S0)(beak_end);
var beak_end2_curve = BEZIER(S0)(beak_end2);
var beak_end3_curve = BEZIER(S0)(beak_end3);
var beak_end_curve_external = BEZIER(S0)(beak_end_external);
var beak_end2_curve_external = BEZIER(S0)(beak_end2_external);
var beak_end3_curve_external = BEZIER(S0)(beak_end3_external);

var beak_depth = 0.01;
var beak_lateral_profile1 = [[-1.464,-0.01,1.4],[-1.3484,-0.026,1.04],[-0.1,-0.3,1.17]];
var beak_lateral_profile2 = [[-1.464,0.068,1.4],[-1.3484,0.0208,1.04],[-0.1,0.3,1.17]];
var beak_lateral_profile3 = [[-1.672,0.029,1.31],[-1.2,-0.0026,0.986],[-1.17,0.05,0.16]];

var beak_lateral_curve1 = BEZIER(S0)(beak_lateral_profile1);
var beak_lateral_curve2 = BEZIER(S0)(beak_lateral_profile2);
var beak_lateral_curve3 = BEZIER(S0)(beak_lateral_profile3);

var beak = STRUCT([ MAP(BEZIER(S1)([ beak_curve3_external,beak_centered3_curve_external,beak_end3_curve ]))(area_domain),
                    MAP(BEZIER(S1)([ beak_lateral_curve1,beak_lateral_curve3,beak_lateral_curve3,beak_lateral_curve3,beak_lateral_curve2 ]))(area_domain)
                    ]);


// Handle
var handle_points11 = addYValue([[3.73, 2.85], [3.01, 3.21], [3.09, 3.02], [3.02, 2.61]],0);
var handle_points12 = addYValue([[3.73, 2.85], [4.39, 2.55], [4.31, 2.32], [4.08, 2.08]],0);
var handle_points13 = addYValue([[3.66, 1.82], [3.84, 1.9], [3.94, 1.99], [4.08, 2.08]],0);

var handle_points21 = addYValue([[3.7, 2.77], [3.02, 3.09], [3.15, 2.84], [3.11, 2.56]],0);
var handle_points22 = addYValue([[3.7, 2.77], [4.24, 2.48], [4.21, 2.32], [3.96, 2.15]],0);
var handle_points23 = addYValue([[3.6, 1.97], [3.74, 2.01], [3.85, 2.08], [3.96, 2.15]],0);

handle_points11 = traslaPointsX(handle_points11, traslate_x);
handle_points11 = traslaPointsZ(handle_points11, traslate_z);
handle_points12 = traslaPointsX(handle_points12, traslate_x);
handle_points12 = traslaPointsZ(handle_points12, traslate_z);
handle_points13 = traslaPointsX(handle_points13, traslate_x);
handle_points13 = traslaPointsZ(handle_points13, traslate_z);
handle_points21 = traslaPointsX(handle_points21, traslate_x);
handle_points21 = traslaPointsZ(handle_points21, traslate_z);
handle_points22 = traslaPointsX(handle_points22, traslate_x);
handle_points22 = traslaPointsZ(handle_points22, traslate_z);
handle_points23 = traslaPointsX(handle_points23, traslate_x);
handle_points23 = traslaPointsZ(handle_points23, traslate_z);

var handle_delta_y = 0.2;
var handle_points11t = traslaPointsY(handle_points11,handle_delta_y);
var handle_points12t = traslaPointsY(handle_points12,handle_delta_y);
var handle_points13t = traslaPointsY(handle_points13,handle_delta_y);
var handle_points21t = traslaPointsY(handle_points21,handle_delta_y);
var handle_points22t = traslaPointsY(handle_points22,handle_delta_y);
var handle_points23t = traslaPointsY(handle_points23,handle_delta_y);

var handle_curve11 = BEZIER(S0)(handle_points11)
var handle_curve12 = BEZIER(S0)(handle_points12)
var handle_curve13 = BEZIER(S0)(handle_points13)
var handle_curve21 = BEZIER(S0)(handle_points21)
var handle_curve22 = BEZIER(S0)(handle_points22)
var handle_curve23 = BEZIER(S0)(handle_points23)
var handle_curve11t = BEZIER(S0)(handle_points11t)
var handle_curve12t = BEZIER(S0)(handle_points12t)
var handle_curve13t = BEZIER(S0)(handle_points13t)
var handle_curve21t = BEZIER(S0)(handle_points21t)
var handle_curve22t = BEZIER(S0)(handle_points22t)
var handle_curve23t = BEZIER(S0)(handle_points23t)

var handle = STRUCT([   unifyBezierCurves(handle_curve11,handle_curve11t),
                        unifyBezierCurves(handle_curve12,handle_curve12t),
                        unifyBezierCurves(handle_curve13,handle_curve13t),
                        unifyBezierCurves(handle_curve21,handle_curve21t),
                        unifyBezierCurves(handle_curve22,handle_curve22t),
                        unifyBezierCurves(handle_curve23,handle_curve23t),                      
                        unifyBezierCurves(handle_curve11,handle_curve21),               
                        unifyBezierCurves(handle_curve12,handle_curve22),               
                        unifyBezierCurves(handle_curve13,handle_curve23),                       
                        unifyBezierCurves(handle_curve11t,handle_curve21t),             
                        unifyBezierCurves(handle_curve12t,handle_curve22t),             
                        unifyBezierCurves(handle_curve13t,handle_curve23t)
                     ]);


var pot = STRUCT([ pot_central,base,top_obj,handle,beak ]);                         

var pot = STRUCT([ COLOR(pot_color)(pot),
                    COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.1*pot_r1,0,0,0.97*pot_central_profile[pot_central_profile.length-1][2])) 
                    ]);


//                                                          Tac Tea Cup
var plate_color_p1 = rgb([60,60,60]);
var plate_color_p2 = rgb([58,58,58]);
var cup_color = rgb([300,300,300]);

var cup_points1 = addYValue([[3.65, 1.16], [4.34, 1.42], [5.07, 1.77], [5.17, 3.11]],0);
var cup_points2 = addYValue([[3.71, 1.16], [4.28, 1.42], [5.01, 1.77], [5.11, 3.11]],0);
var cup_points3 = addYValue([[5.17, 3.11],[5.15, 3.15],[5.13, 3.15],[5.11, 3.11]],0);

var cup_base_traslate = 3.21;

cup_points1 = traslaPointsX(cup_points1,-cup_base_traslate);
cup_points2 = traslaPointsX(cup_points2,-cup_base_traslate);
cup_points3 = traslaPointsX(cup_points3,-cup_base_traslate);

var cup_external = STRUCT([rotateProfileNoTraslate(cup_points1),
                            rotateProfileNoTraslate(cup_points2),
                            rotateProfileNoTraslate(cup_points3),
                            TNC([2])([minValueCoordinate(cup_points1,2)])(circle(3.86-cup_base_traslate+0.05))]); 

cup_external = COLOR(cup_color)(cup_external)

//Handle
var handle_points11 = addYValue([[5.82, 2.47], [5.72, 3.05], [5.6, 2.83], [5.16, 2.88]],0);
var handle_points12 = addYValue([[5.82, 2.47], [5.9, 1.92], [5.68, 1.97], [5.41, 1.81]],0);
var handle_points13 = addYValue([[4.21, 1.39], [4.19, 1.28], [4.82, 1.53], [5.41, 1.82]],0);

var handle_points21 = addYValue([[5.67, 2.42], [5.63, 2.79], [5.28, 2.76],[5.06, 2.48]],0);
var handle_points22 = addYValue([[5.67, 2.42], [5.78, 2.17], [5.62, 2.04], [5.1, 1.85]],0);
var handle_points23 = addYValue([[4.53, 1.60], [4.75, 1.69], [4.87, 1.74], [5.1, 1.85]],0);

handle_points11 = traslaPointsX(handle_points11,-cup_base_traslate);
handle_points12 = traslaPointsX(handle_points12,-cup_base_traslate);
handle_points13 = traslaPointsX(handle_points13,-cup_base_traslate);
handle_points21 = traslaPointsX(handle_points21,-cup_base_traslate);
handle_points22 = traslaPointsX(handle_points22,-cup_base_traslate);
handle_points23 = traslaPointsX(handle_points23,-cup_base_traslate);

var handle_delta_y = 0.2;
var handle_points11t = traslaPointsY(handle_points11,handle_delta_y);
var handle_points12t = traslaPointsY(handle_points12,handle_delta_y);
var handle_points13t = traslaPointsY(handle_points13,handle_delta_y);
var handle_points21t = traslaPointsY(handle_points21,handle_delta_y);
var handle_points22t = traslaPointsY(handle_points22,handle_delta_y);
var handle_points23t = traslaPointsY(handle_points23,handle_delta_y);

var handle_curve11 = BEZIER(S0)(handle_points11)
var handle_curve12 = BEZIER(S0)(handle_points12)
var handle_curve13 = BEZIER(S0)(handle_points13)
var handle_curve21 = BEZIER(S0)(handle_points21)
var handle_curve22 = BEZIER(S0)(handle_points22)
var handle_curve23 = BEZIER(S0)(handle_points23)
var handle_curve11t = BEZIER(S0)(handle_points11t)
var handle_curve12t = BEZIER(S0)(handle_points12t)
var handle_curve13t = BEZIER(S0)(handle_points13t)
var handle_curve21t = BEZIER(S0)(handle_points21t)
var handle_curve22t = BEZIER(S0)(handle_points22t)
var handle_curve23t = BEZIER(S0)(handle_points23t)

var handle = STRUCT([   unifyBezierCurves(handle_curve11,handle_curve11t),
                        unifyBezierCurves(handle_curve12,handle_curve12t),
                        unifyBezierCurves(handle_curve13,handle_curve13t),
                        unifyBezierCurves(handle_curve21,handle_curve21t),
                        unifyBezierCurves(handle_curve22,handle_curve22t),
                        unifyBezierCurves(handle_curve23,handle_curve23t),                      
                        unifyBezierCurves(handle_curve11,handle_curve21),               
                        unifyBezierCurves(handle_curve12,handle_curve22),               
                        unifyBezierCurves(handle_curve13,handle_curve23),                       
                        unifyBezierCurves(handle_curve11t,handle_curve21t),             
                        unifyBezierCurves(handle_curve12t,handle_curve22t),             
                        unifyBezierCurves(handle_curve13t,handle_curve23t)
                     ]);

handle = COLOR(cup_color)(handle)

//Plate

var plate_points = addYValue([[3.74,0.80],[4.6,0.79],[5.46,0.75],[6.06,1.38],[6.06, 1.58], [5.46, 1.15], [4.6, 0.99], [3.74, 1.0]],0);
var plate_base_traslate = 3.15;
plate_points = traslaPointsX(plate_points,-plate_base_traslate);
var plate_p1 = rotateProfileNoTraslate(plate_points);
var plate_p2 = TNC([2])([minValueCoordinate(plate_points,2)+0.045])(circle(3.74-plate_base_traslate+0.05));

plate_p1 = COLOR(plate_color_p1)(plate_p1);
plate_p2 = COLOR(plate_color_p2)(plate_p2);

var plate = STRUCT([plate_p1,plate_p2]);
plate = SNC([0,1,2])([1.25,1.25,1.25])(plate);


//Model Assembly

var cup = STRUCT([cup_external,plate,handle]);


//                                                          Cups
var external_color = rgb([181,37,46]);
var internal_color = rgb([38,5,14]);


function generateCup(profile,depth,ray){
    var internal_profile = [];
    var external_profile = [];

    profile.sort();
    profile = traslaPointsX(profile,-(profile[0][0]-ray))

    profile.forEach(function(coord){
        internal_profile.push([coord[0]-depth,coord[1],coord[2]]);
        external_profile.push([coord[0]+depth,coord[1],coord[2]]);
    });

    var step = (external_profile[internal_profile.length-1][0] - internal_profile[internal_profile.length-1][0])/3;
    var profile_conjuction = [  internal_profile[internal_profile.length-1],
                                [internal_profile[internal_profile.length-1][0] + step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
                                [internal_profile[internal_profile.length-1][0] + 2*step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
                                external_profile[internal_profile.length-1] ];

    var base_h = 0.02;
    var base = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(ray,0,0,base_h),
                                bezier_circle_not_centered_map(1.05*ray,0,0,base_h/2),
                                bezier_circle_map(ray)  ]))(area_domain);

    var internal_part = STRUCT([ rotateProfileNoTraslate(internal_profile), TNC([2])([internal_profile[0][2]])(circle(ray))]);
    var external_part = STRUCT([ rotateProfileNoTraslate(external_profile),
                                 rotateProfileNoTraslate(profile_conjuction),
                                 TNC([2])([internal_profile[0][2]-base_h])(base),
                                 bezier_full_circle_not_centered(ray, 0, 0, internal_profile[0][2]-base_h)
                                ]);

    internal_part = COLOR(internal_color)(internal_part)
    external_part = COLOR(external_color)(external_part)

    return STRUCT([ internal_part,external_part ]);
}

var points1 = [[0.93, 0,0.25], [1.09, 0,0.25], [1.28, 0,0.43], [1.4, 0,0.58]];
var points2 = [[1.63, 0, 0.06], [1.8, 0, 0.14], [1.84, 0, 0.21], [1.88, 0, 0.46]];
var points3 = [[2.23, 0, 0.23], [2.41, 0, 0.29], [2.54, 0, 0.34], [2.57, 0, 0.51]];

points1 = traslaPointsZ(points1,-0.25)
points2 = traslaPointsZ(points2,-0.06)
points3 = traslaPointsZ(points3,-0.23)

var cup1 = generateCup(points1,0.015,0.2)
var cup2 = generateCup(points2,0.015,0.1)
var cup3 = generateCup(points3,0.015,0.2)

var cups = STRUCT([cup3, TNC([0])([1.5])(cup1), TNC([0,1])([0.7,1])(cup2)])


//                                                          Tables

var x = 0;
var y = 1;
var z = 2;

var chassis_x = 20;
var chassis_y = 18;
var chassis_z = 24;
var chassis_ray = 0.7;
var chassis_color = rgb([192,192,192]);
var desk1_color = rgb([255,117,24]);
var desk2_color = rgb([300,300,300]);
var relationship = 1.2;

/** Chassis **/
var chassis_delta = 1.1*chassis_ray;
var chassis_vertical1 = tube_generator(chassis_x/2,chassis_z/2,chassis_ray);
var chassis_vertical2 = TNC([z])([chassis_z/2])(R([y,z])(PI)(chassis_vertical1));
var chassis_orizzontal1 = RNC([x,y])(PI/2)(RNC([y,z])(PI/2)(tube_generator(chassis_y/2,chassis_x/2,chassis_ray)));
var chassis_orizzontal2 = R([y,z])(PI)(chassis_orizzontal1);

var chassis_base = STRUCT([T([y])([chassis_y/2+chassis_delta]), chassis_orizzontal1,chassis_orizzontal2 ])

var chassis = STRUCT([ chassis_base, TNC([x])([chassis_x/2])(chassis_vertical1),
                        TNC([x,y])([chassis_x/2,chassis_y+2*chassis_delta])(chassis_vertical1),
                        T([z])([chassis_z])(chassis_base),
                        T([x,z])([chassis_x/2,chassis_z/2]),chassis_vertical2,
                        T([y])([chassis_y+2*chassis_delta])(chassis_vertical2) ]);

chassis = COLOR(chassis_color)(chassis);

/** Desk **/
var desk_x = chassis_x-4*chassis_ray;
var desk_y = chassis_y+0.3;
var desk_z = 0.7;
var desk = CUBOID([desk_x,desk_y,desk_z]);

var table1 = STRUCT([chassis,TNC([x,y,z])([chassis_ray,chassis_ray,chassis_z])(COLOR(desk1_color)(desk))]);
var table2 = STRUCT([S([x,y,z])([relationship,relationship,relationship])(chassis),
    S([x,y,z])([relationship,relationship,relationship])(TNC([x,y,z])([chassis_ray,chassis_ray,chassis_z])(COLOR(desk2_color)(desk)))]);

var tables = STRUCT([table1, TNC([x,y])([(chassis_x-2*chassis_ray)+chassis_x*relationship,relationship*chassis_y])(RNC([x,y])(PI)(table2)) ])


//                                                          Door Handle
var depth = 0.5;

// Front background

var lock_left_profile1 = addYValue([[0.52, 1.26], [0.45, 1.33], [0.43, 1.46], [0.59, 1.49]],0);
var lock_left_profile2 = addYValue([[0.52, 1.26], [0.52, 1.12], [0.49, 1.02], [0.58, 1.03]],0);
var lock_right_profile1 = addYValue([[0.67, 1.27], [0.67, 1.12], [0.68, 1.01], [0.58, 1.03]],0);
var lock_right_profile2 = addYValue([[0.67, 1.27], [0.7, 1.29], [0.77, 1.46], [0.59, 1.49]],0);
var lock_up = addYValue([[0.69, 1.44], [0.64, 1.52], [0.54, 1.51], [0.5, 1.46]],0);
var lock_down = addYValue([[0.54, 1.04],[0.57, 1.01],[0.62, 1.01],[0.64, 1.04]],0);

var handle_left1 = [[0.27,0,1.26],[0.27,0,3.48]];
var handle_left2 = [[0.27,0,1.26],[0.27,0,0.35]];
var handle_right1 = [[0.91,0,1.26],[0.91,0,0.35]];
var handle_right2 = [[0.91,0,1.26],[0.91,0,3.48]];
var handle_up = [[0.91,0,3.48],[0.27,0,3.48]];
var handle_down = [[0.27,0,0.35],[0.91,0,0.35]];

var lock_left_profile1_curve = BEZIER(S0)(lock_left_profile1)
var lock_left_profile2_curve = BEZIER(S0)(lock_left_profile2)
var lock_right_profile1_curve = BEZIER(S0)(lock_right_profile1)
var lock_right_profile2_curve = BEZIER(S0)(lock_right_profile2)
var lock_down_curve = BEZIER(S0)(lock_down)
var lock_up_curve = BEZIER(S0)(lock_up)
var handle_left1_curve = BEZIER(S0)(handle_left1)
var handle_left2_curve = BEZIER(S0)(handle_left2)
var handle_right1_curve = BEZIER(S0)(handle_right1)
var handle_right2_curve = BEZIER(S0)(handle_right2)
var handle_up_curve = BEZIER(S0)(handle_up)
var handle_down_curve = BEZIER(S0)(handle_down)

var lock_left1 = MAP(BEZIER(S1)([ lock_left_profile1_curve, handle_left1_curve ]))(area_domain);
var lock_left2 = MAP(BEZIER(S1)([ lock_left_profile2_curve, handle_left2_curve ]))(area_domain);
var lock_right1 = MAP(BEZIER(S1)([ lock_right_profile1_curve, handle_right1_curve ]))(area_domain);
var lock_right2 = MAP(BEZIER(S1)([ lock_right_profile2_curve, handle_right2_curve ]))(area_domain);
var lock_up = MAP(BEZIER(S1)([ handle_up_curve, lock_up_curve ]))(area_domain);
var lock_down = MAP(BEZIER(S1)([ handle_down_curve, lock_down_curve ]))(area_domain);

var lock_front = STRUCT([ lock_left1,lock_left2,lock_right1,lock_right2,lock_up,lock_down]);

// Back background

var lock_left_profile1_t = traslaPointsY(lock_left_profile1, depth);
var lock_left_profile2_t = traslaPointsY(lock_left_profile2, depth);
var lock_right_profile1_t = traslaPointsY(lock_right_profile1, depth);
var lock_right_profile2_t = traslaPointsY(lock_right_profile2, depth);
var lock_up_t = traslaPointsY(lock_up, depth);
var lock_down_t = traslaPointsY(lock_down, depth);

var handle_left1_t = traslaPointsY(handle_left1, depth);
var handle_left2_t = traslaPointsY(handle_left2, depth);
var handle_right1_t = traslaPointsY(handle_right1, depth);
var handle_right2_t = traslaPointsY(handle_right2, depth);
var handle_up_t = traslaPointsY(handle_up, depth);
var handle_down_t = traslaPointsY(handle_down, depth);

var lock_left_profile1_curve_t = BEZIER(S0)(lock_left_profile1_t)
var lock_left_profile2_curve_t = BEZIER(S0)(lock_left_profile2_t)
var lock_right_profile1_curve_t = BEZIER(S0)(lock_right_profile1_t)
var lock_right_profile2_curve_t = BEZIER(S0)(lock_right_profile2_t)
var lock_down_curve_t = BEZIER(S0)(lock_down_t)
var lock_up_curve_t = BEZIER(S0)(lock_up_t)
var handle_left1_curve_t = BEZIER(S0)(handle_left1_t)
var handle_left2_curve_t = BEZIER(S0)(handle_left2_t)
var handle_right1_curve_t = BEZIER(S0)(handle_right1_t)
var handle_right2_curve_t = BEZIER(S0)(handle_right2_t)
var handle_up_curve_t = BEZIER(S0)(handle_up_t)
var handle_down_curve_t = BEZIER(S0)(handle_down_t)

var lock_left1_t = MAP(BEZIER(S1)([ lock_left_profile1_curve_t, handle_left1_curve_t ]))(area_domain);
var lock_left2_t = MAP(BEZIER(S1)([ lock_left_profile2_curve_t, handle_left2_curve_t ]))(area_domain);
var lock_right1_t = MAP(BEZIER(S1)([ lock_right_profile1_curve_t, handle_right1_curve_t ]))(area_domain);
var lock_right2_t = MAP(BEZIER(S1)([ lock_right_profile2_curve_t, handle_right2_curve_t ]))(area_domain);

var lock_back = STRUCT([ lock_left1_t,lock_left2_t,lock_right1_t,lock_right2_t,lock_up_t,lock_down_t]);

// Conjuction background

var lock = STRUCT([ lock_front,lock_back, 
                    unifyBezierCurves(lock_left_profile1_curve, lock_left_profile1_curve_t),
                    unifyBezierCurves(lock_left_profile2_curve, lock_left_profile2_curve_t),
                    unifyBezierCurves(lock_right_profile1_curve, lock_right_profile1_curve_t),
                    unifyBezierCurves(lock_right_profile2_curve, lock_right_profile2_curve_t),
                    unifyBezierCurves(handle_left1_curve, handle_left1_curve_t),
                    unifyBezierCurves(handle_left2_curve, handle_left2_curve_t),
                    unifyBezierCurves(handle_right1_curve, handle_right1_curve_t),
                    unifyBezierCurves(handle_right2_curve, handle_right2_curve_t),
                    unifyBezierCurves(handle_down_curve, handle_down_curve_t),
                    unifyBezierCurves(handle_up_curve, handle_up_curve_t) ]);

// Screws - Da rendere spaccati

var screw_r = 0.035;
var screw_h = 0.02;
var screw = MAP(BEZIER(S1)([ bezier_circle_map(screw_r),
                             bezier_circle_not_centered_map(screw_r,0,0,screw_h/2), 
                             bezier_circle_not_centered_map(0.8*screw_r,0,0,0.9*screw_h), 
                             [0,0,screw_h]  ]))(area_domain);

screw = RNC([1,2])(PI/2)(screw)
var screws_front = STRUCT([ T([0,2])([0.82, 3.37])(screw),T([0,2])([0.37, 3.39])(screw),
                        T([0,2])([0.81, 0.43])(screw),T([0,2])([0.38, 0.42])(screw) ]);

screw_bc = RNC([1,2])(PI)(screw)
var screws_back = STRUCT([ T([0,1,2])([0.82, depth, 3.37])(screw_bc),T([0,1,2])([0.37, depth, 3.39])(screw_bc),
                        T([0,1,2])([0.81, depth, 0.43])(screw_bc),T([0,1,2])([0.38, depth, 0.42])(screw_bc) ]);

var screws = STRUCT([screws_back,screws_front])


//Handle part
var handle_cily_h = 0.02;
var handle_cily_r = 0.18;
var handle_cily_1 = R([1,2])(PI/2)(cilynder(handle_cily_r, handle_cily_h));

var handle_cily_up = [[-0.0828,0,0.1376],[-0.0508,0,0.1528],[0.066,0,0.1464],[0.0716,0,0.1376]];
var handle_cily_down = [[0.07,0,-0.1304],[0.03,0,-0.1488],[-0.0684,0,-0.14],[-0.0828,0,-0.1288]] ;
var handle_cily_left1 = [[-0.1588,0,0.004],[-0.1612,0,0.0792],[-0.1108,0,0.1208],[-0.0828,0,0.1384]];
var handle_cily_left2 = [[-0.1588,0,0.004],[-0.1564,0,-0.0352],[-0.1212,0,-0.1144],[-0.0828,0,-0.1288]];
var handle_cily_right1 = [[0.0724,0,0.136],[0.1116,0,0.128],[0.158,0,0.0184],[0.1476,0,0.0016]];
var handle_cily_right2 = [[0.07,0,-0.1304],[0.0908,0,-0.1272],[0.158,0,-0.0296],[0.1476,0,0.0016]];

var handle_cily_up_curve = BEZIER(S0)(handle_cily_up);
var handle_cily_down_curve = BEZIER(S0)(handle_cily_down);
var handle_cily_left1_curve = BEZIER(S0)(handle_cily_left1);
var handle_cily_left2_curve = BEZIER(S0)(handle_cily_left2);
var handle_cily_right1_curve = BEZIER(S0)(handle_cily_right1);
var handle_cily_right2_curve = BEZIER(S0)(handle_cily_right2);

var handle_cily_h2 = 0.05;
var handle_cily_up_t = traslaPointsY(handle_cily_up,handle_cily_h2);
var handle_cily_down_t = traslaPointsY(handle_cily_down,handle_cily_h2);
var handle_cily_left1_t = traslaPointsY(handle_cily_left1,handle_cily_h2);
var handle_cily_left2_t = traslaPointsY(handle_cily_left2,handle_cily_h2);
var handle_cily_right1_t = traslaPointsY(handle_cily_right1,handle_cily_h2);
var handle_cily_right2_t = traslaPointsY(handle_cily_right2,handle_cily_h2);

var handle_cily_up_curve_t = BEZIER(S0)(handle_cily_up_t);
var handle_cily_down_curve_t = BEZIER(S0)(handle_cily_down_t);
var handle_cily_left1_curve_t = BEZIER(S0)(handle_cily_left1_t);
var handle_cily_left2_curve_t = BEZIER(S0)(handle_cily_left2_t);
var handle_cily_right1_curve_t = BEZIER(S0)(handle_cily_right1_t);
var handle_cily_right2_curve_t = BEZIER(S0)(handle_cily_right2_t);

var handle_cily = STRUCT([  //front
                            MAP(BEZIER(S1)([handle_cily_up_curve,[0,0,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_down_curve,[0,0,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left1_curve,[0,0,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left2_curve,[0,0,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right1_curve,[0,0,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right2_curve,[0,0,0]]))(area_domain),
                            //back
                            MAP(BEZIER(S1)([handle_cily_up_curve_t,[0,handle_cily_h2,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_down_curve_t,[0,handle_cily_h2,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left1_curve_t,[0,handle_cily_h2,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left2_curve_t,[0,handle_cily_h2,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right1_curve_t,[0,handle_cily_h2,0]]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right2_curve_t,[0,handle_cily_h2,0]]))(area_domain), 
                            //conjuction
                            MAP(BEZIER(S1)([handle_cily_up_curve,handle_cily_up_curve_t]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_down_curve,handle_cily_down_curve_t]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left1_curve,handle_cily_left1_curve_t]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_left2_curve,handle_cily_left2_curve_t]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right1_curve,handle_cily_right1_curve_t]))(area_domain),
                            MAP(BEZIER(S1)([handle_cily_right2_curve,handle_cily_right2_curve_t]))(area_domain) 
                        ]);


var handle_cily2 = R([0,2])(PI/4)(handle_cily);
var handle_p2_z = 2*(handle_cily_r-0.03);
var handle_p2 = STRUCT([ CUBOID([handle_p2_z,0.25,handle_p2_z]),
                         TNC([1])([-0.25]),CUBOID([0.6,0.25,handle_p2_z]),
                         TNC([0,1,2])([0.6,handle_p2_z/2,handle_p2_z/2])(RNC([0,2])(PI/2)(  COLOR(rgb([30,30,30]))(cilynder(0.7*handle_p2_z,1.2))) ) ])


var handle = STRUCT([  TNC([0,1,2])([0.58, -handle_cily_h2,2.44]),TNC([1])([2*handle_cily_h2 - handle_cily_h-0.02])(handle_cily_1),
                       TNC([1])([-handle_cily_h2])(handle_cily),handle_cily2, TNC([0,1,2])([-handle_cily_r+0.01,-0.3,-handle_cily_r+0.01])(handle_p2)]);

handle_rotate = RNC([1,2])(PI)( T([0,1,2])([-0.6,-0.015,-2.45])(handle) )

var model = STRUCT([lock,screws,handle,T([0,1,2])([0.6,depth,2.45])(handle_rotate)])



//draw with door
var door_color = rgb([150, 75, 0]);
var door = STRUCT([SIMPLEX_GRID([[0.28,-0.6,7],[depth],[15]]),SIMPLEX_GRID([[-0.28,0.6],[depth],[5.35,-3.13,6.52]])]);
door = COLOR(door_color)(door)
var door_complete = STRUCT([door,TNC([2])([5])(model)])

//                                                          F51

var x = 0;
var y = 1;
var z = 2;

var dimension_x = 27.5;
var dimension_y = 27.5;
var dimension_z = 27.5;
var cushion_color = [0.7,0,0];

var chassis_thickness = 2;
var chassis_depth = 3.5;
var chassis_y = 21;
var chassis_z = 24; 

var back_depth = 7.5;
var back_z = 24;

var seat_cushion_z = 10;


var chassis_ground_1 = CUBOID([dimension_x,chassis_depth,chassis_thickness]) //x
var chassis_ground_2 = CUBOID([chassis_depth,chassis_y,chassis_thickness]) //y
var chassis_ground = STRUCT([chassis_ground_1,chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

var chassis_1 = TNC([y])([chassis_y])(CUBOID([chassis_depth,chassis_thickness,chassis_z]));
var chassis_2 = CUBOID([chassis_thickness,chassis_thickness,dimension_z-back_z])

var chassis = STRUCT([chassis_ground,chassis_1,T([x])([dimension_x-chassis_depth])(chassis_1),
                        T([x,y,z])([chassis_depth-chassis_thickness,chassis_depth,chassis_thickness])(chassis_2),
                        T([x,y,z])([dimension_x-chassis_depth,chassis_depth,chassis_thickness])(chassis_2),
                        T([z])([chassis_z-chassis_thickness]),chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

chassis = COLOR(rgb([40,40,40]))(chassis);


//Seat cushion
var sc_left_back_p = [[0,chassis_y,0],[0,chassis_y,seat_cushion_z]];
var sc_left_down_p = [[0,0,0],[0,chassis_y,0]];
var sc_left_front_p = [[0,0,0],[0,-0.5,seat_cushion_z/2],[0,0,seat_cushion_z]];
var sc_left_up_p = [[0,0,seat_cushion_z],[0,chassis_y/2,seat_cushion_z+0.8],[0,chassis_y,seat_cushion_z]];

var sc_right_back_p = traslaPointsX(sc_left_back_p,dimension_x);
var sc_right_down_p = traslaPointsX(sc_left_down_p,dimension_x);
var sc_right_front_p = traslaPointsX(sc_left_front_p,dimension_x);
var sc_right_up_p = traslaPointsX(sc_left_up_p,dimension_x);

var sc_left_back_c = BEZIER(S0)(sc_left_back_p);
var sc_left_down_c = BEZIER(S0)(sc_left_down_p);
var sc_left_front_c = BEZIER(S0)(sc_left_front_p);
var sc_left_up_c = BEZIER(S0)(sc_left_up_p);
 
var sc_right_back_c = BEZIER(S0)(sc_right_back_p);
var sc_right_down_c = BEZIER(S0)(sc_right_down_p);
var sc_right_front_c = BEZIER(S0)(sc_right_front_p);
var sc_right_up_c = BEZIER(S0)(sc_right_up_p);

var sc_intermedied_up_p = [[dimension_x/2,0,seat_cushion_z],[dimension_x/5,chassis_y/2,seat_cushion_z+1.5],[3*dimension_x/5,chassis_y/2,seat_cushion_z+1.5],[dimension_x/2,chassis_y,seat_cushion_z]];
var sc_intermedied_up_c = BEZIER(S0)(sc_intermedied_up_p);

var seat_cushion = STRUCT([unifyBezierCurves(sc_left_back_c, sc_right_back_c),
                            unifyBezierCurves(sc_left_down_c, sc_right_down_c),
                            unifyBezierCurves(sc_left_front_c, sc_right_front_c),
                            MAP(BEZIER(S1)([sc_left_up_c,sc_intermedied_up_c,sc_right_up_c]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            unifyBezierCurves(sc_left_up_c, sc_left_down_c),
                            unifyBezierCurves(sc_right_up_c, sc_right_down_c),
                            unifyBezierCurves(sc_left_front_c, sc_left_back_c),
                            unifyBezierCurves(sc_right_front_c, sc_right_back_c)]);

var seat_cushion_ztraslator = dimension_z-back_z+chassis_thickness;
seat_cushion = TNC([z])([seat_cushion_ztraslator])(seat_cushion);
seat_cushion = COLOR(cushion_color)(seat_cushion);

//Arms cushion
var arm_cushion_z = dimension_z-chassis_z;
var ac_front_down_p = [[0,0,0],[chassis_depth,0,0]];
var ac_front_up_p = [[0.2,0,arm_cushion_z],[(chassis_depth+0.2)/2,0,arm_cushion_z+0.3],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_left_p = [[0,0,0],[0,0,arm_cushion_z/2],[0.2,0,arm_cushion_z]];
var ac_front_right_p = [[chassis_depth,0,0],[chassis_depth,0,arm_cushion_z/2],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_vertical_intermedied_p = [[chassis_depth/2,0,0],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth/2,0,arm_cushion_z]];
var ac_front_horizzontal_intermedied_p = [[0,0,arm_cushion_z/2],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth,0,arm_cushion_z/2]];

var ac_back_down_p = traslaPointsY(ac_front_down_p,dimension_y);
var ac_back_up_p = traslaPointsY(ac_front_up_p,dimension_y);
var ac_back_left_p = traslaPointsY(ac_front_left_p,dimension_y);
var ac_back_right_p = traslaPointsY(ac_front_right_p,dimension_y);
var ac_back_vertical_intermedied_p = [[chassis_depth/2,dimension_y,0],[chassis_depth/2,dimension_y+0.3,arm_cushion_z/2],[chassis_depth/2,dimension_y,arm_cushion_z]];

var ac_front_down_c = BEZIER(S0)(ac_front_down_p);
var ac_front_up_c = BEZIER(S0)(ac_front_up_p);
var ac_front_left_c = BEZIER(S0)(ac_front_left_p);
var ac_front_right_c = BEZIER(S0)(ac_front_right_p);
var ac_front_vertical_intermedied_c = BEZIER(S0)(ac_front_vertical_intermedied_p);

var ac_back_down_c = BEZIER(S0)(ac_back_down_p);
var ac_back_up_c = BEZIER(S0)(ac_back_up_p);
var ac_back_left_c = BEZIER(S0)(ac_back_left_p);
var ac_back_right_c = BEZIER(S0)(ac_back_right_p);
var ac_back_vertical_intermedied_c = BEZIER(S0)(ac_back_vertical_intermedied_p);

var arm_cushion = STRUCT([unifyBezierCurves(ac_front_down_c, ac_back_down_c),
                            unifyBezierCurves(ac_front_up_c, ac_back_up_c),
                            unifyBezierCurves(ac_front_left_c, ac_back_left_c),
                            unifyBezierCurves(ac_front_right_c, ac_back_right_c),
                            MAP(BEZIER(S1)([ac_front_right_c,ac_front_vertical_intermedied_c,ac_front_left_c]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            MAP(BEZIER(S1)([ac_back_right_c,ac_back_vertical_intermedied_c,ac_back_left_c]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            unifyBezierCurves(ac_front_up_c, ac_front_down_c),
                            unifyBezierCurves(ac_back_up_c, ac_back_down_c)
                            ]);


arm_cushion = TNC([z])([chassis_z])(arm_cushion);
arm_cushion = COLOR(cushion_color)(arm_cushion);
arm_cushions = STRUCT([arm_cushion,T([x])([dimension_x-chassis_depth])(arm_cushion)])

//Back cushion
var seat_cushion_z_def = seat_cushion_z+dimension_z-back_z+chassis_thickness

var back_cushion_delta_x = dimension_x-2*chassis_depth +0.8;
var back_cushion_p = adjustCurveFromCanvas([[0,0.23, 2.8],[0,0.28, 3.58],[0,0.3, 4],[0,0.72, 3.87]],[chassis_depth-0.4,chassis_y,seat_cushion_z_def],[chassis_depth,dimension_y,dimension_z]);
var back_cushion_end_p = traslaPointsX(back_cushion_p,back_cushion_delta_x);

var back_cushion_back_p = [[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,dimension_z]];
var back_cushion_back_end_p = traslaPointsX(back_cushion_back_p,back_cushion_delta_x)

var back_cushion_down_p = [[chassis_depth-0.4,chassis_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator]];
var back_cushion_down_end_p = traslaPointsX(back_cushion_down_p,back_cushion_delta_x)

var back_cushion_c = BEZIER(S0)(back_cushion_p);
var back_cushion_end_c = BEZIER(S0)(back_cushion_end_p);
var back_cushion_back_c = BEZIER(S0)(back_cushion_back_p);
var back_cushion_back_end_c = BEZIER(S0)(back_cushion_back_end_p);
var back_cushion_down_c = BEZIER(S0)(back_cushion_down_p);
var back_cushion_down_end_c = BEZIER(S0)(back_cushion_down_end_p);

var back_cushion_central = STRUCT([unifyBezierCurves(back_cushion_c,back_cushion_end_c),
                                    unifyBezierCurves(back_cushion_back_c,back_cushion_back_end_c),
                                    unifyBezierCurves(back_cushion_down_c,back_cushion_down_end_c)
                                    ]);


var back_cushion_plx = chassis_depth;
var back_cushion_ply = dimension_y-chassis_y-chassis_thickness;
var back_cushion_plz = dimension_z-seat_cushion_ztraslator-arm_cushion_z;
var back_cushion_pl = CUBOID([back_cushion_plx,back_cushion_ply,back_cushion_plz]);

var back_cushion = STRUCT([ back_cushion_central,
                            T([z])([seat_cushion_ztraslator]),
                            T([y])([dimension_y-back_cushion_ply]), back_cushion_pl,
                            T([x])([dimension_x-chassis_depth])(back_cushion_pl)]);

back_cushion = COLOR(cushion_color)(back_cushion);




var f51 = STRUCT([back_cushion,chassis,seat_cushion,arm_cushions]);



//                                                          F51-2
var x = 0;
var y = 1;
var z = 2;

var dimension_x = 70;
var dimension_y = 27.5;
var dimension_z = 27.5;
var cushion_black_color = rgb([40,40,40]);
var cushion_white_color = rgb([300,300,300]);

var chassis_thickness = 2;
var chassis_depth = 3.5;
var chassis_y = 21;
var chassis_z = 24; 

var back_depth = 7.5;
var back_z = 24;

var seat_cushion_z = 10;


var chassis_ground_1 = CUBOID([dimension_x,chassis_depth,chassis_thickness]) //x
var chassis_ground_2 = CUBOID([chassis_depth,chassis_y,chassis_thickness]) //y
var chassis_ground = STRUCT([chassis_ground_1,chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

var chassis_1 = TNC([y])([chassis_y])(CUBOID([chassis_depth,chassis_thickness,chassis_z]));
var chassis_2 = CUBOID([chassis_thickness,chassis_thickness,dimension_z-back_z])

var chassis = STRUCT([chassis_ground,chassis_1,T([x])([dimension_x-chassis_depth])(chassis_1),
                        T([x,y,z])([chassis_depth-chassis_thickness,chassis_depth,chassis_thickness])(chassis_2),
                        T([x,y,z])([dimension_x-chassis_depth,chassis_depth,chassis_thickness])(chassis_2),
                        T([z])([chassis_z-chassis_thickness]),chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

chassis = COLOR(rgb([40,40,40]))(chassis);


//Seat cushion
var seat_cushion1_x = 2*dimension_x/3;
var seat_cushion2_x = dimension_x - seat_cushion1_x;

var sc_left_back_p = [[0,chassis_y,0],[0,chassis_y,seat_cushion_z]];
var sc_left_down_p = [[0,0,0],[0,chassis_y,0]];
var sc_left_front_p = [[0,0,0],[0,-0.5,seat_cushion_z/2],[0,0,seat_cushion_z]];
var sc_left_up_p = [[0,0,seat_cushion_z],[0,chassis_y/2,seat_cushion_z+0.8],[0,chassis_y,seat_cushion_z]];

var sc_right_back_p1 = traslaPointsX(sc_left_back_p,seat_cushion1_x);
var sc_right_down_p1 = traslaPointsX(sc_left_down_p,seat_cushion1_x);
var sc_right_front_p1 = traslaPointsX(sc_left_front_p,seat_cushion1_x);
var sc_right_up_p1 = traslaPointsX(sc_left_up_p,seat_cushion1_x);

var sc_right_back_p2 = traslaPointsX(sc_left_back_p,seat_cushion2_x);
var sc_right_down_p2 = traslaPointsX(sc_left_down_p,seat_cushion2_x);
var sc_right_front_p2 = traslaPointsX(sc_left_front_p,seat_cushion2_x);
var sc_right_up_p2 = traslaPointsX(sc_left_up_p,seat_cushion2_x);

var sc_left_back_c = BEZIER(S0)(sc_left_back_p);
var sc_left_down_c = BEZIER(S0)(sc_left_down_p);
var sc_left_front_c = BEZIER(S0)(sc_left_front_p);
var sc_left_up_c = BEZIER(S0)(sc_left_up_p);
 
var sc_right_back_c1 = BEZIER(S0)(sc_right_back_p1);
var sc_right_down_c1 = BEZIER(S0)(sc_right_down_p1);
var sc_right_front_c1 = BEZIER(S0)(sc_right_front_p1);
var sc_right_up_c1 = BEZIER(S0)(sc_right_up_p1);

var sc_right_back_c2 = BEZIER(S0)(sc_right_back_p2);
var sc_right_down_c2 = BEZIER(S0)(sc_right_down_p2);
var sc_right_front_c2 = BEZIER(S0)(sc_right_front_p2);
var sc_right_up_c2 = BEZIER(S0)(sc_right_up_p2);

var sc_intermedied_up_p1 = [[seat_cushion1_x/2,0,seat_cushion_z],[seat_cushion1_x/5,chassis_y/2,seat_cushion_z+3],[3*seat_cushion1_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion1_x/2,chassis_y,seat_cushion_z]];
var sc_intermedied_up_p2 = [[seat_cushion2_x/2,0,seat_cushion_z],[seat_cushion2_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion2_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion2_x/2,chassis_y,seat_cushion_z]];
var sc_intermedied_up_c1 = BEZIER(S0)(sc_intermedied_up_p1);
var sc_intermedied_up_c2 = BEZIER(S0)(sc_intermedied_up_p2);

var seat_cushion1 = STRUCT([unifyBezierCurves(sc_left_back_c, sc_right_back_c1),
                            unifyBezierCurves(sc_left_down_c, sc_right_down_c1),
                            unifyBezierCurves(sc_left_front_c, sc_right_front_c1),
                            MAP(BEZIER(S1)([sc_left_up_c,sc_intermedied_up_c1,sc_right_up_c1]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            unifyBezierCurves(sc_left_up_c, sc_left_down_c),
                            unifyBezierCurves(sc_right_up_c1, sc_right_down_c1),
                            unifyBezierCurves(sc_left_front_c, sc_left_back_c),
                            unifyBezierCurves(sc_right_front_c1, sc_right_back_c1)]);

var seat_cushion2 = STRUCT([unifyBezierCurves(sc_left_back_c, sc_right_back_c2),
                            unifyBezierCurves(sc_left_down_c, sc_right_down_c2),
                            unifyBezierCurves(sc_left_front_c, sc_right_front_c2),
                            MAP(BEZIER(S1)([sc_left_up_c,sc_intermedied_up_c2,sc_right_up_c2]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            unifyBezierCurves(sc_left_up_c, sc_left_down_c),
                            unifyBezierCurves(sc_right_up_c2, sc_right_down_c2),
                            unifyBezierCurves(sc_left_front_c, sc_left_back_c),
                            unifyBezierCurves(sc_right_front_c2, sc_right_back_c2)]);

seat_cushion1 = COLOR(cushion_black_color)(seat_cushion1);
seat_cushion2 = COLOR(cushion_white_color)(seat_cushion2);

var seat_cushion_ztraslator = dimension_z-back_z+chassis_thickness;
var seat_cushions = TNC([z])([seat_cushion_ztraslator])(STRUCT([seat_cushion1,TNC([x])([seat_cushion1_x])(seat_cushion2)]));

//Arms cushion
var arm_cushion_z = dimension_z-chassis_z;
var ac_front_down_p = [[0,0,0],[chassis_depth,0,0]];
var ac_front_up_p = [[0.2,0,arm_cushion_z],[(chassis_depth+0.2)/2,0,arm_cushion_z+0.3],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_left_p = [[0,0,0],[0,0,arm_cushion_z/2],[0.2,0,arm_cushion_z]];
var ac_front_right_p = [[chassis_depth,0,0],[chassis_depth,0,arm_cushion_z/2],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_vertical_intermedied_p = [[chassis_depth/2,0,0],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth/2,0,arm_cushion_z]];
var ac_front_horizzontal_intermedied_p = [[0,0,arm_cushion_z/2],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth,0,arm_cushion_z/2]];

var ac_back_down_p = traslaPointsY(ac_front_down_p,dimension_y);
var ac_back_up_p = traslaPointsY(ac_front_up_p,dimension_y);
var ac_back_left_p = traslaPointsY(ac_front_left_p,dimension_y);
var ac_back_right_p = traslaPointsY(ac_front_right_p,dimension_y);
var ac_back_vertical_intermedied_p = [[chassis_depth/2,dimension_y,0],[chassis_depth/2,dimension_y+0.3,arm_cushion_z/2],[chassis_depth/2,dimension_y,arm_cushion_z]];

var ac_front_down_c = BEZIER(S0)(ac_front_down_p);
var ac_front_up_c = BEZIER(S0)(ac_front_up_p);
var ac_front_left_c = BEZIER(S0)(ac_front_left_p);
var ac_front_right_c = BEZIER(S0)(ac_front_right_p);
var ac_front_vertical_intermedied_c = BEZIER(S0)(ac_front_vertical_intermedied_p);

var ac_back_down_c = BEZIER(S0)(ac_back_down_p);
var ac_back_up_c = BEZIER(S0)(ac_back_up_p);
var ac_back_left_c = BEZIER(S0)(ac_back_left_p);
var ac_back_right_c = BEZIER(S0)(ac_back_right_p);
var ac_back_vertical_intermedied_c = BEZIER(S0)(ac_back_vertical_intermedied_p);

var arm_cushion = STRUCT([unifyBezierCurves(ac_front_down_c, ac_back_down_c),
                            unifyBezierCurves(ac_front_up_c, ac_back_up_c),
                            unifyBezierCurves(ac_front_left_c, ac_back_left_c),
                            unifyBezierCurves(ac_front_right_c, ac_back_right_c),
                            MAP(BEZIER(S1)([ac_front_right_c,ac_front_vertical_intermedied_c,ac_front_left_c]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            MAP(BEZIER(S1)([ac_back_right_c,ac_back_vertical_intermedied_c,ac_back_left_c]))(PROD1x1([INTERVALS(1)(8),INTERVALS(1)(8)])),
                            unifyBezierCurves(ac_front_up_c, ac_front_down_c),
                            unifyBezierCurves(ac_back_up_c, ac_back_down_c)
                            ]);


arm_cushion = TNC([z])([chassis_z])(arm_cushion);
arm_cushions = STRUCT([COLOR(cushion_white_color)(arm_cushion),T([x])([dimension_x-chassis_depth])(COLOR(cushion_black_color)(arm_cushion))])

//Back cushion
var seat_cushion_z_def = seat_cushion_z+dimension_z-back_z+chassis_thickness

var back_cushion_delta_x = dimension_x-2*chassis_depth +0.8;
var back_cushion_x1 = seat_cushion1_x-chassis_depth + 0.3;
var back_cushion_x2 = back_cushion_delta_x-back_cushion_x1;
var back_cushion_p = adjustCurveFromCanvas([[0,0.23, 2.8],[0,0.28, 3.58],[0,0.3, 4],[0,0.72, 3.87]],[chassis_depth-0.4,chassis_y,seat_cushion_z_def],[chassis_depth,dimension_y,dimension_z]);
var back_cushion_end_p1 = traslaPointsX(back_cushion_p,back_cushion_x1);
var back_cushion_end_p2 = traslaPointsX(back_cushion_p,back_cushion_x2);

var back_cushion_back_p = [[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,dimension_z]];
var back_cushion_back_end_p1 = traslaPointsX(back_cushion_back_p,back_cushion_x1);
var back_cushion_back_end_p2 = traslaPointsX(back_cushion_back_p,back_cushion_x2);

var back_cushion_down_p = [[chassis_depth-0.4,chassis_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator]];
var back_cushion_down_end_p1 = traslaPointsX(back_cushion_down_p,back_cushion_x1);
var back_cushion_down_end_p2 = traslaPointsX(back_cushion_down_p,back_cushion_x2);

var back_cushion_c = BEZIER(S0)(back_cushion_p);
var back_cushion_end_c1 = BEZIER(S0)(back_cushion_end_p1);
var back_cushion_end_c2 = BEZIER(S0)(back_cushion_end_p2);
var back_cushion_back_c = BEZIER(S0)(back_cushion_back_p);
var back_cushion_back_end_c1 = BEZIER(S0)(back_cushion_back_end_p1);
var back_cushion_back_end_c2 = BEZIER(S0)(back_cushion_back_end_p2);
var back_cushion_down_c = BEZIER(S0)(back_cushion_down_p);
var back_cushion_down_end_c1 = BEZIER(S0)(back_cushion_down_end_p1);
var back_cushion_down_end_c2 = BEZIER(S0)(back_cushion_down_end_p2);

var back_cushion_central1 = STRUCT([unifyBezierCurves(back_cushion_c,back_cushion_end_c1),
                                    unifyBezierCurves(back_cushion_back_c,back_cushion_back_end_c1),
                                    unifyBezierCurves(back_cushion_down_c,back_cushion_down_end_c1)]);

var back_cushion_central2 = STRUCT([unifyBezierCurves(back_cushion_c,back_cushion_end_c2),
                                    unifyBezierCurves(back_cushion_back_c,back_cushion_back_end_c2),
                                    unifyBezierCurves(back_cushion_down_c,back_cushion_down_end_c2)]);

var back_cushion_central = STRUCT([COLOR(cushion_white_color)(back_cushion_central1), TNC([x])([back_cushion_x1])(COLOR(cushion_black_color)(back_cushion_central2))]);

var back_cushion_plx = chassis_depth;
var back_cushion_ply = dimension_y-chassis_y-chassis_thickness;
var back_cushion_plz = dimension_z-seat_cushion_ztraslator-arm_cushion_z;
var back_cushion_pl = CUBOID([back_cushion_plx,back_cushion_ply,back_cushion_plz]);

var back_cushion = STRUCT([ back_cushion_central,
                            T([z])([seat_cushion_ztraslator]),
                            T([y])([dimension_y-back_cushion_ply]), COLOR(cushion_white_color)(back_cushion_pl),
                            COLOR(cushion_black_color)(T([x])([dimension_x-chassis_depth])(back_cushion_pl))]);


var f512 = STRUCT([back_cushion,chassis,seat_cushions,arm_cushions]);


//                                                          Assembly

f51 = RNC([0,1])(PI/2)(f51)
f51 = TNC([0])([27.5])(f51)
f512 = TNC([0,1])([30,30])(f512)
tables = SNC([0,1,2])([0.7,0.7,0.7])(tables)
pot = SNC([0,1,2])([3,3,3])(pot)
cups = SNC([0,1,2])([3,3,3])(cups)
door_complete = SNC([0,1,2])([4,4,4])(door_complete)

var room = STRUCT([SIMPLEX_GRID([[160],[80],[2]]),SIMPLEX_GRID([[2],[80],[100]]),TNC([0])([160])(SIMPLEX_GRID([[2],[80],[100]])),
                    TNC([1])([80])(SIMPLEX_GRID([[25,-32,106],[2],[100]])),TNC([0,1])([25,80])(SIMPLEX_GRID([[32],[2],[2,-60,38]])) ])

room = COLOR(rgb([300,300,300]))(room)

var models = STRUCT([   room,TNC([2])([2]),
                        TNC([0,1])([25,80])(door_complete),TNC([0])([20]), f51,f512,
                        TNC([0,1])([60,5]),tables,TNC([0,1,2])([4,5,17.5])(cups),TNC([0,1,2])([22,5,19.5])(cup),TNC([0,1,2])([25,11,21])(pot)])

draw(models)


// draw(door_complete)