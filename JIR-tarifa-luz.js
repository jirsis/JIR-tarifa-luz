Module.register('JIR-tarifa-luz', {
    defaults: {

        tramos: [
            {
                start: '00:00',
                end: '08:00',
                tarifa: 'valle'

            },
            {
                start: '08:00',
                end: '10:00',
                tarifa: 'llano'
            },
            {
                start: '10:00',
                end: '14:00',
                tarifa: 'punta'
            },
            {
                start: '14:00',
                end: '18:00',
                tarifa: 'llano'
            },
            {
                start: '18:00',
                end: '22:00',
                tarifa: 'punta'
            },
            {
                start: '22:00',
                end: '00:00',
                tarifa: 'valle'
            },
            
        ],

        initialLoadDelay: 1000,
        updateInterval: 60*1000, //1 check by minute, by default
        debug: false,
        animationSpeed: 1000,
        firstLoad: false,

    },

    requiresVersion: '2.1.0',

    getStyles: function() {
		return [
            'JIR-tarifa-luz.css'
        ];
    },

    start: function(){
        Log.log('Starting module: ' + this.name);
    },

    getDom: function() {
        var now = moment();
        
        var table = document.createElement('table');
        table.className = 'small';
        var row = document.createElement('tr');
        var cell = document.createElement('td');

        var tramo = this.currentTramo(now);

        cell.className = tramo.tarifa;
        cell.innerHTML = this.restTramo(tramo, now); 

        row.appendChild(cell);
        table.appendChild(row);

        return table;
    },

    restTramo: function(tramo, now){
        var hours = moment(tramo.end, "HH:mm").diff(now, 'hours');
        var minutes = 1 + moment(tramo.end, "HH:mm").diff(now, 'minutes')%60;
        if(hours > 0){
            hours=`${hours}h `;
        }
        return `${hours}${minutes}m`;
    },

    currentTramo: function(now){
         var tramo = this.config.tramos.filter( tramo => {
            var start = moment(tramo.start, "HH:mm");
            var end = moment(tramo.end, "HH:mm");
            if(start.isBefore(now) && end.isAfter(now)){
                return tramo;
            }
        });
        return tramo[0];
    },

    notificationReceived: function (notification, payload) {
        if (notification === "CLOCK_MINUTE") {
            if(payload % 5 === 0){
                this.updateDom(this.config.animationSpeed);
            } 
        }
    },
});