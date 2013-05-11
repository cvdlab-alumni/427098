from funzioniUtiliPyPlasm import *

#Non ho disegnato il parabrezza, in quanto non appartiene al profilo laterale, ma al frontale

def bezier(profilo):
	return BEZIER(S1)(profilo)

def bezMap(map,dom):
	return MAP(map)(dom)

def flipAux(coordinata):
	i = len(coordinata)-1
	out = []
	while i>=0:
		out.append(coordinata[i])
		i -= 1
	return out

def traslateZAllPoints(args,value):
	out = []
	for c in args:
		out.append(traslaPointsZ(c, value))
	return out

dominio_linea = dom1D(32)
dominio_area = dom2D(20, 20)
profilo_laterale_trasl_z = -4.5
profilo_frontale_trasl_z = -1

profilo_laterale_p1 = traslaPointsZ(addYValue([[0.33, 4.91], [0.28, 5.42], [0.21, 5.38], [0.7, 5.68], [1.41, 6.15], [2.26, 6.04],[3.16, 6.19]],0),profilo_laterale_trasl_z)
profilo_laterale_p2 = traslaPointsZ(addYValue([[3.15, 6.19], [3.32, 6.12], [3.52, 6.13], [3.65, 6.17]],0),profilo_laterale_trasl_z)
profilo_laterale_p2_1 = traslaPointsZ(addYValue([[3.65, 6.17], [5.14, 7.36], [6.98, 6.78], [8.81, 6.35]],0),profilo_laterale_trasl_z)
profilo_laterale_p3 = traslaPointsZ(addYValue([[8.81, 6.35], [9.12, 5.99], [8.86, 5.83], [9.11, 5.65], [8.96, 5.3], [9.05, 5.32], [9.01, 5.2]],0),profilo_laterale_trasl_z)
profilo_laterale_p4 = traslaPointsZ(addYValue([[9.03, 5.22], [9.07, 5.17], [9.01, 5.04], [8.89, 5.04], [8.85, 4.95], [8.57, 4.9], [7.83, 4.79]],0),profilo_laterale_trasl_z)
profilo_laterale_p5 = traslaPointsZ(addYValue([[7.82, 4.8], [8.02, 6.12], [6.37, 6.01], [6.4, 4.96]],0),profilo_laterale_trasl_z)
profilo_laterale_p6 = traslaPointsZ(addYValue([[6.4, 4.96], [5.05, 4.85], [4.57, 4.91], [2.57, 4.88]],0),profilo_laterale_trasl_z)
profilo_laterale_p7 = traslaPointsZ(addYValue([[2.55, 4.89], [2.72, 5.89], [1.02, 6.02], [1.14, 4.81]],0),profilo_laterale_trasl_z)
profilo_laterale_p8 = traslaPointsZ(addYValue([[1.14, 4.81], [0.59, 4.77], [0.5, 4.85], [0.33, 4.91]],0),profilo_laterale_trasl_z)
profilo_laterale_p9 = traslaPointsZ(addYValue([[3.84, 6.14], [5.08, 6.18], [6.27, 6.21], [6.93, 6.4]],0),profilo_laterale_trasl_z)
profilo_laterale_p10 = traslaPointsZ(addYValue([[3.84, 6.14], [5.3, 7.32], [6.9, 6.51], [6.95, 6.51], [6.93, 6.4]],0),profilo_laterale_trasl_z)
#Sportello
profilo_laterale_p11 = traslaPointsZ(addYValue([[6, 6.23], [6.36, 5.96], [5.92, 4.89], [5.35, 4.98], [5.16, 4.93], [4.06, 4.96], [3.59, 4.95]],0),profilo_laterale_trasl_z)
profilo_laterale_p12 = traslaPointsZ(addYValue([[3.59, 4.95], [3.6, 5.29], [3.45, 6.08], [3.82, 6.13], [4.42, 6.16], [5.35, 6.14], [6, 6.23]],0),profilo_laterale_trasl_z)
#Fari
profilo_laterale_p13 = traslaPointsZ(addYValue([[0.64, 5.59], [1.03, 5.63], [1.09, 5.74], [1.35, 5.9]],0),profilo_laterale_trasl_z)
profilo_laterale_p14 = traslaPointsZ(addYValue([[5.83, 5.65], [5.82, 5.81], [3.81, 5.84], [2.23, 5.83]],0),profilo_laterale_trasl_z)
profilo_laterale_p15 = traslaPointsZ(addYValue([[5.83, 5.65], [5.89, 5.04], [4.36, 5.22], [2.63, 5.11]],0),profilo_laterale_trasl_z)
profilo_laterale_p16 = traslaPointsZ(addYValue([[8.65, 6.15], [8.6, 5.92], [8.71, 5.95], [8.75, 5.88], [8.75, 5.88], [8.82, 6.08], [8.73, 6.13],[8.65, 6.15]],0),profilo_laterale_trasl_z)
profilo_laterale_p17 = traslaPointsZ(traslaPointsX(profilo_laterale_p16, 0.11),0.05)
profilo_laterale_p18 = traslaPointsZ(addYValue([[7.52, 5.74], [8.12, 5.76], [8.61, 5.83], [8.98, 5.79]],0),profilo_laterale_trasl_z)
profilo_laterale_p19 = traslaPointsZ(addYValue([[7.94, 5.23], [8.3, 5.28], [8.64, 5.28], [9, 5.32]],0),profilo_laterale_trasl_z)


