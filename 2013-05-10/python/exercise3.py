from exercise2 import *

raggio_ruota = 0.6
ampiezza_gomma = 0.27
ampiezza_piatto = 0.1
spessore = 0.5

ruota_esterno1 = bezier_circle_map(raggio_ruota, S1)
ruota_interno1 = bezier_circle_map(raggio_ruota-ampiezza_gomma,S1)
ruota_interno1_1 = bezier_circle_map(raggio_ruota-ampiezza_gomma-ampiezza_piatto,S1)


ruota_esterno2 = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore, S1)
ruota_interno2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,spessore,S1)
ruota_interno2_2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma-ampiezza_piatto,0,0,spessore,S1)

ruota_centro = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore/2, S1)
ruota_centro_interno1 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,spessore/4, S1)
ruota_centro_interno2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,3*spessore/4, S1)

view([bezMap(ruota_esterno1, dominio_linea),bezMap(ruota_interno1, dominio_linea),bezMap(ruota_esterno2, dominio_linea),bezMap(ruota_interno2, dominio_linea)\
	,bezMap(ruota_centro, dominio_linea)])

gomma = MAP(BEZIER(S2)([ruota_interno1,ruota_esterno1,ruota_esterno2,ruota_interno2]))(dominio_area)
gomma = STRUCT([gomma,MAP(BEZIER(S2)([ruota_interno1,ruota_centro,ruota_interno2]))(dominio_area)])
gomma = TEXTURE('../images/ruota.jpg')(gomma)

piatto_del_cerchione_1 = unifyBezierCurves(ruota_interno1,ruota_interno1_1,dominio_area)
piatto_del_cerchione_2 = unifyBezierCurves(ruota_interno2_2,ruota_interno2,dominio_area)
piatto_del_cerchione = STRUCT([piatto_del_cerchione_1,piatto_del_cerchione_2])

ruota = STRUCT([gomma,piatto_del_cerchione])


#Cerchione
spessore_centro = 0.1
centro_cerchione = [3.22, 1.75,-spessore_centro]
cerchione_p1 = addZValue([[1.97, 1.44], [2.78, 1.86], [2.9, 1.73], [2.24, 2.68]],0)
c_curva1 = BEZIER(S2)([bezier(cerchione_p1),centro_cerchione])

cerchione_p2 = addZValue([[2.5, 2.87], [3.23, 1.99], [3.29, 2.18], [3.78, 2.96]],0)
c_curva2 = BEZIER(S2)([bezier(cerchione_p2),centro_cerchione])

cerchione_p3 = addZValue([[4.06, 2.81], [3.61, 1.95], [3.51, 1.8], [4.5, 1.62]],0)
c_curva3 = BEZIER(S2)([bezier(cerchione_p3),centro_cerchione])

cerchione_p4 = addZValue([[4.44, 1.4], [3.49, 1.43], [3.46, 1.54], [3.41, 0.56]],0)
c_curva4 = BEZIER(S2)([bezier(cerchione_p4),centro_cerchione])

cerchione_p5 = addZValue([[3.15, 0.53], [2.87, 1.46], [3.27, 1.4], [2.03, 1.2]],0)
c_curva5 = BEZIER(S2)([bezier(cerchione_p5),centro_cerchione])

#Unisco le punte

cerchione_p6 = addZValue([cerchione_p1[len(cerchione_p1)-1],cerchione_p2[0]],0)
c_curva6 = BEZIER(S2)([bezier(cerchione_p6),centro_cerchione])

cerchione_p7 = addZValue([cerchione_p2[len(cerchione_p2)-1],cerchione_p3[0]],0)
c_curva7 = BEZIER(S2)([bezier(cerchione_p7),centro_cerchione])

cerchione_p8 = addZValue([cerchione_p3[len(cerchione_p3)-1],cerchione_p4[0]],0)
c_curva8 = BEZIER(S2)([bezier(cerchione_p8),centro_cerchione])

cerchione_p9 = addZValue([cerchione_p4[len(cerchione_p4)-1],cerchione_p5[0]],0)
c_curva9 = BEZIER(S2)([bezier(cerchione_p9),centro_cerchione])

cerchione_p10 = addZValue([cerchione_p5[len(cerchione_p5)-1],cerchione_p1[0]],0)
c_curva10 = BEZIER(S2)([bezier(cerchione_p10),centro_cerchione])

cerchione = STRUCT([bezMap(c_curva1,dominio_area),bezMap(c_curva2,dominio_area),bezMap(c_curva3,dominio_area),bezMap(c_curva4,dominio_area),\
	bezMap(c_curva5,dominio_area),bezMap(c_curva6,dominio_area),bezMap(c_curva7,dominio_area),bezMap(c_curva8,dominio_area),bezMap(c_curva9,dominio_area),\
	bezMap(c_curva10,dominio_area)  ])

fattore_scala = 0.2
cerchione = S([1,2,3])([fattore_scala,fattore_scala,fattore_scala])(cerchione)
cerchione = T([1,2])([-0.65,-0.35])(cerchione)

logo_ferrari = CIRCLE(0.05)([32,32])
logo_ferrari = R([1,3])(PI)(logo_ferrari)
logo_ferrari = TEXTURE('../images/logo.png')(logo_ferrari)
cerchione = STRUCT([cerchione,T([3])([-0.02])(logo_ferrari)])

cerchione2 = R([1,3])(PI)(cerchione)
cerchione2 = T([3])([spessore])(cerchione2)

ruota = STRUCT([ruota,cerchione,cerchione2])
ruota = R([1,3])(PI/2)(ruota)
ruota = R([1,2])(PI/2)(ruota)


#Sistemo le istanze
coppia_ruote = STRUCT([T([1])([1.8])(ruota),T([1])([7])(ruota)])
ruote = STRUCT([ T([2,3])([raggio_ruota,raggio_ruota]),T([2])([1])(coppia_ruote),T([2])([3.5])(coppia_ruote) ])


#view([profili1,ruote])
