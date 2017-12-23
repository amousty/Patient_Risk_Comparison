/*
    DOCUMENT READY & LOAD
*/
$( document ).ready( function() {
  $('#loader').show();
  $('#data-container').hide();

  // Tooltip from bootstrap
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });

  // When the user click on CHART or GRAPH on header, scrolling is more user friendly
  $('.smooth-scrolling').on('click', function() {
      // Target page
			var page = $(this).attr('href');
      // Length animation (ms)
			var speed = 750;
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});

    // Unslect patient, btn visible from modal
    $('#btn-rmv-patient').click(function(){
      removePatient();
    });
});



$( window ).on( "load", function() {
    $('#loader').hide();
    // page is fully loaded, including all frames, objects and images
    // We pass the IDs chosen by the doctor
    $('#data-container').show('slow');
    // Table is generated
    loadTableData();
});
