var $headline = $('.headline'),
    $inner = $('.inner'),
    $nav = $('nav'),
    navHeight = 75;

$(window).scroll(function() {
  var scrollTop = $(this).scrollTop(),
      headlineHeight = $headline.outerHeight() - navHeight,
      navOffset = $nav.offset().top;

  $headline.css({
    'opacity': (1 - scrollTop / headlineHeight)
  });
  $inner.children().css({
    'transform': 'translateY('+ scrollTop * 0.4 +'px)'
  });
  if (navOffset > headlineHeight) {
    $nav.addClass('scrolled');
  } else {
    $nav.removeClass('scrolled');
  }
});

/*
    DOCUMENT READY & LOAD
*/
$( document ).ready( function() {
  $('#loader').show();
  $('#data-container').hide();
});

$( window ).on( "load", function() {
    $('#loader').hide();
    // page is fully loaded, including all frames, objects and images
    // We pass the IDs chosen by the doctor
    $('#data-container').show('slow');
    loadTableData();
});
