var first_value = document.getElementById('first_value');
var second_value = document.getElementById('second_value');
var third_value = document.getElementById('third_value');
var presion_vapor = document.getElementById('Presion_vapor');
var razon_humedad = document.getElementById('Razon_humedad');
var humedad_relativa = document.getElementById('Humedad_relativa');
var grado_saturacion = document.getElementById('Grado_saturacion');
var temp_b_s = document.getElementById('Temp_b_s');
var temp_b_h = document.getElementById('Temp_b_h');
var temp_p_r = document.getElementById('Temp_p_r');
var vol_esp = document.getElementById('Vol_esp');
var entalpia = document.getElementById('Entalpia');
var TempTitle = document.getElementById('temp');
var HRTitle = document.getElementById('HR');
var R1C1 = document.getElementById('R1C1');
var R1C2 = document.getElementById('R1C2');
var R2C1 = document.getElementById('R2C1');
var R2C2 = document.getElementById('R2C2');
var R3C1 = document.getElementById('R3C1');
var R3C2 = document.getElementById('R3C2');
var R4C1 = document.getElementById('R4C1');
var R4C2 = document.getElementById('R4C2');
var R5C1 = document.getElementById('R5C1');
var R5C2 = document.getElementById('R5C2');
var Pvs = 0;
var Ws = 0;
var altura;
var Ra = 287.055;
var Tbs_data = [];
var HR_data = [];
var W_data = [];

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var btn = document.getElementById('boton');


    const Select1 = elems[0];
    const Select2 = elems[1];

    btn.onclick = function () {
        myChart.update();
        altura = (Math.pow((third_value.value / 101.325), (1 / 5.2559)) - 1) / -2.25577e-5;
        temp_b_s.value = first_value.value;
        humedad_relativa.value = second_value.value / 100;
        calcular_Pvs();
        presion_vapor.value = (humedad_relativa.value * Pvs).toFixed(3);
        calcular_W();
        Ws = 0.622 * (Pvs / (third_value.value - Pvs));
        grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
        calcular_Tpr();
        calcular_Veh();
        calcular_entalpia();
        let T = parseFloat(temp_b_s.value);
        let HR = parseFloat(humedad_relativa.value * 100);
        let constante = Math.round(altura / 1000);
        temp_b_h.value = ((T * Math.atan(0.151977 * Math.pow(HR + 8.313659, 0.5)) + Math.atan(T + HR) - Math.atan(HR - 1.676331) + 0.00391838 * Math.pow(HR, 1.5) * Math.atan(0.023101 * HR) - 4.686035).toFixed(2) - 0.3 * constante).toFixed(2);
        // FUNCIONES
        function calcular_Pvs() {
            var TK = parseFloat(temp_b_s.value) + 273.15;
            if (parseFloat(temp_b_s.value) > -100 && parseFloat(temp_b_s.value) < 0) {
                var A1 = -5.6745359e3;
                var A2 = 6.3925247;
                var A3 = -9.677843e-3;
                var A4 = 0.6221570e-6;
                var A5 = 2.0747825e-9;
                var A6 = -0.94844024e-12;
                var A7 = 4.1635019;
            } else if (parseFloat(temp_b_s.value) > 0 && parseFloat(temp_b_s.value) < 200) {
                A1 = -5.8002206e3;
                A2 = 1.3914993;
                A3 = -48.640239e-3;
                A4 = 41.764768e-6;
                A5 = -14.452093e-9;
                A6 = 0;
                A7 = 6.5459673;
            }
            Pvs = (Math.exp(A1 / TK + A2 + A3 * TK + A4 * Math.pow(TK, 2) + A5 * Math.pow(TK, 3) + A6 * Math.pow(TK, 4) + A7 * Math.log(TK))) / 1000;

            return Pvs;
        }

        function calcular_Tpr() {
            if (temp_b_s.value > 60 && temp_b_s.value < 0) {
                temp_p_r.value = -60.450 + 7.0322 * Math.log(presion_vapor.value) + 0.3700 * (Math.pow(Math.log(presion_vapor.value * 1000)), 2);
            } else if (temp_b_s.value > 0 && temp_b_s.value < 70) {
                temp_p_r.value = (-35.957 - 1.8726 * Math.log(presion_vapor.value * 1000) + 1.1689 * Math.pow((Math.log(presion_vapor.value * 1000)), 2)).toFixed(3);
            }
            return temp_p_r.value;
        }

        function calcular_Veh() {
            var TK = parseFloat(temp_b_s.value) + 273.15;
            vol_esp.value = ((((Ra * (TK)) / (third_value.value * 1000)) * ((1 + 1.6079 * (razon_humedad.value)) / (1 + razon_humedad.value))) * 10).toFixed(4);

            return vol_esp.value;
        }

        function calcular_entalpia() {
            entalpia.value = (1.006 * (temp_b_s.value) + razon_humedad.value * (2501 + 1.805 * (temp_b_s.value))).toFixed(3);

            return entalpia.value;
        }

        function calcular_W() {
            razon_humedad.value = (0.622 * ((presion_vapor.value) / (third_value.value - presion_vapor.value))).toFixed(5);
            return razon_humedad.value;
        }
        altura = Math.round((Math.pow((third_value.value / 101.325), (1 / 5.2559)) - 1) / -2.25577e-5);
        addData();

        for (let i = 0; i < Tbs_data.length; i++) {
            Tbs_data[i] = null;
            W_data[i] = null;
        }

    };
});

