jQuery(document).ready(function($) {


    var mastheadheight = $('.ds-header').outerHeight();
    //console.log(mastheadheight);
    $(".ds-banner,.ds-main-section").css("margin-top", mastheadheight);

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 10) {
            $('.ds-header').addClass('ds-fixed-header');
        } else {
            $('.ds-header').removeClass('ds-fixed-header');
        }
    }).scroll();

    //Slider
    if ($('.ds-testimonials-section').length) {
        $('.ds-testimonials-slider').slick({
            infinite: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='ri-arrow-left-line'></i></button>",
            nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='ri-arrow-right-line'></i></button>"
        });
    }


});