$(document).ready(function() {

    $('#datepicker').datepicker({
      startView: 0,
      forceParse: false,
      autoclose: true,
      startDate: null,
      format: "dd/mm/yyyy",
      daysOfWeekDisabled: [0, 6]
    }).on('changeDate', function(selected) {
      var minDate = new Date(selected.date.valueOf());
    });
});