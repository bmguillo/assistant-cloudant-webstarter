// set debug mode by akaishi

function GetQueryString() {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);
        var parameters = query.split('&');
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return null;
}

window.onload = function onLoad() {
    var params = GetQueryString();
    console.log(params);
    if ( params.debug_mode && params.debug_mode === 'true' ) {
        $('#chat-column-holder').css({'width':''});
        $('.chat-column').css({'width':'','max-width':'25rem','min-width':'9.375rem'});
        $('#payload-column').css({'width':'45%','max-width':'32.0625rem','min-width':'29.6875rem'});
        $('#payload-column.full').css({'width':'100%','max-width':'none','min-width':'initial'})
    }
}
