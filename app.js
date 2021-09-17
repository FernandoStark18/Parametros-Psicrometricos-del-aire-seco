document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var btn = document.getElementById('boton');
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
    var Pvs = 0;
    var Ws = 0;
    var altura;
    var Ra = 287.055;

    const Select1 = elems[0];
    const Select2 = elems[1];

    btn.onclick = function () {
        altura = (Math.pow((third_value.value / 101.325), (1 / 5.2559)) - 1) / -2.25577e-5;
        if (Select1.value == Select2.value) {
            window.alert("¡Los parámetros seleccionados no deben conicidir! Seleccione parámetros diferentes.");
        } else if (first_value.value == "" || second_value.value == "" || third_value.value == "") {
            window.alert("¡Verificar que se hayan ingresado los valores!")
        }

        // Presión de vapor y razón de humedad
        else if (Select1.value == 1 && Select2.value == 2) {
            presion_vapor.value = first_value.value;
            razon_humedad.value = second_value.value;
            temp_b_s.value = 15.00 - 0.0065 * altura;
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / (Pvs)).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Presión de vapor y humedad relativa
        else if (Select1.value == 1 && Select2.value == 3) {
            presion_vapor.value = first_value.value;
            humedad_relativa.value = second_value.value;
            calcular_W();
            Pvs = presion_vapor.value / humedad_relativa.value;
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            temp_b_s.value = 15.00 - 0.0065 * altura;
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Presión de vapor y grado de saturación
        else if (Select1.value == 1 && Select2.value == 4) {
            presion_vapor.value = first_value.value;
            grado_saturacion.value = second_value.value;
            calcular_W();
            temp_b_s.value = 15.00 - 0.0065 * altura;
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Presión de vapor y Tbs
        else if (Select1.value == 1 && Select2.value == 5) {
            presion_vapor.value = first_value.value;
            temp_b_s.value = second_value.value;
            calcular_W();
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Presión de valor y Tbh
        else if (Select1.value == 1 && Select2.value == 6) {
            temp_b_s.value = 15.00 - 0.0065 * altura;
            presion_vapor.value = first_value.value;
            temp_b_h.value = second_value.value;
            calcular_W();
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Presión de vapor y Tpr
        else if (Select1.value == 1 && Select2.value == 7) {
            temp_b_s.value = 15.00 - 0.0065 * altura;
            presion_vapor.value = first_value.value;
            temp_p_r.value = second_value.value;
            calcular_W();
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }
        // Pv y Veh
        else if (Select1.value == 1 && Select2.value == 8) {
            temp_b_s.value = 15.00 - 0.0065 * altura;
            presion_vapor.value = first_value.value;
            vol_esp.value = second_value.value;
            calcular_W();
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_entalpia();
        }
        // Pv y h
        else if (Select1.value == 1 && Select2.value == 8) {
            temp_b_s.value = 15.00 - 0.0065 * altura;
            presion_vapor.value = first_value.value;
            entalpia.value = second_value.value;
            calcular_W();
            calcular_Pvs();
            humedad_relativa.value = (presion_vapor.value / Pvs).toFixed(5);
            Ws = 0.622 * (Pvs / (third_value.value - Pvs));
            grado_saturacion.value = (razon_humedad.value / Ws).toFixed(3);
            calcular_Tpr();
            calcular_Veh();
            calcular_entalpia();
        }

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
            vol_esp.value = (((Ra * (TK)) / (third_value.value * 1000)) * ((1 + 1.6079 * (razon_humedad.value)) / (1 + razon_humedad.value))).toFixed(4);

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
    };
});