	/**
		Funzioni Ausiliarie
	**/

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


	// function T(dims) {
	//     return function (values) {
	//       return function (object) {
	//        return object.translate(dims, values);
	//       };
	//     };
	//   }

	// function R(dims) {
	//     return function (values) {
	//       return function (object) {
	//        return object.rotate(dims, values);
	//       };
	//     };
	//   }

	// function S(dims) {
	//     return function (values) {
	//       return function (object) {
	//        return object.scale(dims, values);
	//       };
	//     };
	//   }

	//Richiama l'omonima funzione con clone
	function TC(dims) {
	    return function (values) {
	      return function (object) {
	       return object.clone().translate(dims, values);
	      };
	    };
	  }

	//Richiama l'omonima funzione con clone
	function RC(dims) {
	    return function (values) {
	      return function (object) {
	       return object.clone().rotate(dims, values);
	      };
	    };
	  }

	//Richiama l'omonima funzione con clone
	function SC(dims) {
	    return function (values) {
	      return function (object) {
	       return object.clone().scale(dims, values);
	      };
	    };
	  }

	function rgb(color){
		return [color[0]/255, color[1]/255, color[2]/255];
	}

	var scalePoints = function(points,values) {
		return points.map(function(item){
			return item.map(function(elem){
				return elem*values;
			});
		});
	}

	function traslaPointsZ(points,value){
		return points.map(function(item){
			return [item[0],item[1],item[2]+value];
		});
	}

	function traslaPointsY(points,value){
		return points.map(function(item){
			return [item[0],item[1]+value,item[2]];
		});
	}

	function traslaPointsX(points,value){
		return points.map(function(item){
			return [item[0]+value,item[1],item[2]];
		});
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

	function invertSign(point){
		return point.map(function(item){ return -item });
	}

	function wallWithHole(wallDepht,pmin,pmax,l_wall,h_wall){
		var x1 = [ pmin[0], -(pmax[0]-pmin[0]) ];
		if (l_wall-pmax[0]>0)
			x1[2] = l_wall-pmax[0];

		var z2 = [ pmin[1], -(pmax[1]-pmin[1]) ];
		if (h_wall-pmax[1]>0)
			z2[2] = h_wall-pmax[1];

		var sg1 = SIMPLEX_GRID([x1,[wallDepht],[h_wall]]);
		var sg2 = SIMPLEX_GRID([invertSign(x1),[wallDepht],z2]);

		return STRUCT([sg1,sg2]);
	}

	/**
		Fine
	**/


	function x(coord){
		return coord[0];
	}
	function y(coord){
		return coord[1];
	}
	function z(u,v){

		if (u>40 && v>50) return 0; //centro abitato
		else if (u>30 && u<45 && v>20 && v<30) return 0.2; //centro abitato
		else if (u>16 && u<25 && v>16 && v<25) return -(Math.pow(Math.cos(u),2)+Math.pow(Math.sin(v),2)); //lago
		else if (u>30 && v>10 && v<30) return 0.2; //foresta
		return (u+v)*(u*v)%5 + (Math.random() - 0.5);
	}

	//var base = CUBOID([60,60,0.2])
	//var base = T([2])([-0.8])(SIMPLEX_GRID([[10,-15,35],[10,-15,35],[1]]))
	var base = T([2])([-1.8])(CUBOID([60,60,2]))

	function generaTerritorio(point){
		u = x(point)
		v = y(point)
		return [u,v,z(u,v)]
	}

	var dominio = DOMAIN([[0, 60],[0, 60]])([30,30]);
	var montagna = MAP(generaTerritorio)(dominio)
	montagna = STRUCT([montagna,base])
	montagna = COLOR(rgb([101,67,33]))(montagna)
	draw(montagna)


	//Es2
	var colore_acqua = rgb([0,255,255])
	var lago = COLOR(colore_acqua)(SIMPLEX_GRID([[-15,11],[-15,11],[0.3]]))
	draw(lago)


	//Es3
	var domain = PROD1x1([INTERVALS(1)(8),INTERVALS(1)(1)])

	function unifyBezierCurves(map_curve_1,map_curve_2){
		return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(domain);
	}

	function cilynder(r,h){
		return EXTRUDE([h])(DISK(r)([8, 1]))
	}


	function albero(raggio,altezza){
		var colori = [rgb([0,158,96]),rgb([0,153,0]),rgb([0,153,0])]
		var albero_base = cilynder(raggio*0.5,altezza/3);
		var albero_foglie = MAP(BEZIER(S1)([bezier_circle_not_centered_map(raggio,0,0,altezza/3),[0,0,altezza]]))(domain)
		albero_foglie = STRUCT([albero_foglie, unifyBezierCurves(bezier_circle_not_centered_map(raggio*0.5,0,0,altezza/3),bezier_circle_not_centered_map(raggio,0,0,altezza/3))])

		albero_base = COLOR(rgb([101,67,33]))(albero_base)

		var colore = colori[ parseInt(Math.random()*colori.length) ]
		albero_foglie = COLOR(colore)(albero_foglie)

		return STRUCT([albero_base,albero_foglie])
	}

	function generaForesta(area_x,area_y,albero_r,albero_h){

		var y_occupato = 2*albero_r;
		var file_alberi = filaAlberi(area_x,albero_r,albero_h);

		while(y_occupato<area_y){
			file_alberi = STRUCT([file_alberi, T([1])([y_occupato])(filaAlberi(area_x,albero_r,albero_h))]);
			y_occupato += albero_r*2;
		}

		return file_alberi;
	}


	function filaAlberi(area_x,albero_r,albero_h){ //random per cambiare colore
		var rand_r = (Math.random() * 0.5) -0.25 + albero_r;
		var rand_h = (Math.random() * 0.5) -0.25 + albero_h;

		var x_occupato = rand_r*2;
		var alberi = STRUCT([T([0])([x_occupato])(albero(rand_r,rand_h))]);

		while(x_occupato<area_x){

			rand_r = (Math.random() * 0.5) -0.25 + albero_r;
			rand_h = (Math.random() * 0.5) -0.25 + albero_h;
			alberi = STRUCT([alberi,T([0])([x_occupato])(albero(rand_r,rand_h))]);

			x_occupato += rand_r*2
		}

		return alberi;
	}

	var foresta_grande = generaForesta(28,10,0.6,2)
	foresta_grande = T([0,1])([30,10])(foresta_grande)

	var foresta_piccola = generaForesta(8,8,0.6,1.7)
	foresta_piccola = T([0,1])([7,35])(foresta_piccola)

	var foreste = STRUCT([foresta_grande,foresta_piccola])
	draw(foreste)


	//Es4
	function generaCasa(x_dim,y_dim,h_dim){

		var colori = [rgb([204, 51, 51]),rgb([204, 78, 92]),rgb([226, 114, 91]),rgb([178,34,34])]

		var base_h = h_dim*0.5
		var porta_tx = 0.37*x_dim
		var porta_x = 0.2*x_dim
		var porta_z = 0.45*base_h

		var finestra_x = 0.125*x_dim
		var finestra_z = 0.125*base_h
		var finestra_tx1 = 0.1*x_dim
		var finestra_tx2 = 0.75*x_dim
		var finestra_th = 0.1*base_h

		var frontale_basso = wallWithHole(0.1,[porta_tx,0],[porta_tx+porta_x,porta_z],x_dim,porta_z+finestra_th);  
		var porta = CUBOID([0.05,porta_x,porta_z])
		porta = T([0,1])([porta_x+porta_tx,-porta_x])(porta)
		porta = COLOR(rgb([112,66,20]))(porta)

		var frontale_alto1 = wallWithHole(0.1,[finestra_tx1,0],[finestra_tx1+finestra_x,finestra_z],finestra_tx2,base_h-(porta_z+finestra_th));  
		var frontale_alto2 = wallWithHole(0.1,[0,0],[finestra_x,finestra_z],x_dim-finestra_tx2,base_h-(porta_z+finestra_th));  

		var frontale = STRUCT([frontale_basso,TC([2])([porta_z+finestra_th]),frontale_alto1,TC([0])([finestra_tx2])(frontale_alto2)])

		var laterale1 = CUBOID([0.1,y_dim,base_h])
		var laterale2 = T([0])([x_dim])(CUBOID([0.1,y_dim+0.1,base_h]))
		var laterale3 = T([1])([y_dim])(CUBOID([x_dim,0.1,base_h]))

		var casa = STRUCT([frontale,laterale1,laterale2,laterale3])
		casa = STRUCT([T([0,1])([0.1,0.1])(CUBOID([x_dim-0.1,y_dim-0.1,0.1])),casa])
		casa = COLOR(rgb([250, 235, 215]))(casa)

		var tetto_vertici = [ [0,base_h], [x_dim+0.1,base_h], [(x_dim+0.1)/2,h_dim] ];
		var tetto_num_lati = [ [0,1,2] ];
		var tetto_2D = SIMPLICIAL_COMPLEX(tetto_vertici)(tetto_num_lati);
		var tetto = EXTRUDE([y_dim+0.1])(tetto_2D);
		tetto = T([1])([y_dim+0.1])(R([1,2])(PI/2)(tetto))
		var colore = colori[ parseInt(Math.random()*colori.length) ]
		tetto = COLOR(colore)(tetto)

		casa = STRUCT([casa,tetto,porta])

		return casa;
	}


	//Es5 (modifico il 4)
	//I metodi generaStradaOrizzontale e Verticale funzionano in singolo, ma non funzionano quando li utilizzo all'interno del modello
	//In alternativa uso generaStrada che mi riporta un semplice cuboid

	var distanza_case = 1;
	var casa_dim = 0.4;

	var dimensione_strada = 0.5

	function generaStrada(x_dim,y_dim){
		var asfalto = COLOR(rgb([84,84,84]))(CUBOID([x_dim,y_dim,0.01]))

		return asfalto
	}

	function generaStradaOrizzontale(x_dim,y_dim){
		var offset = 0.2
		var asfalto = COLOR(rgb([84,84,84]))(CUBOID([x_dim,y_dim,0.01]))
	 	var segmento = COLOR([1,1,1])(CUBOID([0.2,0.1,0.01]))
	 	var num_seg = (x_dim - offset)/(0.2+0.2)

	 	var righe = STRUCT(REPLICA(num_seg)([segmento,T([0])([0.2+0.2])]))
	 	var strada = STRUCT([asfalto, T([0,1,2])([offset,(y_dim-0.1)/2,0.001])(righe) ])
		return strada

	}

	function generaStradaVerticale(x_dim,y_dim){
		var offset = 0.2
		var asfalto = COLOR(rgb([84,84,84]))(CUBOID([x_dim,y_dim,0.01]))
	 	var segmento = COLOR([1,1,1])(CUBOID([0.1,0.2,0.01]))
	 	var num_seg = (y_dim - offset)/(0.2+0.2)
	 	var righe = STRUCT(REPLICA(num_seg)([segmento,T([1])([0.2+0.2])]))
	 	var strada = STRUCT([asfalto, T([0,1,2])([(x_dim-0.1)/2,offset,0.001])(righe) ])
		return strada

	}



	function generaInsediamento(x_dim,y_dim,casa_x,casa_y,casa_z){

		var offset = 1
		var numero_file = (y_dim-casa_y-offset)/(casa_y+2*distanza_case);

		function filaCase(){

			var rand_x = (Math.random() * 0.3) -0.05 + casa_x;
			var rand_z = (Math.random() * 0.3) -0.15 + casa_z;

			var x_occupato = rand_x+distanza_case+offset;
			var fila = STRUCT([T([0])([offset])(generaCasa(rand_x,casa_y,rand_z))]);

			while(x_occupato+offset<x_dim){

				rand_x = (Math.random() * 0.3) -0.05 + casa_x;
				rand_z = (Math.random() * 0.3) -0.15 + casa_z;
				fila = STRUCT([fila,T([0,1,2])([x_occupato-distanza_case+(distanza_case-dimensione_strada)/2,
												-distanza_case,0.001])(generaStradaVerticale(dimensione_strada,2*(casa_y+ 1.8*dimensione_strada)))
												// -distanza_case,0.001])(generaStrada(dimensione_strada,2*(casa_y+ 1.8*dimensione_strada)))
					,T([0])([x_occupato])(generaCasa(rand_x,casa_y,rand_z))]);
				
				x_occupato += rand_x + distanza_case;
			}

			return fila;
		}

		var file_case = T([1])([offset])(filaCase())
		var y_occupato = casa_x+2*distanza_case+offset

		for (i=1; i<numero_file; i++){
			file_case = STRUCT([file_case,T([1])([y_occupato])(filaCase()),
							T([1,2])([y_occupato-2*distanza_case+(2*distanza_case-dimensione_strada)/2,0.001])(generaStradaOrizzontale(x_dim,dimensione_strada))])
							// T([1,2])([y_occupato-2*distanza_case+(2*distanza_case-dimensione_strada)/2,0.001])(generaStrada(x_dim,dimensione_strada))])

			
			y_occupato += casa_x+2*distanza_case
		}

		file_case = STRUCT([COLOR(rgb([0,153,0]))(CUBOID([x_dim,y_dim,0.05])),T([2])([0.05])(file_case)])

		function aggiungiStradaPerimetrale(cas){

			var s1 = generaStradaOrizzontale(x_dim+2*dimensione_strada,dimensione_strada)
			var s2 = generaStradaVerticale(dimensione_strada,y_dim+dimensione_strada)
			// s1 = generaStrada(x_dim+2*dimensione_strada,dimensione_strada)
			// s2 = generaStrada(dimensione_strada,y_dim+dimensione_strada)

			file_case = STRUCT([cas,TC([2])([0.05]),TC([0,1])([-dimensione_strada,-dimensione_strada])(s1),
				TC([0,1])([-dimensione_strada,y_dim])(s1),TC([0,1])([-dimensione_strada,-dimensione_strada])(s2),
				//TC([0])([x_dim])(s2)]) 
				TC([0,1])([x_dim,-dimensione_strada])(s2)]) 
			return file_case
		}

		return aggiungiStradaPerimetrale(file_case);
	}



	var insediamento1 = generaInsediamento(13,5,casa_dim,casa_dim,casa_dim)

	var insediamento2 = generaInsediamento(25,5,casa_dim,casa_dim,casa_dim)

	insediamento1 = T([0,1])([44.5,53])(insediamento1)
	insediamento2 = T([0,1])([33,22])(insediamento2)

	var insediamenti = STRUCT([T([2])([0.2]),insediamento1,insediamento2])



	draw(insediamenti)
