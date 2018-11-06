(function(){
    'use strict';

    function getHash (hash) {
        if (hash.indexOf("#/") > -1) {
            hash = hash.substring(hash.indexOf("#/") + 2);
        }
        else if (hash.indexOf("#") > -1) {
            hash = hash.substring(1);
        }
        return hash;
    }

    function decode(s) {
        var pl = /\+/g;
        return decodeURIComponent(s.replace(pl, " "));
    }

    function deserialize (query) {
        var match;
        var search = /([^&=]+)=([^&]*)/g;
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    }

    function isSignInProgress() {
        var result = false;

        var hash = window.location.hash;
        if (hash) {
            hash = getHash(hash);
            var parameters = deserialize(hash);
            if (parameters) {
                if (parameters.hasOwnProperty('error_description')) {
                    var errorDescription = parameters['error_description'];
                    return {
                        error: {
                            description: errorDescription
                        }
                    };
                }
                else if (parameters.hasOwnProperty('access_code')) {
                    var accessCode = parameters['access_code'];
                    return accessCode;
                }
            }
        }

        return result;
    }

    window.generateToken = function(){
        var tenant = document.getElementById('id-tenant').value;
        var loginUri = 'https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/authorize?';
        var params = [];
        var clientId = document.getElementById('id-client-id').value;
        params.push('client_id=' + clientId);
        params.push('response_type=id_token token');
        params.push('redirect_uri=https://coderuse.github.io/aad-implicit-flow');
        var scope = document.getElementById('id-scope').value + '/user_impersonation';
        params.push('scope=openid ' + scope);
        params.push('response_mode=fragment');
        params.push('state=12345');
        params.push('nonce=678910');
        loginUri += decodeURIComponent(params.join('&'));
        this.window.location.replace(loginUri);
    };

    
    var intrvl = setInterval(function(){
        var accessCode = isSignInProgress();
        if (accessCode) {
            clearInterval(intrvl);
            if (accessCode.error) {
                console.log(accessCode.error.description);
                return;
            }
        }
        else {
            console.log(accessCode);
        }            
    }, 3000);
}());