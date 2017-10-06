$(document).ready(function() {

  // process the form
  $('#register-form').submit(function(event) {

  console.log('heljdof');

    // get the form data
    var formData = {
      'first_name'      : $('#first_name').val(),
      'email'           : $('#email').val(),
      'phone_number'    : $('#phone_number').val(),
      'user_name'       : $('#user_name').val(),
      'password'        : $('#password').val(),
      'profile_image'   : $('#profile_image').val(),
      'location'        : $('#location').val(),
      'id'              : $('#id').val()
    };

    // process the form
    $.ajax({
      type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url         : '/user', // the url where we want to POST
      data        : formData, // our data object
      dataType    : 'json', // what type of data do we expect back from the server
      // encode      : true
    })
    // using the done promise callback
    .done(function(data) {
      // log data to the console so we can see
      console.log(data); 
      // here we will handle errors and validation messages
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

});