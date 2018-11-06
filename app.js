(function () {
    'use strict';

    function getHash(hash) {
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

    function deserialize(query) {
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
                else if (parameters.hasOwnProperty('access_token')) {
                    return parameters['access_token'];
                }
            }
        }

        return result;
    }

    window.generateToken = function () {
        var tenant = document.getElementById('id-tenant').value;
        var clientId = document.getElementById('id-client-id').value;
        var scope = document.getElementById('id-scope').value;
        loginRedirect(tenant, clientId, scope);
    };

    function loginRedirect(tenant, clientId, scope) {
        var loginUri = 'https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/authorize?';
        var params = [];
        params.push('client_id=' + clientId);
        params.push('response_type=id_token token');
        params.push('redirect_uri=https://coderuse.github.io/aad-implicit-flow/');
        params.push('scope=openid ' + scope + '/user_impersonation');
        params.push('response_mode=fragment');
        params.push('state=12345');
        params.push('nonce=678910');
        loginUri += decodeURIComponent(params.join('&'));

        var rememberMe = document.getElementById('id-remember-me').checked;
        if (rememberMe) {
            localStorage.setItem('tenant', tenant);
            localStorage.setItem('clientId', clientId);
            localStorage.setItem('scope', scope);
        }
        else {
            localStorage.clear();
        }
        window.location.replace(loginUri);
    }

    var pTenant = localStorage.getItem('tenant');
    var pClientId = localStorage.getItem('clientId');
    var pScope = localStorage.getItem('scope');
    if (pTenant && pClientId && pScope) {
        document.getElementById('id-tenant').value = pTenant;
        document.getElementById('id-client-id').value = pClientId;
        document.getElementById('id-scope').value = pScope;
        document.getElementById('id-remember-me').checked = true;
    }

    var intrvl = setInterval(function () {
        var accessToken = isSignInProgress();
        if (accessToken) {
            clearInterval(intrvl);
            if (accessToken.error) {
                console.log(accessToken.error.description);
                return;
            }
            else {
                //window.location = './';
                // document.getElementById('id-access-token').innerHTML = 'Access-Token: ' + accessToken;
                // document.getElementById('id-access-token').classList.toggle('invisible');
                console.log(accessToken);
            }
        }
    }, 3000);
}());