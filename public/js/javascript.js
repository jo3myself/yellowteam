 $(document).ready(function() {
  // Opens Account Modal with appropriate tab selected
  $('.open-account-modal').on('click',function(e) {
    $('#account-modal').modal();
    var tab = e.target.hash;
    $('a[href="' + tab + '"]').tab('show');
  });

  // Activates Carousel
  $('.carousel').carousel();
});