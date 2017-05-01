var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    direction: 'vertical',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    mousewheelControl: true,
    nested:true
});

$(document).ready(function(e) {

    var unslider04 = $('#b04').unslider({

            dots: true

        }),

        data04 = unslider04.data('unslider');



    $('.unslider-arrow04').click(function() {

        var fn = this.className.split(' ')[1];

        data04[fn]();

    });

});





// var wiper = new wiper('.swiper-container', {
//     pagination: '.swiper-pagination',
//     paginationClickable: true,
//     spaceBetween: 30,
// });
