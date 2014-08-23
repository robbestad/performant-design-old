(function () {
    'use strict';
})();

//initiating jQuery
jQuery(function ($) {

    var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];

    (setNavbar = function () {
        $(".navbar ul>li").css("width", ($(".content").width() / 3) - 2 + "px");
    })();

    $(document).ready(function () {
        //enabling stickUp on the '.navbar-wrapper' class
        $('.navbar-wrapper').stickUp();
        //setting the navbar width
        setNavbar();
    });
    $(window).resize(function () {
        setNavbar();
    });

    $(".modal-event").on('click',function(){
        $(".modal-img").attr("src", $(this).attr("src"));
        scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        $(".masthead").css("opacity",0);
        $(".content").css("opacity",0);
        $("html").css("position","fixed");
    });

    $(".modal-close").on('click',function(){
        $("html").css("position","relative");
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
        $("body").css("opacity",1);
        $(".masthead").css("opacity",1);
        $(".content").css("opacity",1);

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
