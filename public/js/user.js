$(document).ready(function() {

  // Hide sucess alert on load
  $('.alert-profile, .alert-image').addClass('d-none');

  // process the edit-profile-form
  $('#edit-profile-form').submit(function(event) {

    $('.alert-profile, .alert-image').addClass('d-none');

    // get the form data
    var formData = {
      'name'            : $('#name').val(),
      'email'           : $('#email').val(),
      'phone_number'    : $('#phone_number').val(),
      'user_name'       : $('#user_name').val(),
      // 'password'        : $('#password').val(),
      'location'        : $('#location').val(),
      'id'              : $('#id').val()
    };

    // process the form
    $.ajax({
      type        : 'PUT',
      url         : '/user',
      data        : formData,
      dataType    : 'json'
    }).done(function(data) {
      // log data to the console so we can see
      // console.log(data); 
      var newStoreName = $('#user_name').val();
      $('#store-name').text(newStoreName);
      $('#store-btn').attr('href', '/store/' + newStoreName );
      // Show message that user has been updated
      $('.alert-profile').removeClass('d-none');
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

  // process the profile-image-form
  $('#profile-image-form').submit(function(event) {

    // get the form data
    var formData = {
      'profile_image'   : $('#profile_image').val('Image Here'),
      'id'              : $('#id').val()
    };

    // process the form
    $.ajax({
      type        : 'PUT',
      url         : '/profile-image',
      data        : formData,
      dataType    : 'json'
    }).done(function(data) {
      // log data to the console so we can see
      console.log(data); 
      // Show message that user has been updated
      $('.alert-image').removeClass('d-none');
      // window.location.href = "/";
    });

    // // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

});