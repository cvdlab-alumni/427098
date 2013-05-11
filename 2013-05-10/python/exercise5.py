from exercise4 import *

rosso_ferrari = rgb([204, 0, 0])

ampiezza_parabrezza = 3
ampiezza_macchina = 3
delta_muso = 0.5

parabrezza_profilo = addYValue([[4.78, 6.76], [4.2, 6.51], [3.83, 6.26], [3.65, 6.14]],0)
parabrezza_profilo_laterale = traslaPointsY(parabrezza_profilo,ampiezza_parabrezza)
parabrezza_profilo_centro = traslaPointsY(addYValue([[4.76, 6.84], [4.13, 6.6], [3.74, 6.39], [3.23, 6.15]],0),ampiezza_parabrezza/2 + 0.2)
parab_c1 = bezier(parabrezza_profilo)
parab_cc = bezier(parabrezza_profilo_centro)
parab_c2 = bezier(parabrezza_profilo_laterale)

parabrezza = bezMap(BEZIER(S2)([parab_c2,parab_cc,parab_c1]),dominio_area)
parabrezza = T([2,3])([1.2,-4.5])(parabrezza)

muso_profilo1 = addYValue([[0.65, 5.57], [1.62, 5.81], [1.95, 6.11], [3.58, 5.57]],0)
muso_profilo2 = addYValue([[1.29, 5.97], [3.15, 6.27], [3.21, 6.16], [3.61, 6.16]],0.5)
muso_profilo3 = addYValue([[0.63, 5.57], [1.2, 6.14], [2.5, 6.09], [3.13, 6.17]],1)

muso_profilo4 = traslaPointsY(muso_profilo3,1)
muso_profilo5 = traslaPointsY(muso_profilo2,2)
muso_profilo6 = traslaPointsY(muso_profilo1,3)

muso_curva1 = bezier(muso_profilo1)
muso_curva2 = bezier(muso_profilo2)
muso_curva3 = bezier(muso_profilo3)
muso_curva4 = bezier(muso_profilo4)
muso_curva5 = bezier(muso_profilo5)
muso_curva6 = bezier(muso_profilo6)

muso = bezMap(BEZIER(S2)([muso_curva1,muso_curva2,muso_curva3,muso_curva4,muso_curva5,muso_curva6]),dominio_area)
muso = T([2,3])([1.2,-4.5])(muso)

print flipAux([[2.56, 4.88], [2.8, 5.93], [1.09, 6.36], [1.13, 4.78]])

# view([bezMap(muso_curva1,dominio_linea),bezMap(muso_curva2,dominio_linea),bezMap(muso_curva3,dominio_linea),\
# 	bezMap(muso_curva4,dominio_linea),bezMap(muso_curva5,dominio_linea),bezMap(muso_curva6,dominio_linea)  ])

profilo_basso1 = addYValue([[0.4, 4.93], [0.59, 4.77], [0.72, 4.8], [1.13, 4.78]],0)
profilo_alto1 = addYValue([[0.5, 5.55], [0.94, 5.62], [1, 5.67], [1.25, 5.82]],0)
basso_p1 = unifyBezierCurves(bezier(profilo_basso1),bezier(profilo_alto1),dominio_area)

profilo_basso2 = addYValue([[1.13, 4.78], [1.09, 6.36], [2.8, 5.93], [2.56, 4.88]],0)
profilo_alto2 = addYValue([[1.25, 5.82], [1.76, 5.87], [2.27, 5.92], [2.77, 5.94]],0)
basso_p2 = unifyBezierCurves(bezier(profilo_basso2),bezier(profilo_alto2),dominio_area)

profilo_basso3 = addYValue([[3.58, 4.9], [3.29, 4.91], [3.04, 4.86], [2.61, 4.89]],0)
profilo_alto3 = addYValue([[3.63, 5.96], [3.32, 5.96], [3.04, 5.94], [2.77, 5.94]],0)
basso_p3 = unifyBezierCurves(bezier(profilo_basso3),bezier(profilo_alto3),dominio_area)

parte_inferiore = STRUCT([basso_p1,basso_p2])
parte_inferiore = T([1,2,3])([0,1.2,-4.6])(parte_inferiore)

profili1 = STRUCT([profili1, T([2])([5])(profilo_laterale)])
esercizi_precedenti = STRUCT([profili1,ruote,volante])


tetto_p1 = addYValue([[4.81, 6.75], [5.35, 6.94], [6.29, 6.84], [6.63, 6.82]],0)
tetto_p2 = addYValue([[4.79, 6.85], [5.33, 6.96], [6.23, 6.94], [6.66, 6.89]],ampiezza_macchina/2)
tetto_p3 = addYValue([[4.81, 6.75], [5.35, 6.94], [6.29, 6.84], [6.63, 6.82]],ampiezza_macchina)

tetto_c1 = bezier(tetto_p1)
tetto_c2 = bezier(tetto_p2)
tetto_c3 = bezier(tetto_p3)

tetto = bezMap(BEZIER(S2)([tetto_c1,tetto_c2,tetto_c3]),dominio_area)
tetto = T([2,3])([1.2,-4.5])(tetto)

parti_rosse = COLOR(rosso_ferrari)(STRUCT([muso,parte_inferiore,tetto,T([2])([ampiezza_macchina])(parte_inferiore)]))




# sedile_profilo1 = addYValue([[5.63, 0.95], [5.5, 1.16], [5.78, 1.54], [6.15, 2.28]],0)
# sedile_profilo2 = addYValue([[5.99, 1.04], [6.12, 1.4], [6.25, 1.73], [6.25, 2.16]],0.5)
# sedile_profilo3 = addYValue([[5.63, 0.95], [5.5, 1.16], [5.78, 1.54], [6.15, 2.28]],1)
# sedile_profilo4 = addYValue(sedile_profilo3,2)
# sedile_profilo5 = addYValue(sedile_profilo1,4)
# sedile_profilo6 = addYValue(sedile_profilo,4.5)

# sedile_curva1 = bezier(sedile_profilo1)
# sedile_curva2 = bezier(sedile_profilo2)
# sedile_curva3 = bezier(sedile_profilo3)
# sedile_curva4 = bezier(sedile_profilo4)
# sedile_curva5 = bezier(sedile_profilo5)
# sedile_curva6 = bezier(sedile_profilo6)
# sedile = bezMap(BEZIER(S2)([sedile_curva1,sedile_curva2,sedile_curva3,sedile_curva4,sedile_curva5,sedile_curva6]),dominio_area)


view([esercizi_precedenti,grid3DLightDetailed(10), parabrezza, parti_rosse ])
