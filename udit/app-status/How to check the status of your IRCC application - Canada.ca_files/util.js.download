var Utils = (function () {
    return {
        getUrlParameter: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        updateQueryString: function (key, value, url) {
            if (!url) url = window.location.href;
            var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
                hash;

            if (re.test(url)) {
                if (typeof value !== 'undefined' && value !== null)
                    return url.replace(re, '$1' + key + "=" + value + '$2$3');
                else {
                    hash = url.split('#');
                    url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                    if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                        url += '#' + hash[1];
                    return url;
                }
            }
            else {
                if (typeof value !== 'undefined' && value !== null) {
                    var separator = url.indexOf('?') !== -1 ? '&' : '?';
                    hash = url.split('#');
                    url = hash[0] + separator + key + '=' + value;
                    if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                        url += '#' + hash[1];
                    return url;
                }
                else
                    return url;
            }
        },

        isAuthenticatedThroughAuth0: function () {
            try {
                if (!localStorage.getItem("accessToken") || !localStorage.getItem("profile") || !localStorage.getItem("jwt")) {
                    return false;
                }
                return true;
            } catch (e) {
                // This exception can be triggered by 3rd party cookie disabled, no need to handle it for now
            }
        },

        parseBoolean: function (value) {
            if (typeof value == "boolean") {
                return value;
            }
            if (typeof value !== "string") {
                console.debug("Invalid type to parse to boolean");
                return false;
            } else {
                if (value.trim().toLowerCase() === "true") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        
        parseHeaderIndex: function(index) {
            if(parseInt(index) < 0) {
                index = 1;
            } else if (parseInt(index) > 6) {
                index = 6;
            } else if (isNaN(index)) {
                index = 1;
            }
            return parseInt(index);
        }
    }
}());

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}