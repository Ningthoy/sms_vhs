 document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: [ 'dayGrid' ],
           customButtons: {
                myCustomButton: {
                text: 'SYNC WITH ATTENDANCE SYSTEM',
                click: function() {
                    alert('clicked the custom button!');
                }
                }
            } ,
        header: {
            left: 'prev,next, myCustomButton',
            center: 'title',
            right: 'today,dayGridMonth'
        }
        });
        calendar.render();
});
