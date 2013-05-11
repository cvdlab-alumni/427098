from exercise3 import *

raggio_volante = 1.5
spessore_volante = 0.3



volante_toro_c1 = bezier_circle_map(raggio_volante, S1)
volante_toro_c2 = bezier_circle_map(raggio_volante-spessore_volante,S1)
volante_toro_c3 = bezier_circle_not_centered_map(raggio_volante-spessore_volante/2,0,0,spessore_volante,S1)
volante_toro_c4 = bezier_circle_not_centered_map(raggio_volante-spessore_volante/2,0,0,-spessore_volante,S1)

volante_toro = BEZIER(S2)([volante_toro_c1,volante_toro_c4,volante_toro_c2,volante_toro_c3,volante_toro_c1])

#Blocco centrale
spessore_nero = 0.2
spessore_grigio = 0.3
nero_p1_up = addZValue([[3.13, 2.08], [3.06, 1.97], [3.02, 2.06], [2.84, 2.1]],0)
nero_p1_down = addZValue([[3.18, 1.7], [3.09, 1.69], [3.02, 1.68], [2.94, 1.7]],0)
nero_c1_up = bezier(nero_p1_up)
nero_c1_down = bezier(nero_p1_down)
nero_c1_2_up = bezier(traslaPointsY( traslaPointsZ(nero_p1_up,spessore_nero), -0.05))
nero_c1_2_down = bezier(traslaPointsY( traslaPointsZ(nero_p1_down,spessore_nero), 0.05))
nero_p1 = unifyAllBezierCurvesClosed([nero_c1_up,nero_c1_2_up,nero_c1_2_down,nero_c1_down],dominio_area)

nero_p2_up = addZValue([[0.8, 1.77], [0.85, 1.69], [1.07, 1.8], [1.15, 1.89]],0)
nero_p2_down = addZValue([[0.9, 1.28], [0.98, 1.32], [1.09, 1.37], [1.18, 1.39]],0)
nero_c2_up = bezier(nero_p2_up)
nero_c2_down = bezier(nero_p2_down)
nero_c2_up_v = traslaPointsY( traslaPointsZ(nero_p2_up,spessore_nero), -0.05)
nero_c2_2_up = bezier(nero_c2_up_v)
nero_c2_down_v = traslaPointsY( traslaPointsZ(nero_p2_down,spessore_nero), 0.05)
nero_c2_2_down = bezier(nero_c2_down_v)
nero_p2 = unifyAllBezierCurvesClosed([nero_c2_down,nero_c2_2_down,nero_c2_2_up,nero_c2_up],dominio_area)

grigio_p1_down = addZValue([[1.18, 1.39], [1.44, 1.44], [1.27, 1.18], [1.4, 1.05], [1.53, 0.86], [1.8, 1.19], [1.95, 0.87]],0)
grigio_p1_up = addZValue([[1.15, 1.89], [1.38, 2.09], [1.47, 2.13], [1.69, 2.18]],0)
grigio_c1_down = bezier(grigio_p1_down)
grigio_c1_up = bezier(grigio_p1_up)
grigio_c2_2_up_v = traslaPointsY( traslaPointsZ(grigio_p1_up,spessore_grigio), -0.05)
grigio_c2_2_up_v[0] = nero_c2_up_v[len(nero_c2_up_v)-1]
grigio_c2_2_up = bezier(grigio_c2_2_up_v)
grigio_c2_2_down_v = traslaPointsY( traslaPointsZ(grigio_p1_down,spessore_grigio), 0.05)
grigio_c2_2_down_v[0] = nero_c2_down_v[len(nero_c2_down_v)-1]
grigio_c2_2_down = bezier(grigio_c2_2_down_v)

grigio_p1 = unifyAllBezierCurvesClosed([grigio_c1_down,grigio_c2_2_down,grigio_c2_2_up,grigio_c1_up],dominio_area)

grigio_p3_down = addZValue([[2.47, 0.99], [2.34, 0.91], [2.13, 0.86], [1.95, 0.88]],0)
grigio_p3_up = addZValue([[2.3, 2.28], [2.19, 2.27], [1.98, 2.33], [1.69, 2.18]],0)
grigio_c3_down = bezier(grigio_p3_down)
grigio_c3_up = bezier(grigio_p3_up)

grigio_c3_3_up_v = traslaPointsY( traslaPointsZ(grigio_p3_up,spessore_grigio), -0.05)
grigio_c3_3_up_v[len(grigio_c3_3_up_v)-1] = grigio_c2_2_up_v[len(grigio_c2_2_up_v)-1]
grigio_c3_3_up = bezier(grigio_c3_3_up_v)
grigio_c3_3_down_v = traslaPointsY( traslaPointsZ(grigio_p3_down,spessore_grigio), 0.05)
grigio_c3_3_down_v[len(grigio_c3_3_down_v)-1] = grigio_c2_2_down_v[len(grigio_c2_2_down_v)-1]
grigio_c3_3_down = bezier(grigio_c3_3_down_v)

grigio_p3 = unifyAllBezierCurvesClosed([grigio_c3_up,grigio_c3_3_up,grigio_c3_3_down,grigio_c3_down],dominio_area)


print flipAux([[2.3, 2.28], [2.19, 2.27], [1.98, 2.33], [1.69, 2.18]])
print flipAux([[2.47, 0.99], [2.34, 0.91], [2.13, 0.86], [1.95, 0.88]])

#POLYMARKER(1,1)(grigio_c2_2_up_v[len(grigio_c2_2_up_v)-1])

# view([ bezMap(nero_c1_up,dominio_linea),bezMap(nero_c1_down,dominio_linea)  ])

#POLYLINE([[0,0,0],grigio_c2_2_up_v[len(grigio_c2_2_up_v)-1]]


view([nero_p1,nero_p2,grigio_p1,grigio_p3])

#view([MAP(volante_toro)(dominio_area), bezMap(nero_c1_up,dominio_linea)])
#view([MAP(volante_toro_c1)(dominio_linea),MAP(volante_toro_c2)(dominio_linea),MAP(volante_toro_c3)(dominio_linea),MAP(volante_toro_c4)(dominio_linea)])



