// ---------- Sign up&in validation ----------
const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')








$(".notify").click(function () {
    $(".notifDiv").toggle();
});
// $(document).mouseup(function (e) { 
//     if ($(e.target).closest(".notifDiv").length 
//                 === 0) { 
//         $(".notifDiv").hide(); 
//     } 
// }); 
$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) {
        $( ".notifDiv" ).hide();
    }
});

$(function(){
    $(".pageHeader").load("header.html");
  });

