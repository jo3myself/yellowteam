 $(document).ready(function() {
	 
  // Opens Account Modal with appropriate tab selected
  $('.open-account-modal').on('click',function(e) {
    $('#account-modal').modal();
    var tab = e.target.hash;
    $('a[href="' + tab + '"]').tab('show');
  });

  // Activates Carousel
	$('.carousel').carousel();

// handles the carousel thumbnails
$('[id^=carousel-selector-]').click( function(){
  var id_selector = $(this).attr("id");
  var id = id_selector.substr(id_selector.length -1);
  id = parseInt(id);
  $('#carousel').carousel(id);
  $('[id^=carousel-selector-]').removeClass('selected');
  $(this).addClass('selected');
});

// when the carousel slides, auto update
$('#carousel').on('slid', function (e) {
  var id = $('.item.active').data('slide-number');
  id = parseInt(id);
  $('[id^=carousel-selector-]').removeClass('selected');
  $('[id=carousel-selector-'+id+']').addClass('selected');
});


});


$.get("/api/products", function(data) {
	var categories=[];
	var category = [];
	for (let i = 0; i < data.length; i++) {
		categories.push(data[i].category); 
	}
    $.each(categories, function(i, elm){
        if($.inArray(elm, category) === -1) category.push(elm);
    });
    console.log(category);
	for (var l = 0; l < category.length; l++) {
		var cat = $('<a class="dropdown-item" id="dropDownCategory" name="category" href="/?category_search=' + category[l] + '">' + category[l] + '</a>');
		$(".searchDropDown").append(cat);
	}
});

var url = window.location.search;
var ProductCategory;
if (url.indexOf("?category_search=") !== -1) {
	ProductCategory = url.split("=")[1];
	dropdownList(ProductCategory);
}
else {
	dropdownList();
}


function dropdownList(cat) {
    ProductCategory = cat || "";
    if (ProductCategory) {
      ProductCategory = "/?category_search=" + ProductCategory;
    }
    $.get("/api/products" + ProductCategory, function(data) {
    	console.log(data);   
    });
  }

$("#searchButton").click(function(event) {
	event.preventDefault();
	var searchProduct = $("#searchInput").val();
	 window.location.href="/search/"+searchProduct;
});


// Used for the quantity selector on product view
//-----------------------------------------------
//-----------------------------------------------

$('.btn-number').click(function(e){
	e.preventDefault();
	
	fieldName = $(this).attr('data-field');
	type      = $(this).attr('data-type');
	var input = $("input[name='"+fieldName+"']");
	var currentVal = parseInt(input.val());
	if (!isNaN(currentVal)) {
			if(type == 'minus') {
					
					if(currentVal > input.attr('min')) {
							input.val(currentVal - 1).change();
					} 
					if(parseInt(input.val()) == input.attr('min')) {
							$(this).attr('disabled', true);
					}

			} else if(type == 'plus') {

					if(currentVal < input.attr('max')) {
							input.val(currentVal + 1).change();
					}
					if(parseInt(input.val()) == input.attr('max')) {
							$(this).attr('disabled', true);
					}

			}
	} else {
			input.val(0);
	}
});
$('.input-number').focusin(function(){
 $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
	
	minValue =  parseInt($(this).attr('min'));
	maxValue =  parseInt($(this).attr('max'));
	valueCurrent = parseInt($(this).val());
	
	name = $(this).attr('name');
	if(valueCurrent >= minValue) {
			$(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
			alert('Sorry, the minimum value was reached');
			$(this).val($(this).data('oldValue'));
	}
	if(valueCurrent <= maxValue) {
			$(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
			alert('Sorry, the maximum value was reached');
			$(this).val($(this).data('oldValue'));
	}
	
	
});
$(".input-number").keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
					 // Allow: Ctrl+A
					(e.keyCode == 65 && e.ctrlKey === true) || 
					 // Allow: home, end, left, right
					(e.keyCode >= 35 && e.keyCode <= 39)) {
							 // let it happen, don't do anything
							 return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
			}
	});

