/*exercise01

Write a constructor function Point2D
that create a 2D point given its x and y coordinates.*/


function Point2D(x,y){
	this.x = x;
	this.y = y;
}

/*exercise02a

Write a contructor function Edge
that create an edge given its two vertices (i.e. two points).

exercise02b

Write a method length for Edge
that compute the length of the edge.*/

function Edge(vertex1, vertex2){
	this.vertex1 = vertex1;
	this.vertex2 = vertex2;

	this.length = function(){
		var l_x = this.vertex1.x - this.vertex2.x; 
		var l_y = this.vertex1.y - this.vertex2.y; 
		return Math.sqrt( (Math.pow(l_x, 2)) + (Math.pow(l_y, 2)) );
	}
}

/*exercise03a

Write a constructor function Trinagle
that create a triangle given its three edges.

exercise03b

Write a method perimeter for Triangle
that compute the perimeter of the triangle.

exercise03b

Write a method area for Triangle
that compute the area of the triangle
(Do you remeber the Erone's formula?).*/

function Triangle(edge1, edge2, edge3){
	this.edge1 = edge1;
	this.edge2 = edge2;
	this.edge3 = edge3;

	this.perimeter = function(){
		return this.edge1.length() + this.edge2.length() + this.edge3.length();
	}

	this.area = function(){
		var semi_p = this.perimeter()/2;
		return Math.sqrt( semi_p * (semi_p - this.edge1.length()) * 
				(semi_p - this.edge2.length()) * (semi_p - this.edge3.length()) ); //formula di Erone
	}
}