#Traslo in basso la macchina

curva_1 = bezier(profilo_laterale_p1)
curva_2 = bezier(profilo_laterale_p2)
curva_2_1 = bezier(profilo_laterale_p2_1)
curva_3 = bezier(profilo_laterale_p3)
curva_4 = bezier(profilo_laterale_p4)
curva_5 = bezier(profilo_laterale_p5)
curva_6 = bezier(profilo_laterale_p6)
curva_7 = bezier(profilo_laterale_p7)
curva_8 = bezier(profilo_laterale_p8)
curva_9 = bezier(profilo_laterale_p9)
curva_10 = bezier(profilo_laterale_p10)
curva_11 = bezier(profilo_laterale_p11)
curva_12 = bezier(profilo_laterale_p12)
curva_13 = bezier(profilo_laterale_p13)
curva_14 = bezier(profilo_laterale_p14)
curva_15 = bezier(profilo_laterale_p15)
curva_16 = bezier(profilo_laterale_p16)
curva_17 = bezier(profilo_laterale_p17)
curva_18 = bezier(profilo_laterale_p18)
curva_19 = bezier(profilo_laterale_p19)

profilo_laterale = STRUCT([ bezMap(curva_1,dominio_linea),bezMap(curva_2,dominio_linea),bezMap(curva_2_1,dominio_linea),bezMap(curva_3,dominio_linea),bezMap(curva_4,dominio_linea), \
	 bezMap(curva_5,dominio_linea), bezMap(curva_6,dominio_linea),bezMap(curva_7,dominio_linea), bezMap(curva_8,dominio_linea), bezMap(curva_9,dominio_linea), \
	  bezMap(curva_10,dominio_linea), bezMap(curva_11,dominio_linea), bezMap(curva_12,dominio_linea), bezMap(curva_13,dominio_linea) \
	  , bezMap(curva_14,dominio_linea), bezMap(curva_15,dominio_linea), bezMap(curva_16,dominio_linea), bezMap(curva_17,dominio_linea) \
	  , bezMap(curva_18,dominio_linea), bezMap(curva_19,dominio_linea) ])

#Profilo frontale
profilo_frontale_1 = traslaPointsZ(addXValue([[1.02, 1.38], [1.25, 1.36], [1.59, 1.37],[1.7, 1.35], [1.81, 1.51], [2.19, 1.37],[3.32, 1.45], [3.41, 1.37], [3.54, 1.37], [4.13, 1.38]],0),profilo_frontale_trasl_z)
pf_curva_1 = bezier(profilo_frontale_1)

profilo_frontale_2 = traslaPointsZ(addXValue([[1.02, 1.38], [0.93, 1.43], [0.86, 1.8], [0.84, 2.42], [0.94, 2.54], [1.06, 2.66], [1.21, 2.86]],0),profilo_frontale_trasl_z)
pf_curva_2 = bezier(profilo_frontale_2)

