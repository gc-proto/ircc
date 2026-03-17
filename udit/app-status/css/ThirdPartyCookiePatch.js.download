// Korah Confidential
// Copyright (c) 2016-2023 Korah Limited
// All rights reserved.
//
// This file is part of Customer Care Robot (ccRobot) Project.
// It is subject to terms in user license. Please contact info@korahlimited.com for copy of license.
// No part of ccRobot Project, including this file, may be copied, modified, propagated, or distributed
// except according to the terms in user license.
//
// Customer Care Robot (ccRobot)
//

function ThirdPartyCookiePatch(oprUrl) {

    var _self = this;
    var _state = null;
    var _baseUrl = oprUrl;

    function _checkCookiesEnabled(isEnabled, isDisabled) {
        var timestamp = Date.now();
        if((window.parent == null || window == window.parent) && navigator.cookieEnabled) {
            _state = true;
            isEnabled();
        } else {
            $.ajax({
                url: _baseUrl + "/ccrChat/thirdPartyCookiePatch/getTstCookie.php",
                type: "POST",
                data: {
                    timestamp: timestamp
                },
                success: function () {
                    if (document.cookie.indexOf("CCR_" + timestamp + "=") != -1) {
    
                        var isSecure = window.location.protocol == "https:";
                        var cname = "CCR_" + timestamp;
                        var date = new Date();
                        date.setTime(timestamp);
                        document.cookie = encodeURIComponent(cname) + "=;path=/;SameSite=None;" + (isSecure ? "Secure;" : "") + "expires=" + date.toUTCString();
    
                        _state = true;
                        isEnabled();
                    } else {
                        _state = false;
                        isDisabled();
                    }
                }
            });
        }
        
    }

    function _cookiesEnabled(isEnabled, isDisabled) {
        if(_state == null) {
            _checkCookiesEnabled(isEnabled, isDisabled);
        } else if(_state) {
            isEnabled();
        } else {
            isDisabled();
        }
    }

    _self.cookiesEnabled = _cookiesEnabled;

    return _self;

};
