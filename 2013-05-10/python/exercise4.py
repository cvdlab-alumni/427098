from exercise3 import *

black = rgb([40,40,40])
raggio_volante = 1.5
spessore_volante = 0.3

volante_toro_c1 = bezier_circle_map(raggio_volante, S1)
volante_toro_c2 = bezier_circle_map(raggio_volante-spessore_volante,S1)
volante_toro_c3 = bezier_circle_not_centered_map(raggio_volante-spessore_volante/2,0,0,spessore_volante,S1)
volante_toro_c4 = bezier_circle_not_centered_map(raggio_volante-spessore_volante/2,0,0,-spessore_volante,S1)

volante_toro = MAP(BEZIER(S2)([volante_toro_c1,volante_toro_c4,volante_toro_c2,volante_toro_c3,volante_toro_c1]))(dominio_area)

#Blocco centrale
spessore_nero = 0.2
spessore_grigio = 0.3
nero_p1_up = addZValue([[3.13, 2.08], [3.06, 1.97], [3.02, 2.06], [2.84, 2.1]],0)
nero_p1_down = addZValue([[3.18, 1.7], [3.09, 1.69], [3.02, 1.68], [2.94, 1.7]],0)
nero_c1_up = bezier(nero_p1_up)
nero_c1_down = bezier(nero_p1_down)
nero_c1_2_up_v = traslaPointsY( traslaPointsZ(nero_p1_up,spessore_nero), -0.05)
nero_c1_2_up = bezier(nero_c1_2_up_v)
nero_c1_2_down_v = traslaPointsY( traslaPointsZ(nero_p1_down,spessore_nero), 0.05)
nero_c1_2_down = bezier(nero_c1_2_down_v)
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


grigio_p4_down = addZValue([[2.47, 0.99], [2.55, 1.25], [2.76, 1.06], [2.86, 1.31], [3.05, 1.54], [2.71, 1.59], [2.94, 1.7]],0)
grigio_p4_up = addZValue([[2.3, 2.28], [2.51, 2.25], [2.61, 2.23], [2.84, 2.1]],0)
grigio_c4_down = bezier(grigio_p4_down)
grigio_c4_up = bezier(grigio_p4_up)

grigio_c4_4_up_v = traslaPointsY( traslaPointsZ(grigio_p4_up,spessore_grigio), -0.05)
grigio_c4_4_up_v[len(grigio_c4_4_up_v)-1] = nero_c1_2_up_v[len(nero_c1_2_up_v)-1]
grigio_c4_4_up = bezier(grigio_c4_4_up_v)
grigio_c4_4_down_v = traslaPointsY( traslaPointsZ(grigio_p4_down,spessore_grigio), 0.05)
grigio_c4_4_down_v[len(grigio_c4_4_down_v)-1] = nero_c1_2_down_v[len(nero_c1_2_down_v)-1]
grigio_c4_4_down = bezier(grigio_c4_4_down_v)

grigio_p4 = unifyAllBezierCurvesClosed([grigio_c4_down,grigio_c4_4_down,grigio_c4_4_up,grigio_c4_up],dominio_area)


#Nero centrale
nero_centro_delta = 0.05
nero_centro_up1 = traslaPointsZ( addZValue([[2, 2.12], [1.87, 2.1], [1.66, 2.06], [1.36, 1.91]],0) ,0.03)
nero_centro_down1 = addZValue([[2.21, 1.01],[1.75, 0.85], [2.05, 1.06], [1.35, 1.45]],0)
nero_centro_up1_1 = traslaPointsZ(traslaPointsY(traslaPointsX(nero_centro_up1,nero_centro_delta),-nero_centro_delta),-nero_centro_delta)
nero_centro_down1_1 = traslaPointsZ(traslaPointsY(traslaPointsX(nero_centro_down1,nero_centro_delta),nero_centro_delta),nero_centro_delta)

nero_centro_up2 = traslaPointsZ( addZValue([[2.66, 2.12], [2.4, 2.17], [2.2, 2.18], [2, 2.12]],0) ,0.03)
nero_centro_down2 = addZValue([[2.78, 1.68], [2.23, 0.89], [2.7, 1.11], [2.21, 1.01]],0)
nero_centro_up2_1 = traslaPointsZ(traslaPointsY(traslaPointsX(nero_centro_up2,nero_centro_delta),-nero_centro_delta),-nero_centro_delta)
nero_centro_down2_1 = traslaPointsZ(traslaPointsY(traslaPointsX(nero_centro_down2,nero_centro_delta),nero_centro_delta),nero_centro_delta)

curva_1 = bezier(nero_centro_up1)
curva_2 = bezier(nero_centro_down1)
curva_3 = bezier(nero_centro_up1_1)
curva_4 = bezier(nero_centro_down1_1)
curva_5 = bezier(nero_centro_up2)
curva_6 = bezier(nero_centro_down2)
curva_7 = bezier(nero_centro_up2_1)
curva_8 = bezier(nero_centro_down2_1)

nero_centro_p1 = BEZIER(S2)([curva_3,curva_1,curva_4,curva_2])
nero_centro_p2 = BEZIER(S2)([curva_7,curva_5,curva_8,curva_6])

nero_centro = STRUCT([ MAP(nero_centro_p1)(dominio_area), MAP(nero_centro_p2)(dominio_area) ])


parte_grigia = STRUCT([grigio_p1,grigio_p3,grigio_p4])
parte_nera = COLOR(black)(STRUCT([nero_p1,nero_p2,T([3])([spessore_grigio])(nero_centro)]))
volante_toro = COLOR(black)(volante_toro)

interno_volante = STRUCT([parte_nera,parte_grigia])
interno_volante = R([1,2])(-PI/10)(interno_volante)

logo_ferrari = CIRCLE(0.1)([32,32])
logo_ferrari = TEXTURE('../images/logo.png')(logo_ferrari)

pulsante = COLOR([0.7,0,0])(CIRCLE(0.07)([32,32]))


scala_interno_volante = 1.2
volante = STRUCT([S([1,2,3])([scala_interno_volante])(T([1,2,3])([-2.4,-1,-0.1])(interno_volante)),volante_toro,\
	T([3])([0.23])(logo_ferrari),T([1,2,3])([-0.7,-0.3,0.20])(pulsante) ])

volante = R([1,3])(-PI/2)(volante)
volante = R([2,3])(PI/2)(volante)
scala_volante = 0.25
volante = S([1,2,3])([scala_volante,scala_volante,scala_volante])(volante)
volante = T([1,2,3])([4,2,1.3])(volante)
view([profili1,ruote,volante])