profilo_frontale_3 = traslaPointsZ(addXValue([[1.21, 2.86], [1.6, 3.54], [1.67, 3.36], [2.13, 3.43], [2.59, 3.45], [3.06, 3.46], [3.52, 3.39]],0),profilo_frontale_trasl_z)
pf_curva_3 = bezier(profilo_frontale_3)

profilo_frontale_4 = traslaPointsZ(addXValue([[3.52, 3.39], [3.95, 3.05], [4.01, 2.64], [4.18, 2.62], [4.45, 2.43], [4.26, 1.77], [4.13, 1.38]],0),profilo_frontale_trasl_z)
pf_curva_4 = bezier(profilo_frontale_4)

#Parabrezza
profilo_frontale_5 = traslaPointsZ(addXValue([[1.17, 2.67], [1.47, 2.71], [3.53, 2.71], [3.96, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_5 = bezier(profilo_frontale_5)

profilo_frontale_6 = traslaPointsZ(addXValue([[1.17, 2.67], [1.24, 2.79], [1.3, 2.97], [1.58, 3.25]],0),profilo_frontale_trasl_z)
pf_curva_6 = bezier(profilo_frontale_6)

profilo_frontale_7 = traslaPointsZ(addXValue([[1.58, 3.25], [2.05, 3.4], [3.18, 3.36], [3.59, 3.27]],0),profilo_frontale_trasl_z)
pf_curva_7 = bezier(profilo_frontale_7)

profilo_frontale_8 = traslaPointsZ(addXValue([[3.59, 3.27], [3.8, 3.03], [3.93, 2.87], [3.97, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_8 = bezier(profilo_frontale_8)


#Cofano
profilo_frontale_9 = traslaPointsZ(addXValue([[3.74, 2.66], [3.21, 2.1], [3.53, 2.18], [2.62, 2.19]],0),profilo_frontale_trasl_z)
pf_curva_9 = bezier(profilo_frontale_9)

profilo_frontale_10 = traslaPointsZ(addXValue([[1.4, 2.66], [1.89, 2.11], [1.59, 2.17], [2.62, 2.19]],0),profilo_frontale_trasl_z)
pf_curva_10 = bezier(profilo_frontale_10)

profilo_frontale_11 = traslaPointsZ(addXValue([[3.69, 2.13], [3.55, 2.26], [3.77, 2.4], [3.91, 2.49], [4.25, 2.3], [4.02, 2.07], [3.69, 2.13]],0),profilo_frontale_trasl_z)
pf_curva_11 = bezier(profilo_frontale_11)

profilo_frontale_12 = traslaPointsZ(addXValue([[1.4, 2.1], [1.58, 2.15], [1.52, 2.34], [1.22, 2.48], [0.97, 2.32], [1.07, 2.08], [1.4, 2.1]],0),profilo_frontale_trasl_z)
pf_curva_12 = bezier(profilo_frontale_12)

#Specchietto - sinistra
profilo_frontale_13 = traslaPointsZ(addXValue([[1.14, 2.78],[1.07, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_13 = bezier(profilo_frontale_13)

profilo_frontale_14 = traslaPointsZ(addXValue([[1.07, 2.8],[1.04, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_14 = bezier(profilo_frontale_14)

profilo_frontale_15 = traslaPointsZ(addXValue([[1.04, 2.69],[1.07, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_15 = bezier(profilo_frontale_15)

profilo_frontale_16 = traslaPointsZ(addXValue([[1.14, 2.78],[1.07, 2.8]],0),profilo_frontale_trasl_z)
pf_curva_16 = bezier(profilo_frontale_16)

profilo_frontale_17 = traslaPointsY(traslaPointsZ(addXValue([[0.75, 2.86], [0.65, 2.78], [0.8, 2.66], [1.04, 2.69], [1.15, 2.96], [0.88, 2.94], [0.75, 2.86]],0),profilo_frontale_trasl_z-0.06),0.08)
pf_curva_17 = bezier(profilo_frontale_17)

profilo_frontale_18 = traslaPointsY(traslaPointsZ(addXValue([[0.75, 2.86], [0.65, 2.78], [0.8, 2.66], [1.04, 2.69], [1.15, 2.96], [0.88, 2.94], [0.75, 2.86]],0),profilo_frontale_trasl_z-0.06),0.08)
pf_curva_18 = bezier(profilo_frontale_18)

#Specchietto - destra
profilo_frontale_19 = traslaPointsZ(addXValue([[4.08, 2.82], [4.01, 2.8]],0),profilo_frontale_trasl_z)
pf_curva_19 = bezier(profilo_frontale_19)

profilo_frontale_20 = traslaPointsZ(addXValue([[4.09, 2.69], [4.1, 2.73]],0),profilo_frontale_trasl_z)
pf_curva_20 = bezier(profilo_frontale_20)

profilo_frontale_21 = traslaPointsZ(addXValue([[4.08, 2.82], [4.1, 2.73]],0),profilo_frontale_trasl_z)
pf_curva_21 = bezier(profilo_frontale_21)

profilo_frontale_22 = traslaPointsZ(addXValue([[4.01, 2.8], [4.09, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_22 = bezier(profilo_frontale_22)

profilo_frontale_23 = traslaPointsZ(addXValue([[4.1, 2.84], [4.04, 2.63], [4.45, 2.67],[4.41, 2.85], [4.38, 2.94], [4.1, 2.95], [4.1, 2.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_23 = bezier(profilo_frontale_23)

#Griglia
profilo_frontale_24 = traslaPointsZ(addXValue([[1.63, 1.82], [2.08, 1.86], [3.26, 1.83], [3.5, 1.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_24 = bezier(profilo_frontale_24)

profilo_frontale_25 = traslaPointsZ(addXValue([[1.63, 1.82], [1.69, 1.38], [2.36, 1.53],[2.58, 1.51], [2.76, 1.51], [3.38, 1.41], [3.5, 1.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_25 = bezier(profilo_frontale_25)

profilo_frontale = STRUCT([ bezMap(pf_curva_1,dominio_linea), bezMap(pf_curva_2,dominio_linea), bezMap(pf_curva_3,dominio_linea),\
     bezMap(pf_curva_4,dominio_linea),bezMap(pf_curva_5,dominio_linea),bezMap(pf_curva_6,dominio_linea),bezMap(pf_curva_7,dominio_linea),\
     bezMap(pf_curva_8,dominio_linea),bezMap(pf_curva_9,dominio_linea),bezMap(pf_curva_10,dominio_linea),bezMap(pf_curva_11,dominio_linea),\
     bezMap(pf_curva_12,dominio_linea),bezMap(pf_curva_13,dominio_linea),bezMap(pf_curva_14,dominio_linea),bezMap(pf_curva_15,dominio_linea),\
     bezMap(pf_curva_16,dominio_linea),bezMap(pf_curva_17,dominio_linea),bezMap(pf_curva_18,dominio_linea),bezMap(pf_curva_19,dominio_linea),\
     bezMap(pf_curva_20,dominio_linea),bezMap(pf_curva_21,dominio_linea),bezMap(pf_curva_22,dominio_linea),bezMap(pf_curva_23,dominio_linea),\
     bezMap(pf_curva_24,dominio_linea),bezMap(pf_curva_25,dominio_linea) ])

#Profilo superiore

# profilo_superiore_1 = traslaPointsY(traslaPointsX(addZValue([[1.63, 1.82], [1.69, 1.38], [2.36, 1.53],[2.58, 1.51], [2.76, 1.51], [3.38, 1.41], [3.5, 1.84]],0),-1),-0.8)
profilo_superiore_1 = addZValue([[0.1, 4.29], [0.19, 4.49], [0.34, 4.62], [0.51, 4.68], [1.21, 4.74], [1.05, 4.63], [2.1, 4.66]],0)
ps_curva_1 = bezier(profilo_superiore_1)

profilo_superiore_2 = addZValue([[2.1, 4.66], [2.83, 4.67], [4.12, 4.74], [4.27, 4.68]],0)
ps_curva_2 = bezier(profilo_superiore_2)

profilo_superiore_3 = addZValue([[4.27, 4.68], [4.92, 4.51], [5.01, 4.64], [5.07, 4.09]],0)
ps_curva_3 = bezier(profilo_superiore_3)

profilo_superiore_4 = addZValue([[5.07, 4.09], [5.11, 2.89], [5.16, 2.68], [4.34, 2.62]],0)
ps_curva_4 = bezier(profilo_superiore_4)

profilo_superiore_5 = addZValue([[4.34, 2.62], [3.58, 2.51], [3.62, 2.67], [2.3, 2.63], [1.3, 2.62], [1.25, 2.58], [0.5, 2.58]],0)
ps_curva_5 = bezier(profilo_superiore_5)

profilo_superiore_6 = addZValue([[0.09, 3.09], [0.08, 2.91], [0.19, 2.73], [0.5, 2.58]],0)
ps_curva_6 = bezier(profilo_superiore_6)

profilo_superiore_7 = addZValue([[0.09, 3.09], [-0.04, 3.54], [0, 3.99], [0.1, 4.29]],0)
ps_curva_7 = bezier(profilo_superiore_7)

#Fari
profilo_superiore_9 = addZValue([[0.55, 4.48], [0.34, 4.69], [0.16, 4.33], [0.18, 4.32], [0.28, 4.21], [0.48, 4.24], [0.55, 4.48]],0)
ps_curva_9 = bezier(profilo_superiore_9)

profilo_superiore_10 = addZValue([[0.54, 2.83], [0.52, 2.9], [0.35, 3.15], [0.16, 2.94], [0.3, 2.77], [0.44, 2.66], [0.54, 2.83]],0)
ps_curva_10 = bezier(profilo_superiore_10)

#Cofano
profilo_superiore_11 = addZValue([[1.71, 2.94], [0.19, 3.16], [0.18, 3.02], [0.19, 3.74]],0)
ps_curva_11 = bezier(profilo_superiore_11)

profilo_superiore_12 = addZValue([[1.7, 4.33], [0.59, 4.16], [0.14, 4.29], [0.19, 3.74]],0)
ps_curva_12 = bezier(profilo_superiore_12)

#Parabrezza
profilo_superiore_13 = addZValue([[1.86, 4.49], [1.59, 4.4], [1.46, 3.11], [1.85, 2.78]],0)
ps_curva_13 = bezier(profilo_superiore_13)

profilo_superiore_14 = addZValue([[1.86, 4.49], [2.16, 4.41], [2.4, 4.34], [2.57, 4.27]],0)
ps_curva_14 = bezier(profilo_superiore_14)

profilo_superiore_15 = addZValue([[2.56, 3], [2.48, 3.26], [2.47, 4.02], [2.57, 4.27]],0)
ps_curva_15 = bezier(profilo_superiore_15)

profilo_superiore_16 = addZValue([[2.56, 3], [2.4, 2.98], [2.02, 2.82], [1.85, 2.78]],0)
ps_curva_16 = bezier(profilo_superiore_16)

#Giunture Parabrezza-Lunotto
profilo_superiore_17 = addZValue([[2.56, 3], [2.77, 3.07], [3.31, 3.12], [3.79, 3.06]],0)
ps_curva_17 = bezier(profilo_superiore_17)

profilo_superiore_18 = addZValue([[2.56, 4.25], [3.04, 4.2], [3.21, 4.2], [3.79, 4.21]],0)
ps_curva_18 = bezier(profilo_superiore_18)

#Lunotto
profilo_superiore_19 = addZValue([[4.56, 4.26], [4.27, 4.24], [4.08, 4.23], [3.79, 4.21]],0)
ps_curva_19 = bezier(profilo_superiore_19)

profilo_superiore_20 = addZValue([[4.56, 4.26], [4.62, 4.07], [4.73, 3.59], [4.56, 3.01]],0)
ps_curva_20 = bezier(profilo_superiore_20)

profilo_superiore_21 = addZValue([[3.8, 3.07], [3.97, 3.05], [4.36, 3.03], [4.56, 3.01]],0)
ps_curva_21 = bezier(profilo_superiore_21)

profilo_superiore_22 = addZValue([[3.8, 3.07], [3.79, 3.38], [3.81, 3.82], [3.8, 4.2]],0)
ps_curva_22 = bezier(profilo_superiore_22)

#Finestrini
profilo_superiore_23 = addZValue([[3.94, 4.38], [3.46, 4.29], [3.1, 4.31], [2.83, 4.29]],0)
ps_curva_23 = bezier(profilo_superiore_23)

profilo_superiore_24 = addZValue([[2.83, 4.29], [2.73, 4.33], [2.51, 4.39], [2.24, 4.49]],0)
ps_curva_24 = bezier(profilo_superiore_24)

profilo_superiore_25 = addZValue([[2.24, 4.49], [2.79, 4.54], [3.79, 4.5], [3.94, 4.37]],0)
ps_curva_25 = bezier(profilo_superiore_25)

profilo_superiore_26 = addZValue([[2.17, 2.77], [2.82, 3.03], [2.92, 3], [3.96, 2.92]],0)
ps_curva_26 = bezier(profilo_superiore_26)

profilo_superiore_27 = addZValue([[2.17, 2.77], [2.81, 2.77], [3.52, 2.72], [3.96, 2.92]],0)
ps_curva_27 = bezier(profilo_superiore_27)

profilo_superiore_28 = addZValue([[4.26, 2.94], [4.16, 2.97], [4.11, 2.87], [4.29, 2.87], [4.32, 2.88], [4.38, 2.95], [4.26, 2.94]],0)
ps_curva_28 = bezier(profilo_superiore_28)

#Altri dettagli
profilo_superiore_29 = addZValue([[4.57, 3.03], [4.8, 3.03], [4.94, 3.06], [5.08, 3.09]],0)
ps_curva_29 = bezier(profilo_superiore_29)

profilo_superiore_30 = addZValue([[4.6, 4.24], [4.78, 4.26], [4.97, 4.23], [5.09, 4.19]],0)
ps_curva_30 = bezier(profilo_superiore_30)

profilo_superiore_31 = addZValue([[5, 4.2], [5.03, 3.98], [5.02, 3.7], [5, 3.08]],0)
ps_curva_31 = bezier(profilo_superiore_31)


profilo_superiore = STRUCT([bezMap(ps_curva_1, dominio_linea),bezMap(ps_curva_2, dominio_linea),bezMap(ps_curva_3, dominio_linea),\
	bezMap(ps_curva_4, dominio_linea),bezMap(ps_curva_5, dominio_linea),bezMap(ps_curva_6, dominio_linea),bezMap(ps_curva_7, dominio_linea),\
	bezMap(ps_curva_9, dominio_linea),bezMap(ps_curva_10, dominio_linea),bezMap(ps_curva_11, dominio_linea)\
	,bezMap(ps_curva_12, dominio_linea),bezMap(ps_curva_13, dominio_linea),bezMap(ps_curva_14, dominio_linea),bezMap(ps_curva_15, dominio_linea)\
	,bezMap(ps_curva_16, dominio_linea),bezMap(ps_curva_17, dominio_linea),bezMap(ps_curva_18, dominio_linea),bezMap(ps_curva_19, dominio_linea)\
	,bezMap(ps_curva_20, dominio_linea),bezMap(ps_curva_21, dominio_linea),bezMap(ps_curva_22, dominio_linea),bezMap(ps_curva_23, dominio_linea)\
	,bezMap(ps_curva_24, dominio_linea),bezMap(ps_curva_25, dominio_linea),bezMap(ps_curva_26, dominio_linea),bezMap(ps_curva_27, dominio_linea)\
	,bezMap(ps_curva_28, dominio_linea),bezMap(ps_curva_29, dominio_linea),bezMap(ps_curva_30, dominio_linea),bezMap(ps_curva_31, dominio_linea) ])

profilo_superiore = T([1,2])([0.5,-3])(S([1,2,3])([1.6,1.5,1.5])(profilo_superiore))




profili1 = STRUCT([profilo_laterale,profilo_frontale,profilo_superiore])

#VIEW(grill3DLight(profili1,10))

#profili2 = STRUCT([T([1,3])([-5.5,-0.5])(profilo_laterale),T([2,3])([-2.5,-0.5])(profilo_frontale),T([1,2])([-5.5,-2.5])(profilo_superiore)])

#profili3 = T([1,2])([-5.5,-2.5])(profili1)

#VIEW(grill3DLight(profili3,10))
