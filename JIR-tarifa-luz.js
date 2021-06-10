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
                tarifa: 'llano'
            },
        ],

        festivos: [
            '01ene.', '06ene.', '02abr.', '01may.', '12oct.', '01nov.', '06dic.', '08dic.', '25dic.' 
        ],

        debug: false,
        animationSpeed: 1000,
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
        var container = document.createElement('div');
        container.className = 'container';
        var table = document.createElement('table');
        table.className = 'small';

        var tramo = this.currentTramo(now);

        let progressRow = document.createElement('tr');
        let progressCell = document.createElement('td');
        let progress = document.createElement('progress');

        let progressLabel = document.createElement('div');        
        progressLabel.innerHTML = this.intervalReminderLabel(tramo, now); 
        
        progress.setAttribute('max', this.intervalLength(tramo));
        progress.setAttribute('value', this.intervalReminder(tramo, now));
        progress.className=`${tramo.tarifa}`;

        progressCell.appendChild(progress);
        progressCell.appendChild(progressLabel);
        progressRow.appendChild(progressCell);
        
        table.appendChild(progressRow);
        container.appendChild(table);

        return container;
    },

    intervalLength: function(tramo){
        return tramo.end.diff(tramo.start, 'minutes');
    },

    intervalReminder: function(tramo, now){
        return tramo.end.diff(now, 'minutes');
    },

    intervalReminderLabel: function(tramo, now){
        var hours = tramo.end.diff(now, 'hours');
        var minutes = tramo.end.diff(now, 'minutes')%60;
        if(hours > 0){
            hours=`${hours}h `;
        }else {
            hours = '';
        }
        return `menos de ${hours}${minutes}m`;
    },

    currentTramo: function(now){
        var tramo = {}
        if(this.isHoliday(now) || this.isWeekEnd(now)){            
            tramo = {
                start: moment('00:00', 'HH:mm'),
                end: moment('23:59', 'HH:mm'),
                tarifa: 'valle'
            };
        }else{
            tramo = this.weekDay(now);
        }
        return tramo;
    },

    isHoliday: function(now){
        var today = now.format('DDMMM');
        var isHoliday = this.config.festivos.includes(today);
        return isHoliday;
    },

    isWeekEnd: function(now){
        var isWeekEnd = now.day() ==6 || now.day() == 0;
        return isWeekEnd;

    },

    weekDay: function(now){
        var tramo = this.config.tramos.filter( tramo => {
            var start = moment(tramo.start, "HH:mm");
            var end = moment(tramo.end, "HH:mm");
            if(tramo.end === '00:00'){
                var end = end.add(1, 'days');
            }
            if(start.isBefore(now) && end.isAfter(now)){
                tramo.start = start;
                tramo.end = end;
                return tramo;
            }
        })[0];
        return tramo;
    },

    notificationReceived: function (notification, payload) {
        if (notification === "CLOCK_MINUTE") {
            if(payload % 5 === 0){
                this.updateDom(this.config.animationSpeed);
            } 
        }
    },
});