var Tbs = [];
var Pv = [];
var HR_100 = [];
var HR_90 = [];
var HR_80 = [];
var HR_70 = [];
var HR_60 = [];
var HR_50 = [];
var HR_40 = [];
var HR_30 = [];
var HR_20 = [];
var HR_10 = [];
var W_100 = [];
var W_90 = [];
var W_80 = [];
var W_70 = [];
var W_60 = [];
var W_50 = [];
var W_40 = [];
var W_30 = [];
var W_20 = [];
var W_10 = [];
var calor_latente = [];
var TG = [];
var h_100 = [];
var h_90 = [];
var h_80 = [];
var h_70 = [];
var h_60 = [];
var h_50 = [];
var h_40 = [];
var h_30 = [];
var h_20 = [];
var h_10 = [];
var veh_y = [];

for (let i = 0; i <= 50; i++) {
    Tbs[i] = i;
}
for (let i = 0; i <= 50; i++) {
    Pv[i] = (0.0000046 * Math.pow(Tbs[i], 4) + 0.0000891 * Math.pow(Tbs[i], 3) + 0.01217959 * Math.pow(Tbs[i], 2) + 0.3183402 * Tbs[i] + 4.606634) / 7.501;
}
var j = 0;
for (let i = 597.729; i >= 569; i -= 0.566) {
    calor_latente[j] = i;
    j++;
}

for (let i = 0; i <= 50; i++) {
    HR_100[i] = 1 * Pv[i];
    HR_90[i] = 0.9 * Pv[i];
    HR_80[i] = 0.8 * Pv[i];
    HR_70[i] = 0.7 * Pv[i];
    HR_60[i] = 0.6 * Pv[i];
    HR_50[i] = 0.5 * Pv[i];
    HR_40[i] = 0.4 * Pv[i];
    HR_30[i] = 0.3 * Pv[i];
    HR_20[i] = 0.2 * Pv[i];
    HR_10[i] = 0.1 * Pv[i];
}

update_W();

function update_W() {
    for (let i = 0; i <= 50; i++) {
        W_100[i] = (HR_100[i] * 0.622) / (third_value.value - HR_100[i]);
        W_90[i] = (HR_90[i] * 0.622) / (third_value.value - HR_90[i]);
        W_80[i] = (HR_80[i] * 0.622) / (third_value.value - HR_80[i]);
        W_70[i] = (HR_70[i] * 0.622) / (third_value.value - HR_70[i]);
        W_60[i] = (HR_60[i] * 0.622) / (third_value.value - HR_60[i]);
        W_50[i] = (HR_50[i] * 0.622) / (third_value.value - HR_50[i]);
        W_40[i] = (HR_40[i] * 0.622) / (third_value.value - HR_40[i]);
        W_30[i] = (HR_30[i] * 0.622) / (third_value.value - HR_30[i]);
        W_20[i] = (HR_20[i] * 0.622) / (third_value.value - HR_20[i]);
        W_10[i] = (HR_10[i] * 0.622) / (third_value.value - HR_10[i]);
    }
}

