from exercise2 import *
#from funzioniUtiliPyPlasm import *


# raggio_ruota = 0.6
# ampiezza_gomma = 0.27
# ampiezza_piatto = 0.1
# spessore = 0.5

# ruota_esterno1 = bezier_circle_map(raggio_ruota, S1)
# ruota_interno1 = bezier_circle_map(raggio_ruota-ampiezza_gomma,S1)
# ruota_interno1_1 = bezier_circle_map(raggio_ruota-ampiezza_gomma-ampiezza_piatto,S1)


# ruota_esterno2 = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore, S1)
# ruota_interno2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,spessore,S1)
# ruota_interno2_2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma-ampiezza_piatto,0,0,spessore,S1)

# ruota_centro = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore/2, S1)
# ruota_centro_interno1 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,spessore/4, S1)
# ruota_centro_interno2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,3*spessore/4, S1)

# # view([bezMap(ruota_esterno1, dominio_linea),bezMap(ruota_interno1, dominio_linea),bezMap(ruota_esterno2, dominio_linea),bezMap(ruota_interno2, dominio_linea)\
# # 	,bezMap(ruota_centro, dominio_linea)])

# gomma = MAP(BEZIER(S2)([ruota_interno1,ruota_esterno1,ruota_esterno2,ruota_interno2]))(dominio_area)
# gomma = STRUCT([gomma,MAP(BEZIER(S2)([ruota_interno1,ruota_centro,ruota_interno2]))(dominio_area)])

# #piatto_del_cerchione = MAP(BEZIER(S2)([ruota_interno1,ruota_centro_interno1,ruota_centro_interno2,ruota_interno2]))(dominio_area)
# piatto_del_cerchione_1 = unifyBezierCurves(ruota_interno1,ruota_interno1_1,dominio_area)
# piatto_del_cerchione_2 = unifyBezierCurves(ruota_interno2_2,ruota_interno2,dominio_area)
# piatto_del_cerchione = STRUCT([piatto_del_cerchione_1,piatto_del_cerchione_2])

# ruota = STRUCT([gomma,piatto_del_cerchione])


#Cerchione
cerchione_p1 = addZValue([[2.62, 2.86], [3.16, 2.16], [3.36, 2.44], [3.69, 2.93]],0)
c_curva1 = BEZIER(S2)([bezier(cerchione_p1),[3.22, 1.75,0]])

cerchione_p2 = addZValue([[4.41, 1.64], [3.52, 1.76], [3.65, 2.1], [4.06, 2.74]],0)
c_curva2 = BEZIER(S2)([bezier(cerchione_p2),[3.22, 1.75,0]])

cerchione_p3 = addZValue([[4.38, 1.37], [3.46, 1.52], [3.41, 1.38], [3.45, 0.67]],0)
c_curva3 = BEZIER(S2)([bezier(cerchione_p3),[3.22, 1.75,0]])

cerchione_p4 = addZValue([[2.08, 1.21], [3.2, 1.49], [2.93, 1.22], [3.14, 0.62]],0)
c_curva4 = BEZIER(S2)([bezier(cerchione_p4),[3.22, 1.75,0]])

cerchione_p5 = addZValue([[2.01, 1.47], [2.78, 1.86], [2.9, 1.73], [2.31, 2.58]],0)
c_curva5 = BEZIER(S2)([bezier(cerchione_p5),[3.22, 1.75,0]])

cerchione = STRUCT([bezMap(c_curva1,dominio_area),bezMap(c_curva2,dominio_area),bezMap(c_curva3,dominio_area),bezMap(c_curva4,dominio_area),bezMap(c_curva5,dominio_area)])


VIEW(cerchione)
#VIEW(ruota)

#view([cerchione,ruota])