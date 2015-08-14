(function() {
    window.oauth2 = {

        access_token_url: "https://login.uber.com/oauth/token",
        authorization_url: "https://login.uber.com/oauth/authorize",
        client_id: "_mSN0yG0lSdeR0ipMIDcnAIwnIbdjhG2",
        client_secret: "e4Lz6Bwj-G2r75fbs97b6NjPxGFy5dfMWGcLOnHH",
        scopes: 'request profile history',

        key: "oauth2_token",

        /**
         * Starts the authorization process.
         */
        start: function() {
            window.close();
            var url = this.authorization_url + "?client_id=" + this.client_id + "&response_type=code" + "&scope=" + this.scopes;
            chrome.tabs.create({url: url, active: true});
        },

        /**
         * Finishes the oauth2 process by exchanging the given authorization code for an
         * authorization token. The authroiztion token is saved to the browsers local storage.
         * If the redirect page does not return an authorization code or an error occures when
         * exchanging the authorization code for an authorization token then the oauth2 process dies
         * and the authorization tab is closed.
         *
         * @param url The url of the redirect page specified in the authorization request.
         */
        finish: function(url) {

            function removeTab() {
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id);
                });
            };

            if(url.match(/\?error=(.+)/)) {
                removeTab();
            } else {
                var code = url.match(/\?code=([\w\/\-]+)/)[1];
                // console.log(code)
                var that = this;
                var data = new FormData();
                data.append('client_id', this.client_id);
                data.append('grant_type', 'authorization_code');
                data.append('redirect_uri', 'https://www.uber.com/robots.txt');
                data.append('client_secret', this.client_secret);
                data.append('code', code);

                console.log(this.client_id, this.client_secret, code)

                // Send request for authorization token.
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function(event) {
                    if(xhr.readyState == 4) {
                        console.log('readyState 4')
                        if(xhr.status == 200) {
                            console.log('status 200');
                            if(xhr.responseText.match(/error=/)) {
                                removeTab();
                                console.log('error')
                            } else {
                                // console.log( JSON.parse(xhr.response).access_token )
                                var token = JSON.parse(xhr.response).access_token;
                                window.localStorage.setItem(that.key, token);
                                removeTab();

                            }
                        } else {
                            removeTab();
                            console.log('else', xhr)
                        }
                    }
                });
                xhr.open('POST', this.access_token_url, true);
                xhr.send(data);
            }
        },

        /**
         * Retreives the authorization token from local storage.
         *
         * @return Authorization token if it exists, null if not.
         */
        getToken: function() {
            return window.localStorage.getItem(this.key);
        },

        /**
         * Clears the authorization token from the local storage.
         */
        clearToken: function() {
            delete window.localStorage.removeItem(this.key);
        }
    }
})();