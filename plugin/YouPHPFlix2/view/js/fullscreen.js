$(document).ready(function () {
    linksToFullscreen('a.canWatchPlayButton');
    $(document).on('keyup', function (evt) {
        if (evt.keyCode == 27) {
            closeFlixFullScreen();
        }
    });

});

var flixFullScreenActive = false;

function flixFullScreen(link, url) {
    if(flixFullScreenActive){
        return false;
    }
    flixFullScreenActive = true;
    setTimeout(function(){flixFullScreenActive=false;}, 500);
    $('body').addClass('fullScreen');
    var divHTML = '<div id="divIframeFull" style="background-color:black; text-align: center; position: fixed; top: 0;left: 0; z-index: 9999;">';
    divHTML += '<div id="divTopBar" style="position: fixed; top: 0; left: 0; height: 50px; width: 100vw; z-index: 99999; padding:10px; ">';
    divHTML += '<span id="closeBtnFull" class="pull-right" onclick="closeFlixFullScreen(\''+window.location.href+'\');">';
    divHTML += '<i class="fa fa-times"></i></span></div></div>';
    var div = $(divHTML).append('<iframe src="' + link + '" style="background-color:black; position: fixed; top: 0; left: 0; height: 100vh; width: 100vw; z-index: 9999; overflow: hidden;"  frameBorder="0" id="iframeFull" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen>');
    $('body').append(div);
    $('body').addClass('fullscreen');
    $("#divIframeFull").fadeIn();
    window.history.pushState(null, null, url);
}

var closeFlixFullScreenTimout;
function closeFlixFullScreen(url) {
    console.log("closeFlixFullScreen");
    clearTimeout(closeFlixFullScreenTimout);
    closeFlixFullScreenTimout = setTimeout(function () {

        console.log("closeFlixFullScreen timout");
        $('body').removeClass('fullscreen');
        $('body').attr('class', '');
    }, 500);

    if ($('#divIframeFull').length) {

        console.log("closeFlixFullScreen divIframeFull");
        $("#divIframeFull").fadeOut("slow", function () {
            console.log("closeFlixFullScreen divIframeFull fadeOut");
            $('#divIframeFull').remove();
        });
    }
    console.log("closeFlixFullScreen removeClass");
    $('body').removeClass('fullscreen');
    
    window.history.pushState({},"", url);
}

var linksToFullscreenActive = false;

function linksToFullscreen(selector) {
    //console.log("linksToFullscreen "+selector);
    $(selector).each(function (index) {
        if(!$(this).hasClass('linksToFullscreen')){
            $(this).addClass('linksToFullscreen');
            var href = $(this).attr('href');
            //console.log("linksToFullscreen href="+href);
            //$(this).attr('href', '#');
            $(this).attr('fullhref', href);
            $(this).off("click").click(function (event) {
                event.preventDefault();
                if(linksToFullscreenActive){
                    return false;
                }
                linksToFullscreenActive = true;
                setTimeout(function(){linksToFullscreenActive=false;}, 500);
                var link = $(this).attr('embed');
                var fullhref = $(this).attr('fullhref');
                if (!link) {
                    //console.log("linksToFullscreen embed not found");
                    link = addGetParam(fullhref, 'embed', 1);
                }
                flixFullScreen(link, fullhref);
            });
        }
    });
}

function linksToEmbed(selector) {
    //console.log("linksToFullscreen "+selector);
    $(selector).each(function (index) {
        if(!$(this).hasClass('linksToEmbed')){
            $(this).addClass('linksToEmbed');
            var embed = $(this).attr('embed');
            var href = $(this).attr('href');
            if(embed){
                href = embed;
            }else{
                href = addGetParam(href, 'embed', 1);
            }
            
            $(this).attr('href', addGetParam(href, 'showCloseButton', 1));
        }
    });
}
