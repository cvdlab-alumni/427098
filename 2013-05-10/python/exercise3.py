from exercise2 import *
#from funzioniUtiliPyPlasm import *


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

# view([bezMap(ruota_esterno1, dominio_linea),bezMap(ruota_interno1, dominio_linea),bezMap(ruota_esterno2, dominio_linea),bezMap(ruota_interno2, dominio_linea)\
# 	,bezMap(ruota_centro, dominio_linea)])

gomma = MAP(BEZIER(S2)([ruota_interno1,ruota_esterno1,ruota_esterno2,ruota_interno2]))(dominio_area)
gomma = STRUCT([gomma,MAP(BEZIER(S2)([ruota_interno1,ruota_centro,ruota_interno2]))(dominio_area)])

#piatto_del_cerchione = MAP(BEZIER(S2)([ruota_interno1,ruota_centro_interno1,ruota_centro_interno2,ruota_interno2]))(dominio_area)
piatto_del_cerchione_1 = unifyBezierCurves(ruota_interno1,ruota_interno1_1,dominio_area)
piatto_del_cerchione_2 = unifyBezierCurves(ruota_interno2_2,ruota_interno2,dominio_area)
piatto_del_cerchione = STRUCT([piatto_del_cerchione_1,piatto_del_cerchione_2])
routa = STRUCT([gomma,piatto_del_cerchione])

#gomma = COLOR(rgb([100,100,100]))(gomma)

VIEW(routa)