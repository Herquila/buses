// Inicioooo de las apps de rutas

// // Main Vue app
const ruta_app = Vue.createApp({
    data () {
        return {
            hello: "world",
            hora: "--:-- --",
            tiempo_en_minutos: 0, // Con este elemento se recorren los arreglos de horarios

            desde_sanjose: ['-','-','-'], // Horas
            hacia_sanjose: ['-','-','-'],

            desde_sanjose_ramal: [], // Ramales
            hacia_sanjose_ramal: [],

            // Download tables as images:
            table_on_select: 'entresemana_table' // TODO get initial state from document
        };
    },
    methods: {
        downloadTableAsImage() {
            var my_table_id = this.table_on_select; // FIXME

            html2canvas(document.getElementById(my_table_id)).then(
                canvas => {

                    var a = document.createElement("a");
                    a.download = 'horario_'+this.table_on_select+'.jpeg';
                    a.href = canvas.toDataURL("image/jpeg");
                    a.dataset.downloadurl = ["image/jpeg", a.download, a.href].join(":");
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(function () {
                        URL.revokeObjectURL(a.href);
                    }, 1500);
                });
        },
        updateProximoBus: function(){
            // Lógica de proximobus
            this.desde_sanjose = [];
            var time = new Date();
            horario_desde_sanjose.filter(
                value => value[0] > this.tiempo_en_minutos ) // Mayores a la hora
                .slice(0,3) // Los siguientes 3
                .forEach((element, index) => {
                    time.setHours(element[1]);
                    time.setMinutes(element[2]);
                    this.desde_sanjose[index] = time.toLocaleString(
                        'en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    this.desde_sanjose_ramal[index] = element[3]; // Ramal
                });

            this.hacia_sanjose = [];
            horario_hacia_sanjose.filter(
                value => value[0] > this.tiempo_en_minutos ) // Mayores a la hora
                .slice(0,3) // Los siguientes 3
                .forEach((element, index) => {
                    time.setHours(element[1]);
                    time.setMinutes(element[2]);
                    this.hacia_sanjose[index] = time.toLocaleString(
                        'en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    this.hacia_sanjose_ramal[index] = element[3]; // Ramal
                });
        }
    },
    mounted () { // Estos metodos ejecutan en todo momento
        setInterval(() => { // Lógica de la aplicación HORADIGITAL
            var time = new Date();
            this.tiempo_en_minutos = time.getMinutes() + time.getHours()*60;
            this.hora = time.toLocaleString(
                'en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            this.updateProximoBus();
        }, 1000); // Cada segundo refresca
    },
    created(){
        this.updateProximoBus();
    }
});
