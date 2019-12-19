$(document).mouseup(function (e) { 
    if ($(e.target).closest(".notifDiv").length 
                === 0) { 
        $(".notifDiv").hide(); 
    } 
}); 
$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) {
        $( ".notifDiv" ).hide();
    }
});

$(".notify").click(function () {
    $(".notifDiv").toggle();
    
});

