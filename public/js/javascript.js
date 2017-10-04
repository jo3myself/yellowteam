 $(document).ready(function() {
  // Opens Account Modal with appropriate tab selected
  $('.open-account-modal').on('click',function(e) {
    $('#account-modal').modal();
    var tab = e.target.hash;
    $('a[href="' + tab + '"]').tab('show');
  });

  // Activates Carousel
  $('.carousel').carousel();


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
      	// for (var i = 0; i < data.length; i++) {
      	// 	$("#test1").append("<p>" + data[i].productName + "</p>");
      	// }    
    });
  }

$("#searchButton").click(function() {
	event.preventDefault();
	var searchProduct = $("#searchInput").val();
	 window.location.href="/search/"+searchProduct;
   
		// for (var i = 0; i < data.length; i++) {
		// 	$("#test1").append('<div class="col-sm-12 col-xl-5"><div class="media media-category"> <img class="d-flex align-self-center mr-3" src="http:' + data[i].imageURL + '" alt="Generic placeholder image"><div class="media-body"><h5 class="mt-0">' + data[i].productName + '</h5><p>Category: ' + data[i].category + '</p> <p>Price: ' + data[i].price + '</p> <a href="/' + data[i].id + '">More Info &rarr;</a></div></div>');  	
		// }
	});
});





