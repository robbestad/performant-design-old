(function(){
    'use strict';
})();

//initiating jQuery
jQuery(function($) {

(setNavbar=function(){
  $(".navbar ul>li").css("width",($(".content").width()/3)-2+"px");
})();

$(document).ready( function() {
  //enabling stickUp on the '.navbar-wrapper' class
  $('.navbar-wrapper').stickUp();
  //setting the navbar width
  setNavbar();
});
$( window ).resize(function() {
   setNavbar();
});


    $(window).bind('load', function () {
            parallaxInit();
    });
    var headerParallax = jQuery('.masthead');
    function parallaxInit() {
        headerParallax.parallax("50%", 1);
    }
    parallaxInit();


});
