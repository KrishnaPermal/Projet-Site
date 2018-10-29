import './scroll.html';

jQuery(function(){

$(function () {
        $(window).scroll(function () {

    if ($(this).scrollTop() > 200 ) { 
            $('#scrollUp').css('left','10px');
    } else { 
            $('#scrollUp').removeAttr( 'style' )}
        });
    });
});