update_W();
update_TG();

function update_TG() {
    for (let i = 0; i <= 50; i++) {
        TG[i] = W_100[i] * calor_latente[i] / 0.277 + Tbs[i];
    }
}
update_h();

function update_h() {
    for (let i = 0; i <= 50; i++) {
        h_100[i] = (100 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_90[i] = (90 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_80[i] = (80 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_70[i] = (70 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_60[i] = (60 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_50[i] = (50 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_40[i] = (40 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_30[i] = (30 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_20[i] = (20 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
        h_10[i] = (10 - 1.006 * (Tbs[i])) / (2501 + 1.805 * Tbs[i]);
    }
}

var T_x = 0;
var W_y = 0;
var HR_y = [];
var W_y_graph = [];
var Tpr_x = 0;
var Tbh_x = 0;
var Tbh_y = 0;
var Ws_y = 0;
var h_y = 0;

function update_parameters() {
    T_x = parseFloat(temp_b_s.value);
    W_y = parseFloat(razon_humedad.value);
    for (let i = 0; i <= 50; i++) {
        HR_y[i] = parseFloat(humedad_relativa.value) * Pv[i];
    }
    for (let i = 0; i <= 50; i++) {
        W_y_graph[i] = (HR_y[i] * 0.622) / (third_value.value - HR_y[i]);
    }
    Tpr_x = parseFloat(temp_p_r.value);
    Tbh_x = parseFloat(temp_b_h.value);
    let Pvs = (0.0000046 * Math.pow(Tbh_x, 4) + 0.0000891 * Math.pow(Tbh_x, 3) + 0.01217959 * Math.pow(Tbh_x, 2) + 0.3183402 * Tbh_x + 4.606634) / 7.501;
    Ws_y = (Pvs * 0.622) / (third_value.value - Pvs);
    h_y = (parseFloat(entalpia.value) - 1.006 * (0)) / (2501 + 1.805 * 0);
}

var labels = Tbs;
var data = {
    labels: labels,
    datasets: [{
            showLine: true,
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_100,
            label: "HR 100%",
            yAxisID: 'y1',
            borderWidth: 2
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_90,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_80,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_70,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_60,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_50,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_40,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_30,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_20,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            showLine: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: W_10,
            yAxisID: 'y1',
            borderWidth: 1,
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[0],
                    y: W_100[0]
                },
                {
                    x: TG[0],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[1],
                    y: W_100[1]
                },
                {
                    x: TG[1],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[2],
                    y: W_100[2]
                },
                {
                    x: TG[2],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[3],
                    y: W_100[3]
                },
                {
                    x: TG[3],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[4],
                    y: W_100[4]
                },
                {
                    x: TG[4],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[5],
                    y: W_100[5]
                },
                {
                    x: TG[5],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[6],
                    y: W_100[6]
                },
                {
                    x: TG[6],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[7],
                    y: W_100[7]
                },
                {
                    x: TG[7],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[8],
                    y: W_100[8]
                },
                {
                    x: TG[8],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[9],
                    y: W_100[9]
                },
                {
                    x: TG[9],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[10],
                    y: W_100[10]
                },
                {
                    x: TG[10],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[11],
                    y: W_100[11]
                },
                {
                    x: TG[11],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[12],
                    y: W_100[12]
                },
                {
                    x: TG[12],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[13],
                    y: W_100[13]
                },
                {
                    x: TG[13],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[14],
                    y: W_100[14]
                },
                {
                    x: TG[14],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[15],
                    y: W_100[15]
                },
                {
                    x: TG[15],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[16],
                    y: W_100[16]
                },
                {
                    x: TG[16],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[17],
                    y: W_100[17]
                },
                {
                    x: TG[17],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[18],
                    y: W_100[18]
                },
                {
                    x: TG[18],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[19],
                    y: W_100[19]
                },
                {
                    x: TG[19],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[20],
                    y: W_100[20]
                },
                {
                    x: TG[20],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[21],
                    y: W_100[21]
                },
                {
                    x: TG[21],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[22],
                    y: W_100[22]
                },
                {
                    x: TG[22],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[23],
                    y: W_100[23]
                },
                {
                    x: TG[23],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[24],
                    y: W_100[24]
                },
                {
                    x: TG[24],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[25],
                    y: W_100[25]
                },
                {
                    x: TG[25],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[26],
                    y: W_100[26]
                },
                {
                    x: TG[26],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[27],
                    y: W_100[27]
                },
                {
                    x: TG[27],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[28],
                    y: W_100[28]
                },
                {
                    x: TG[28],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[29],
                    y: W_100[29]
                },
                {
                    x: TG[29],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[30],
                    y: W_100[30]
                },
                {
                    x: TG[30],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[31],
                    y: W_100[31]
                },
                {
                    x: TG[31],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[32],
                    y: W_100[32]
                },
                {
                    x: TG[32],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[33],
                    y: W_100[33]
                },
                {
                    x: TG[33],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[34],
                    y: W_100[34]
                },
                {
                    x: TG[34],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 128,128)',
            data: [{
                    x: Tbs[35],
                    y: W_100[35]
                },
                {
                    x: TG[35],
                    y: 0
                }
            ],
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_100,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_90,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_80,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_70,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_70,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_60,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_50,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_40,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_30,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_20,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            borderColor: 'rgb(128, 0,128)',
            data: h_10,
            borderWidth: 1,
            yAxisID: 'y1'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255, 0, 0',
            borderColor: 'rgb(255, 0, 0)',
            data: [{
                    x: T_x,
                    y: W_y
                },
                {
                    x: T_x,
                    y: 0
                }
            ],
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)',
            borderWidth: 3,
            yAxisID: 'y2'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255, 165, 0',
            borderColor: 'rgb(255, 165, 0)',
            data: W_y_graph,
            borderWidth: 3,
            yAxisID: 'y2'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255, 165, 0',
            borderColor: 'rgb(255, 165, 0)',
            data: [{
                    x: T_x,
                    y: 0
                },
                {
                    x: T_x,
                    y: W_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(0, 255, 0',
            borderColor: 'rgb(0, 255, 0)',
            data: [{
                    x: Tpr_x,
                    y: 0
                },
                {
                    x: Tpr_x,
                    y: W_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(0, 255, 0',
            borderColor: 'rgb(0, 255, 0)',
            data: [{
                    x: Tpr_x,
                    y: W_y
                },
                {
                    x: T_x,
                    y: W_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(0, 0, 255',
            borderColor: 'rgb(0, 0, 255)',
            data: [{
                    x: Tbh_x,
                    y: 0
                },
                {
                    x: Tbh_x,
                    y: Ws_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(0, 0, 255',
            borderColor: 'rgb(0, 0, 255)',
            data: [{
                    x: Tbh_x,
                    y: Ws_y
                },
                {
                    x: T_x,
                    y: W_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(128, 0, 128',
            borderColor: 'rgb(128, 0, 128)',
            data: [{
                    x: 0,
                    y: h_y
                },
                {
                    x: T_x,
                    y: W_y
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255,119,255)',
            borderColor: 'rgb(255,119,255)',
            data: [{
                    x: Tbs_data[0],
                    y: W_data[0]
                },
                {
                    x: Tbs_data[1],
                    y: W_data[1]
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255,119,255)',
            borderColor: 'rgb(255,119,255)',
            data: [{
                    x: Tbs_data[1],
                    y: W_data[1]
                },
                {
                    x: Tbs_data[2],
                    y: W_data[2]
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255,119,255)',
            borderColor: 'rgb(255,119,255)',
            data: [{
                    x: Tbs_data[2],
                    y: W_data[2]
                },
                {
                    x: Tbs_data[3],
                    y: W_data[3]
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        },
        {
            label: false,
            showLine: true,
            backgroundColor: 'rgb(255,119,255)',
            borderColor: 'rgb(255,119,255)',
            data: [{
                    x: Tbs_data[3],
                    y: W_data[3]
                },
                {
                    x: Tbs_data[4],
                    y: W_data[4]
                }
            ],
            borderWidth: 3,
            yAxisID: 'y2',
            pointRadius: 2,
            pointBackgroundColor: 'rgb(0,0,0)',
            pointBorderColor: 'rgb(0,0,0)'
        }
    ]
};

const config = {
    type: 'scatter',
    data: data,
    options: {
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: altura
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Temperatura de bulbo seco (°C)'
                },
                ticks: {
                    stepSize: 1
                },
                min: 0,
                max: 50
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Entalpía (kJ/kg)'
                },
                min: 0,
                max: 100
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Razón de humedad (Kg/Kg)'
                },
                min: 0,
                max: 0.04
            },
            y2: {
                display: false,
                beginAtZero: true,
                position: 'right',
                min: 0,
                max: 0.04,
            },
        }
    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function addData() {
    update_W();
    update_TG();
    update_h();
    update_parameters();
    myChart.data.datasets[0].data = W_100;
    myChart.data.datasets[1].data = W_90;
    myChart.data.datasets[2].data = W_80;
    myChart.data.datasets[3].data = W_70;
    myChart.data.datasets[4].data = W_60;
    myChart.data.datasets[5].data = W_50;
    myChart.data.datasets[6].data = W_40;
    myChart.data.datasets[7].data = W_30;
    myChart.data.datasets[8].data = W_20;
    myChart.data.datasets[9].data = W_10;
    myChart.data.datasets[10].data[0] = [Tbs[0], W_100[0]];
    myChart.data.datasets[10].data[1] = [TG[0], 0];
    myChart.data.datasets[11].data[0] = [Tbs[1], W_100[1]];
    myChart.data.datasets[11].data[1] = [TG[1], 0];
    myChart.data.datasets[12].data[0] = [
        [Tbs[2]], W_100[2]
    ];
    myChart.data.datasets[12].data[1] = [TG[2], 0];
    myChart.data.datasets[13].data[0] = [
        [Tbs[3]], W_100[3]
    ];
    myChart.data.datasets[13].data[1] = [TG[3], 0];
    myChart.data.datasets[14].data[0] = [
        [Tbs[4]], W_100[4]
    ];
    myChart.data.datasets[14].data[1] = [TG[4], 0];
    myChart.data.datasets[15].data[0] = [
        [Tbs[5]], W_100[5]
    ];
    myChart.data.datasets[15].data[1] = [TG[5], 0];
    myChart.data.datasets[16].data[0] = [
        [Tbs[6]], W_100[6]
    ];
    myChart.data.datasets[16].data[1] = [TG[6], 0];
    myChart.data.datasets[17].data[0] = [
        [Tbs[7]], W_100[7]
    ];
    myChart.data.datasets[17].data[1] = [TG[7], 0];
    myChart.data.datasets[18].data[0] = [
        [Tbs[8]], W_100[8]
    ];
    myChart.data.datasets[18].data[1] = [TG[8], 0];
    myChart.data.datasets[19].data[0] = [
        [Tbs[9]], W_100[9]
    ];
    myChart.data.datasets[19].data[1] = [TG[9], 0];
    myChart.data.datasets[20].data[0] = [
        [Tbs[10]], W_100[10]
    ];
    myChart.data.datasets[20].data[1] = [TG[10], 0];
    myChart.data.datasets[21].data[0] = [
        [Tbs[11]], W_100[11]
    ];
    myChart.data.datasets[21].data[1] = [TG[11], 0];
    myChart.data.datasets[22].data[0] = [
        [Tbs[12]], W_100[12]
    ];
    myChart.data.datasets[22].data[1] = [TG[12], 0];
    myChart.data.datasets[23].data[0] = [
        [Tbs[13]], W_100[13]
    ];
    myChart.data.datasets[23].data[1] = [TG[13], 0];
    myChart.data.datasets[24].data[0] = [
        [Tbs[14]], W_100[14]
    ];
    myChart.data.datasets[24].data[1] = [TG[14], 0];
    myChart.data.datasets[25].data[0] = [
        [Tbs[15]], W_100[15]
    ];
    myChart.data.datasets[25].data[1] = [TG[15], 0];
    myChart.data.datasets[26].data[0] = [
        [Tbs[16]], W_100[16]
    ];
    myChart.data.datasets[26].data[1] = [TG[16], 0];
    myChart.data.datasets[27].data[0] = [
        [Tbs[17]], W_100[17]
    ];
    myChart.data.datasets[27].data[1] = [TG[17], 0];
    myChart.data.datasets[28].data[0] = [
        [Tbs[18]], W_100[18]
    ];
    myChart.data.datasets[28].data[1] = [TG[18], 0];
    myChart.data.datasets[29].data[0] = [
        [Tbs[19]], W_100[19]
    ];
    myChart.data.datasets[29].data[1] = [TG[19], 0];
    myChart.data.datasets[30].data[0] = [
        [Tbs[20]], W_100[20]
    ];
    myChart.data.datasets[30].data[1] = [TG[20], 0];
    myChart.data.datasets[31].data[0] = [
        [Tbs[21]], W_100[21]
    ];
    myChart.data.datasets[31].data[1] = [TG[21], 0];
    myChart.data.datasets[32].data[0] = [
        [Tbs[22]], W_100[22]
    ];
    myChart.data.datasets[32].data[1] = [TG[22], 0];
    myChart.data.datasets[33].data[0] = [
        [Tbs[23]], W_100[23]
    ];
    myChart.data.datasets[33].data[1] = [TG[23], 0];
    myChart.data.datasets[34].data[0] = [
        [Tbs[24]], W_100[24]
    ];
    myChart.data.datasets[34].data[1] = [TG[24], 0];
    myChart.data.datasets[35].data[0] = [
        [Tbs[25]], W_100[25]
    ];
    myChart.data.datasets[35].data[1] = [TG[25], 0];
    myChart.data.datasets[36].data[0] = [
        [Tbs[26]], W_100[26]
    ];
    myChart.data.datasets[36].data[1] = [TG[26], 0];
    myChart.data.datasets[37].data[0] = [
        [Tbs[27]], W_100[27]
    ];
    myChart.data.datasets[37].data[1] = [TG[27], 0];
    myChart.data.datasets[38].data[0] = [
        [Tbs[28]], W_100[28]
    ];
    myChart.data.datasets[38].data[1] = [TG[28], 0];
    myChart.data.datasets[39].data[0] = [
        [Tbs[29]], W_100[29]
    ];
    myChart.data.datasets[39].data[1] = [TG[29], 0];
    myChart.data.datasets[40].data[0] = [
        [Tbs[30]], W_100[30]
    ];
    myChart.data.datasets[40].data[1] = [TG[30], 0];
    myChart.data.datasets[41].data[0] = [
        [Tbs[31]], W_100[31]
    ];
    myChart.data.datasets[41].data[1] = [TG[31], 0];
    myChart.data.datasets[42].data[0] = [
        [Tbs[32]], W_100[32]
    ];
    myChart.data.datasets[42].data[1] = [TG[32], 0];
    myChart.data.datasets[43].data[0] = [
        [Tbs[33]], W_100[33]
    ];
    myChart.data.datasets[43].data[1] = [TG[33], 0];
    myChart.data.datasets[44].data[0] = [
        [Tbs[34]], W_100[34]
    ];
    myChart.data.datasets[44].data[1] = [TG[34], 0];
    myChart.data.datasets[45].data[0] = [
        [Tbs[35]], W_100[35]
    ];
    myChart.data.datasets[45].data[1] = [TG[35], 0];
    myChart.data.datasets[47].data = h_100;
    myChart.data.datasets[48].data = h_90;
    myChart.data.datasets[49].data = h_80;
    myChart.data.datasets[50].data = h_70;
    myChart.data.datasets[51].data = h_60;
    myChart.data.datasets[52].data = h_50;
    myChart.data.datasets[53].data = h_40;
    myChart.data.datasets[54].data = h_30;
    myChart.data.datasets[55].data = h_20;
    myChart.data.datasets[56].data = h_10;
    myChart.data.datasets[57].data[0] = [T_x, W_y];
    myChart.data.datasets[57].data[1] = [T_x, 0];
    myChart.data.datasets[58].data = W_y_graph;
    myChart.data.datasets[59].data[0] = [T_x, W_y];
    myChart.data.datasets[59].data[1] = [50, W_y];
    myChart.data.datasets[60].data[0] = [Tpr_x, 0];
    myChart.data.datasets[60].data[1] = [Tpr_x, W_y];
    myChart.data.datasets[61].data[0] = [Tpr_x, W_y];
    myChart.data.datasets[61].data[1] = [T_x, W_y];
    myChart.data.datasets[62].data[0] = [Tbh_x, 0];
    myChart.data.datasets[62].data[1] = [Tbh_x, Ws_y];
    myChart.data.datasets[63].data[0] = [Tbh_x, Ws_y];
    myChart.data.datasets[63].data[1] = [T_x, W_y];
    myChart.data.datasets[64].data[0] = [T_x, W_y];
    myChart.data.datasets[64].data[1] = [0, h_y];
    myChart.data.datasets[65].data[0] = [Tbs_data[0], W_data[0]];
    myChart.data.datasets[65].data[1] = [Tbs_data[1], W_data[1]];
    myChart.data.datasets[66].data[0] = [Tbs_data[1], W_data[1]];
    myChart.data.datasets[66].data[1] = [Tbs_data[2], W_data[2]];
    myChart.data.datasets[67].data[0] = [Tbs_data[2], W_data[2]];
    myChart.data.datasets[67].data[1] = [Tbs_data[3], W_data[3]];
    myChart.data.datasets[68].data[0] = [Tbs_data[3], W_data[3]];
    myChart.data.datasets[68].data[1] = [Tbs_data[4], W_data[4]];
    myChart.config.options.plugins.title.text = altura + " msnm";
    myChart.update();
}
var contenido = "";

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        contenido = e.target.result;
        console.log(contenido);
        let Tbs_Hr_array = contenido.split(",")
        Tbs_data = Tbs_Hr_array[0].split(" ");
        HR_data = Tbs_Hr_array[1].split(" ");
        var tbs_sum = 0
        var Hr_sum = 0
        let Pv = [];
        let HR_X = [];
        Tbs_data = Tbs_data.slice(1);
        HR_data = HR_data.slice(1)
        for (let i = 0; i <= Tbs_data.length - 1; i++) {
            Tbs_data[i] = parseInt(Tbs_data[i]);
            HR_data[i] = parseInt(HR_data[i]);
            tbs_sum += Tbs_data[i];
            Hr_sum += HR_data[i];
            Pv[i] = (0.0000046 * Math.pow(Tbs_data[i], 4) + 0.0000891 * Math.pow(Tbs_data[i], 3) + 0.01217959 * Math.pow(Tbs_data[i], 2) + 0.3183402 * Tbs_data[i] + 4.606634) / 7.501;
            HR_X[i] = (HR_data[i] / 100) * Pv[i];
            W_data[i] = (HR_X[i] * 0.622) / (third_value.value - HR_X[i]);
            console.log(Pv);
            console.log(HR_data);
            console.log(W_data);
            console.log(Tbs_data);
        }
        let tbs_prom = tbs_sum / (Tbs_data.length);
        let HR_prom = Hr_sum / (HR_data.length);
        first_value.value = tbs_prom;
        second_value.value = HR_prom;
        TempTitle.textContent = "Temperatura (°C)";
        HRTitle.textContent = "HR (%)";
        R1C1.textContent = Tbs_data[0];
        R2C1.textContent = Tbs_data[1];
        R3C1.textContent = Tbs_data[2];
        R4C1.textContent = Tbs_data[3];
        R5C1.textContent = Tbs_data[4];
        R1C2.textContent = HR_data[0];
        R2C2.textContent = HR_data[1];
        R3C2.textContent = HR_data[2];
        R4C2.textContent = HR_data[3];
        R5C2.textContent = HR_data[4];
    };
    lector.readAsText(archivo);
}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);