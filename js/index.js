// var swiper = new Swiper('.swiper-container', {
//     pagination: '.swiper-pagination',
//     direction: 'vertical',
//     slidesPerView: 1,
//     paginationClickable: true,
//     spaceBetween: 30,
//     mousewheelControl: true,
//     nested:true
// });

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
var swiper =document.getElementsByClassName("swiper");
var wid =document.documentElement.clientWidth;
var hei=document.documentElement.clientHeight;
console.log(swiper)
for (var i=0;i<swiper.length;i++)
{

    swiper[i].style.width=wid+"px";
    swiper[i].style.height=hei+"px";
    // console.log(atr.style.width);
}


var body =document.getElementsByName("body")


//
//
//
//
//
//
// window.onload = function () {
//     var oDiv = document.getElementById('con');
//
//     function onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
//         var ev = ev || window.event;
//         var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作  
//         down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
//         if(down){
//             oDiv.style.scrollTop=hei + "px";
//             alert(oDiv.style.scrollTop)
//             // alert(document.documentElement.clientHeight)
//         }else{
//             alert('呵呵')
//         }
//         if(ev.preventDefault){/*FF 和 Chrome*/
//             ev.preventDefault();// 阻止默认事件  
//         }
//         return false;
//     }
//     addEvent(oDiv,'mousewheel',onMouseWheel);
//     addEvent(oDiv,'DOMMouseScroll',onMouseWheel);
// }
// function addEvent(obj,xEvent,fn) {
//     if(obj.attachEvent){
//         obj.attachEvent('on'+xEvent,fn);
//     }else{
//         obj.addEventListener(xEvent,fn,false);
//     }
// }
$(function() {
    $('.swiper').css({'height': $(window).height()});
    $.scrollify({
        section: '.swiper',
        scrollbars: false
    });
});