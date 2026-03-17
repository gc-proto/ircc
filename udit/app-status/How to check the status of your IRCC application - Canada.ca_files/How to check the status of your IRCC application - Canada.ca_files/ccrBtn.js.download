/*
 * Reference website:
 * http://alexmarandon.com/articles/widget-jquery-plugins/
 * http://alexmarandon.com/articles/web_widget_jquery/#loading-javascript-libraries
 * http://www.ipreferjim.com/2011/06/loading-newer-versions-of-jquery-and-jquery-ui-noconflict/
 */
(function (window, document, $) {

    window.addEventListener("message", function (evt) {
        if (typeof evt != "object" || evt == null) {
            // console.error("Invalid evt received from host page." + evt);
            return;
        }
        if (typeof evt.data.ccr !== "undefined" && evt.data.ccr != null && typeof evt.data.ccr.type) {
            if ("loadint" == evt.data.ccr.type) {
                return;
            }
        }
        // pass event along to child frame.
        let frame = document.getElementById("korahCcrChat");
        frame.contentWindow.postMessage(evt.data, "*");
    });

    var orgId, parentUrl, hostUrl, ccrChatPhpUrl, containerHeight, containerWidth, showMsgTimeOut, hideMsgTimeOut, isShowMinBtn, isShowResizeBtn, isShowCloseBtn, isShowConfirmationOnClose, isClntAuthRq, isPrivateInfoAllowed, headerStartIndex, ccrChatHeaderStartIndex, locale, sR, bodyPaddingRight, containerRight, containerBottom, isShowingUsrInfoModal, isChatFrameHasSrc, isModalShown, isEndChatClicked, parentPageQueryString = "", ccRChatUrl, isIe, termsLinkUrl, usrTopPageURL;
    var isSlimWidget = "";
    var jQuery, $; // Localize jQuery variables

    var containerFrame = {
        defaults: {
            height: "700px",
            width: "430px",
            bottom: "10px",
            right: "10px"
        },
        style: {},
        dataset: {}
    };

    containerFrame.style.height = containerFrame.defaults.height;
    containerFrame.style.width = containerFrame.defaults.width;

    var origin = "*";
    var messager = {
        sendReady: function () {
            let msg = {
                ccr: {
                    type: "ready"
                }
            };
            window.parent.postMessage(msg, origin);
        },
        sendStart: function () {
            let msg = {
                ccr: {
                    type: "start",
                    content: {
                        width: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.width) ? (ccrResources.widgetFrame.width.toString() + "px") : containerFrame.style.width,
                        height: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.height) ? (ccrResources.widgetFrame.height.toString() + "px") : containerFrame.style.height,
                        display: containerFrame.style.display,
                        visibility: containerFrame.style.visibility,
                        bottom: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.bottom) ? ((ccrResources.widgetFrame.bottom !== "0" ? ccrResources.widgetFrame.bottom : "") + "px") : containerFrame.style.bottom,
                        right: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.right) ? ((ccrResources.widgetFrame.right !== "0" ? ccrResources.widgetFrame.right : "") + "px") : containerFrame.style.right,
                        top: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.top) ? ((ccrResources.widgetFrame.top !== "0" ? ccrResources.widgetFrame.top : "") + "px") : "",
                        left: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.left) ? ((ccrResources.widgetFrame.left !== "0" ? ccrResources.widgetFrame.left : "") + "px") : "",
                    }
                }
            };
            window.parent.postMessage(msg, origin);
        },
        sendShow: function () {
            let msg = {
                ccr: {
                    type: "show",
                    content: {
                        width: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.width) ? (ccrResources.widgetFrame.width.toString() + "px") : containerFrame.style.width,
                        height: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.height) ? (ccrResources.widgetFrame.height.toString() + "px") : containerFrame.style.height,
                        bottom: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.bottom) ? ((ccrResources.widgetFrame.bottom !== "0" ? ccrResources.widgetFrame.bottom : "") + "px") : containerFrame.style.bottom,
                        right: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.right) ? ((ccrResources.widgetFrame.right !== "0" ? ccrResources.widgetFrame.right : "") + "px") : containerFrame.style.right,
                        top: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.top) ? ((ccrResources.widgetFrame.top !== "0" ? ccrResources.widgetFrame.top : "") + "px") : "",
                        left: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.left) ? ((ccrResources.widgetFrame.left !== "0" ? ccrResources.widgetFrame.left : "") + "px") : "",
                        isSlimWidget: isSlimWidget
                    }
                }
            };
            window.parent.postMessage(msg, origin);
        },
        sendHidden: function () {
            let msg = {
                ccr: {
                    type: "hidden",
                    content: {
                        width: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.width) ? (ccrResources.widgetFrame.width.toString() + "px") : containerFrame.style.width,
                        height: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.height) ? (ccrResources.widgetFrame.height.toString() + "px") : containerFrame.style.height,
                        bottom: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.bottom) ? ((ccrResources.widgetFrame.bottom !== "0" ? ccrResources.widgetFrame.bottom : "") + "px") : containerFrame.style.bottom,
                        right: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.right) ? ((ccrResources.widgetFrame.right !== "0" ? ccrResources.widgetFrame.right : "") + "px") : containerFrame.style.right,
                        top: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.top) ? ((ccrResources.widgetFrame.top !== "0" ? ccrResources.widgetFrame.top : "") + "px") : "",
                        left: (ccrResources && "object" == typeof ccrResources.widgetFrame && "string" == typeof ccrResources.widgetFrame.left) ? ((ccrResources.widgetFrame.left !== "0" ? ccrResources.widgetFrame.left : "") + "px") : "",
                    }
                }
            };
            window.parent.postMessage(msg, origin);
        },
        sendResize: function () {
            let msg = {
                ccr: {
                    type: "resize",
                    content: {
                        width: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.width) ? (ccrResources.widgetFrame.width.toString() + "px") : containerFrame.style.width,
                        height: (ccrResources && "object" == typeof ccrResources.widgetFrame && "number" == typeof ccrResources.widgetFrame.height) ? (ccrResources.widgetFrame.height.toString() + "px") : containerFrame.style.height
                    }
                }
            };
            window.parent.postMessage(msg, origin);
        },
        sendcsKey: function (csKey) {
            //debugger;
            let msg = {
                ccr: {
                    type: "csKey",
                    content: {
                        csKey: csKey
                    }
                }
            };
            window.parent.postMessage(msg, origin);
        }
    };

    function receiveMessage(evt) {
        if (typeof evt != "object" || evt == null) {
            console.error("Invalid evt received from host page." + evt);
            return;
        }
        if (evt.data === "tab") {
            console.log("Received " + evt.data + " from " + evt.origin);
            for (var i = 0; i < window.frames.length; i++) {
                window.frames[i].blur();
            }
            // MH Important: This is the key to make tab work from child iframe to parent page in FireFox.
            $("*").blur();
            // Check if footer is visible
            if ($(".modal-footer:visible").length == 0 || $(':tabbable', $(".modal-footer:visible")).length == 0) {
                console.log("tab to minimize button.");
                $(':tabbable').first().blur().focus();
            } else {
                console.log("Tab to terms link");
                $(':tabbable', $(".modal-footer:visible")).first().blur().focus();
            }
        } else {
            if (typeof evt.data.ccr !== "undefined" && evt.data.ccr != null && typeof evt.data.ccr.type) {
                switch (evt.data.ccr.type) {
                    case "settitle":
                        {
                            if ( "object" != typeof evt.data.ccr.content ) {
                                break;
                            }
                            let ccrChatTitle = evt.data.ccr.content["title"];
                            $("#korahCcrModalTitle").html( ccrChatTitle );
                        }
                        break;
                    case "loadint":
                        {
                            if ( "object" != typeof evt.data.ccr.content ) {
                                break;
                            }

                            let orgId = containerFrame.dataset.orgid;
                            let usrId = getCookie( orgId + "_korahlimitedUsrId" );
                            let sid = getCookie( orgId + "_korahlimitedSid" );
                            usrId = ( "" === usrId && "function" == typeof window.getCookie
                                      ? window.getCookie( orgId + "_korahlimitedUsrId" )
                                      : usrId
                            );
                            sid = ( "" === sid && "function" == typeof window.getCookie
                                      ? window.getCookie( orgId + "_korahlimitedSid" )
                                      : sid
                            );
                            if ( "string" == typeof usrId && 0 < usrId.length
                                     && "string" == typeof sid && 0 < sid.length ) {
                                // If conversation session started already... ccrChatCtx.loadIntension()
                                // NOTE:
                                //     Since messsage has already been routed to korahCcrChat (inner iframe)
                                //       there should be NO NEED to send a separate message to ccrChat
                                //     However, the inner iframe is reloaded somehow.
                                setTimeout( function () {
                                    let frame = document.getElementById("korahCcrChat");
                                    frame.contentWindow.postMessage(evt.data, "*");
                                    isSlimWidget = evt.data.ccr.content.slimWidget;
                                    $("#korahCcrButton").click(); // open the chat window, if not open yet.
                                }, 1000);
                            } else {
                                // If conversation session has NOT been started
                                let ccrChatInitInt = evt.data.ccr.content["ccrchatinitint"];
                                if ( "string" == typeof ccrChatInitInt ) {
                                    let ccRChatUrlBkup = ccRChatUrl;
                                    ccRChatUrl = Utils.updateQueryString("initInt", ccrChatInitInt, ccRChatUrlBkup);
                                    isSlimWidget = evt.data.ccr.content.slimWidget;
                                    $("#korahCcrButton").click();
                                    setTimeout( function () {
                                        ccRChatUrl = ccRChatUrlBkup;
                                    }, 1000);

                                    setTimeout( function () {
                                        let frame = document.getElementById("korahCcrChat");
                                        frame.contentWindow.postMessage(evt.data, "*");
                                    }, 1000);
                                }
                            }
                            
                            // isSlimWidget = evt.data.ccr.content.slimWidget;
                            // if(isSlimWidget == "true" || isSlimWidget == true){
                            //     $("#korahCcrModal").data("state", "min");
                            //     $("#korahCcrModal").modal("hide");
                            // }
                        }
                        break;
                    case "init":
                        for (let data in evt.data.ccr.content) {
                            containerFrame.dataset[data] = evt.data.ccr.content[data]
                        };

                        if (evt.data.ccr.ccrResources) {
                            containerFrame.ccrResources = evt.data.ccr.ccrResources;
                        }

                        if (evt.data.ccr.profile) {
                            containerFrame.profile = evt.data.ccr.profile;
                        }

                        if(evt.data.ccr.rsp){
                            containerFrame.rsp = evt.data.ccr.rsp;
                        }

                        if (evt.data.ccr.content.isslimwidget) {
                            isSlimWidget = evt.data.ccr.content.isslimwidget;
                        }

                        // if (evt.data.ccr.content.isslimwidget) {
                        //     isSlimWidget = evt.data.ccr.content.isslimwidget;
                        //     if(isSlimWidget == "true" || isSlimWidget == true){
                        //         $("#korahCcrModal").data("state", "min");
                        //         $("#korahCcrModal").modal("hide");
                        //     }
                        // }

                        initChatFrame();
                        break;
                    case "show":
                        $("#korahCcrButton").click();
                        containerFrame.ccrKorahWsClient.dispose();
                        break;
                    case "hide":
                        $("#korahCcrModal").data("state", "min");
                        $("#korahCcrModal").modal("hide");
                        break;
                    case "focuslost":
                        $('#minBtn').filter(':visible').trigger('click');
                        break;
                    case "uiTracker":
                        console.log(evt.data.ccr.content);
                        if ( "string" == typeof hostUrl ) { // proceed only when initChatFrame() is completed.
                            insertCSinfo(evt.data.ccr.content);
                        } else {
                            var runCount = 0;  
                            setTimeout(function() {
                                runCount++;
                                if(runCount > 3){
                                    clearInterval(timerId);
                                }
                                let msg = evt.data;
                                // containerFrame.contentWindow.postMessage(msg, evt.origin);
                                window.postMessage(msg, evt.origin);
                            }, 1000);
                        }
                        // insertCSinfo(evt.data.ccr.content);
                        break;
                    case "sendMsg":
                        console.log(evt.data.ccr.content);
                        break;
                    case "getUsrpageURL":
                        try {
                            var usrpageURL = usrTopPageURL;
                            parentUrl = usrpageURL;

                            let msg = {
                                ccr: {
                                    type: "usrpageURL",
                                    content: {
                                        usrpageURL: usrpageURL
                                    }
                                }
                            };

                            for (var i = 0; i < window.frames.length; i++) {
                                window.frames[i].postMessage(msg, '*');
                            }
                            console.log(evt.data.ccr.content);
                        } catch (e) {
                        }
                        break;
                    default:
                        console.error("Unexpected host message: " + JSON.stringify(evt.data));
                        break;
                }
            }
        }
    }
    if (window.addEventListener) {
        window.addEventListener("message", receiveMessage, false);
        //window.addEventListener("mouseover", receiveMessage, false);
    } else {
        window.attachEvent("onmessage", receiveMessage);
    }

    messager.sendReady();

    //if (containerFrame == null || containerFrame == undefined) {
    //    console.warn("Container frame is undefined.")
    //    return;
    //}
    function initChatFrame() {

        //Read data-attributes from widget dataset
        //var defaultWidth = "370px";
        //var defaultHeight = "700px";
        //orgId = Utils.getUrlParameter("ccrOrgId", window.parent.location.href) || containerFrame.dataset.orgid;
        //orgId = containerFrame.dataset.orgid;

        if(containerFrame.rsp == null){
            orgId = containerFrame.dataset.orgid;
            parentUrl = containerFrame.dataset.parenturl;
        }
        else if(containerFrame.rsp.msg.length < 36){
            orgId = containerFrame.dataset.orgid;
            parentUrl = containerFrame.dataset.parenturl;
        }
        else{
            orgId = containerFrame.rsp.msg;
            parentUrl = containerFrame.dataset.parenturl;
        }

        hostUrl = containerFrame.dataset.hosturl;
        termsLinkUrl = containerFrame.dataset.termslinkurl;
        ccrChatPhpUrl = containerFrame.dataset.ccrchatphpurl;
        ccrChatInitInt = containerFrame.dataset.ccrchatinitint;
        //var chatTitle = containerFrame.dataset.chattitle;
        containerHeight = containerFrame.dataset.btnheight;
        containerWidth = containerFrame.dataset.btnwidth;
        showMsgTimeOut = containerFrame.dataset.showmsgtimeout;
        hideMsgTimeOut = containerFrame.dataset.hidemsgtimeout;
        isShowMinBtn = Utils.parseBoolean(containerFrame.dataset.isshowminbtn);
        isShowResizeBtn = Utils.parseBoolean(containerFrame.dataset.isshowresizebtn);
        isShowCloseBtn = Utils.parseBoolean(containerFrame.dataset.isshowclosebtn);
        isShowConfirmationOnClose = Utils.parseBoolean(containerFrame.dataset.isshowconfirmationonclose);
        isClntAuthRq = Utils.parseBoolean(containerFrame.dataset.isclntauthrq);
        isPrivateInfoAllowed = Utils.parseBoolean(containerFrame.dataset.isprivateinfoallowed);
        isAutoPopup = Utils.parseBoolean(containerFrame.dataset.isautopopup);
        isAutoShowConversation = Utils.parseBoolean(containerFrame.dataset.isautoshowconversation);
        headerStartIndex = Utils.parseHeaderIndex(containerFrame.dataset.startheaderindex);
        usrTopPageURL = containerFrame.dataset.usrTopPageURL;
        ccrChatHeaderStartIndex = headerStartIndex;
        locale = containerFrame.dataset.lang || "en";
        sR = containerFrame.dataset.sR || "true";

        bodyPaddingRight = 0;
        containerRight = null;
        containerBottom = null;
        //containerFrame.setAttribute("title", chatTitle);
        isShowingUsrInfoModal = (isClntAuthRq === false && isPrivateInfoAllowed === true);
        isChatFrameHasSrc = false;
        isModalShown = false;
        isEndChatClicked = false;

        /*
        parentPageQueryString = window.parent.document.location.search;
        if (parentPageQueryString) {
                parentPageQueryString = window.parent.document.location.search.replace("?", "&");
        }
        */

        //This URL is updated by the updateHtmlHeadingIndexes function
        // ccRChatUrl = hostUrl + "ccrChat/" + ccrChatPhpUrl + "?bgColor=transparent&orgId=" + orgId + "&isShowUsrModal=" + isShowingUsrInfoModal + "&lang=" + locale + "&headerStartIndex=" + ccrChatHeaderStartIndex;// + parentPageQueryString;
        isIe = false;

        //var appendHash = window.parent.document.location.hash;

        $.ajax({
                url: hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale." + orgId + ".js",
                // type: "HEAD"
        }).done(function (data, textStatus, jqXHR) {
                console.log(
                    "loading " + hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale." + orgId + ".js",
                    data
                );
                if ( "string" == typeof data && 0 < data.length && "undefined" == typeof ccrResources ) {
                    eval( data ); // initialize variable ccrResources
                }
                if ( "undefined" == typeof ccrResources ) {
                    $("<script></script>", {
                        src: hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale." + orgId + ".js"
                    }).appendTo("head");
                }
        }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error(
                    "loading " + hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale." + orgId + ".js",
                    data
                );
                $("<script></script>", {
                        src: hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale.js"
                }).appendTo("head");
        }).always(function (data, textStatus, errorThrown) {
                console.log(
                    "loading " + hostUrl + "ccr-btn-sdk/ccrBtn/js/i18Locale." + orgId + ".js",
                    textStatus
                );
                main();
                showConversation();
                if (showMsgTimeOut > 0) {
                        setTimeout(
                                function () {
                                        showNoticeMsgAndResizeContainer();
                                        setTimeout(
                                                function () {
                                                        hideNoticeMsgAndResizeContainer();
                                                },
                                                hideMsgTimeOut);
                                },
                                showMsgTimeOut);
                }
        });

        $('<link rel="stylesheet" href="css/ccrBtn.' + orgId + '.css" />').appendTo("head");

                                                                                        // B20200404whp
        // Patch third party cookie issue.
        var cookieCheck = new ThirdPartyCookiePatch(hostUrl);
        cookieCheck.cookiesEnabled(function() {


        }, function() {

            var lsAdapter = new LSAdapter(window.parent, orgId + "", "frame1");
            var cookieJar = new LSAdapter(window.parent, orgId + "_", "frame1");

            var lsLoaded = false;
            var cookiesLoaded = false;

            lsAdapter.onLoad = function () {
                lsLoaded = true;
                console.log("storage adapter init");
                if(cookiesLoaded && lsLoaded) {
                    onStorageAdapterRestore();
                }
            }
            cookieJar.onLoad = function () {
                cookiesLoaded = true;
                console.log("cookiejar init");
                if(cookiesLoaded && lsLoaded) {
                    onStorageAdapterRestore();
                }
            }

            function onStorageAdapterRestore() {
                setThirdPartyCookieMode(lsAdapter, cookieJar);

                var cookieInput = document.createElement("input");
                cookieInput.type = "text";
                cookieInput.name = "cookiejar";
                $('#korahCcrChatForm').append(cookieInput);
                $('#korahCcrChatForm').submit(function() {
                    cookieInput.value = JSON.stringify(cookieJar.dump());
                    return true;
                });

                $("#korahCcrButton").show();
                $("#korahThirdPartyCcrButton").hide();
            }

            lsAdapter.init();
            cookieJar.init();

        });

    }

    function registerPushDevice( sub ){
        var csId = localStorage.getItem(orgId + ".csKey");
        if(csId != null){
            $.ajax({
                url: hostUrl + 'registerCsPushDevice.php',
                type: 'POST',
                data: {
                    'subscription': JSON.stringify(sub),
                    'csId': csId
                },
                error: function (response) {
                    console.log(response);

                },
                success: function (response) {
                    console.log(response);
                }
            });

        }
    }

    function insertCSinfo( content ){
        var csKey = localStorage.getItem(orgId + ".csKey");
        var wsUrl = localStorage.getItem(orgId + ".wsUrl");
        var token = localStorage.getItem(content.orgId + ".token");
        if(csKey == null){
            $.ajax({
                url: hostUrl + 'insertUsrProfile.php',
                type: 'POST',
                data: {
                    'orgId': content.orgId,
                    'usrLatitude': content.usrLatitude,
                    'usrLongitude': content.usrLongitude,
                    'usrpageURL': content.usrpageURL,
                    'usrRemeGeo': content.usrRemeGeo,
                    'token': token
                },
                error: function (response) {
                    console.log(response);

                },
                success: function (response) {
                    localStorage.setItem(orgId + ".csKey", response.cskey);
                    messager.sendcsKey(response.cskey);

                    if (PushClient.hasPushSupport()) {
                        if (PushClient.hasPermission()) {
                            PushClient.getPushSubscription().then(function(sub) {
                                // PushView.getPushStatus(sub);
                                registerPushDevice(sub);
                                console.log(sub);
                            });
                        } else if (PushClient.isDenied()) {
                            // PushView.showPushDenied();
                            console.log('showPushDenied');
                        } else {
                            // PushView.showPushDisabled();
                            console.log('showPushDisabled');
                            // $("#pushToggle").off(clickOrTouch);
                            $("#pushToggle").click(function () {
                                PushClient.requestPushPermission().then(function(result) {
                                    if (PushClient.hasPermission()) {
                                        PushClient.getPushSubscription().then(function(sub) {
                                            // PushView.enablePushDevice(sub);
                                            registerPushDevice(sub);
                                            console.log(sub);
                                        });
                                    } else {
                                        // PushView.showPushDenied();
                                        console.log('showPushDenied');
                                    }
                                });
                            });
                        }
                    }

                    wsUrl = response.wsUrl;

                    localStorage.setItem(orgId + ".wsUrl", wsUrl);

                    if (!containerFrame.ccrKorahWsClient) {
                        containerFrame.ccrKorahWsClient = new ccrKorahWsClient();
                    } else {
                        containerFrame.ccrKorahWsClient.dispose();
                    }

                    var data = {
                        msgType: containerFrame.ccrKorahWsClient.MSG_TYPE_CLIENT_CLIENT_SIDE_INIT_CONNECTION,
                        sid: response.csId,
                        orgId: orgId
                    }

                    containerFrame.ccrKorahWsClient.init(wsUrl, data, widgetCnsWsConnCallback, noticeUpdate);

                }
            });

        }
        else{

            $.ajax({
                url: hostUrl + 'insertNoteArchive.php',
                type: 'POST',
                data: {
                    'orgId': content.orgId,
                    'usrLatitude': content.usrLatitude,
                    'usrLongitude': content.usrLongitude,
                    'usrpageURL': content.usrpageURL,
                    'usrRemeGeo': content.usrRemeGeo,
                    'csKey': csKey,
                    'token': token
                },
                error: function (response) {
                    console.log(response);

                },
                success: function (response) {
                    console.log(response);

                }
            });

            messager.sendcsKey(csKey);

            if (PushClient.hasPushSupport()) {
                if (PushClient.hasPermission()) {
                    PushClient.getPushSubscription().then(function(sub) {
                        // PushView.getPushStatus(sub);
                        registerPushDevice(sub);
                        console.log(sub);
                    });
                } else if (PushClient.isDenied()) {
                    // PushView.showPushDenied();
                    console.log('showPushDenied');
                } else {
                    // PushView.showPushDisabled();
                    console.log('showPushDisabled');
                    // $("#pushToggle").off(clickOrTouch);
                    $("#pushToggle").click(function () {
                        PushClient.requestPushPermission().then(function(result) {
                            if (PushClient.hasPermission()) {
                                PushClient.getPushSubscription().then(function(sub) {
                                    // PushView.enablePushDevice(sub);
                                    registerPushDevice(sub);
                                    console.log(sub);
                                });
                            } else {
                                // PushView.showPushDenied();
                                console.log('showPushDenied');
                            }
                        });
                    });
                }
            }

            if (!containerFrame.ccrKorahWsClient) {
                containerFrame.ccrKorahWsClient = new ccrKorahWsClient();
            } else {
                containerFrame.ccrKorahWsClient.dispose();
            }

            var data = {
                msgType: containerFrame.ccrKorahWsClient.MSG_TYPE_CLIENT_CLIENT_SIDE_INIT_CONNECTION,
                sid: csKey,
                orgId: orgId
            }

            if(wsUrl){
                containerFrame.ccrKorahWsClient.init(wsUrl, data, widgetCnsWsConnCallback, noticeUpdate);
            }
        }
    }

    function widgetCnsWsConnCallback(isWebSocketConnected) {
        console.log(isWebSocketConnected);

    }

    function noticeUpdate(jsonData) {

        if(jsonData.msgType == 20){
            localStorage.removeItem(orgId + ".csKey");
        }

        if ( "string" == typeof jsonData.msg && 0 < jsonData.msg.length ) {            showNoticeMsgAndResizeContainer(jsonData.msg);
            setTimeout(
                function () {
                    hideNoticeMsgAndResizeContainer();
                },
                hideMsgTimeOut
            );
        }
    }

    function makeFName() {
        var fNameLst = ["Dale", "Teresa", "Terri", "Beatrice", "Darcie", "Emilia", "Cora", "Kye", "Cleo", "Bethan",
            "Robbie", "Frances", "Franki", "Sofia", "Saffi", "Violet", "Annie", "Terry", "Tess", "Amira",
            "Claudia", "Edie", "Hafsa", "Joanne", "Joann", "Heather", "Lisa", "Ana", "Erica", "Bethany",
            "Mariam", "Mitzi", "Jodie", "Alana", "Madeline", "Keira", "Fatima", "Annabelle", "Alfie", "Melanie", "Zoe",
            "Marie", "Jay", "Jasmine", "Iqra", "Ellis", "Morgan", "Karen", "Karie", "Barbara", "Robin",
            "Lillian", "Lili", "Martha", "Ellen", "Ellia", "Georgie", "Heidi", "Addie", "Rowan", "Katie",
            "Katya", "Elise", "Alexa", "Alex", "Harley", "Grace", "Sandra", "Shura", "Maryam", "Mitzi",
            "Holly", "Molly", "Serena", "Natasha", "Tassa", "Kathleen", "Kathy", "Veronica", "Elsie", "Maisie",
            "Maja", "Nora", "Hanna", "Roxanne", "Emmie", "Orla", "Zaynab", "Erika", "Carys", "Florence",
            "Tyler", "Nancy", "Khadijah", "Daniella", "Dannelle", "Abbie", "Aliyah", "Isabelle", "Alexia", "Alex",
            "Nannie", "India", "Isobel", "Evelyn", "Eila", "Elizabeth", "Liz", "Neve", "Nettie", "Naomi",
            "Lucy", "Lulu", "Christine", "Chrissy", "Danielle", "Danylynn", "Alina", "Genevieve", "Theresa", "Stella",
            "Tabitha", "Felix", "Jerry", "Stephen", "Ming", "Ning", "Alan", "Leo"
        ];
        return "~" + fNameLst[Math.floor(Math.random() * fNameLst.length)];
    }

    function makeLName() {
        var lNameLst = ["Bennett", "Campos", "Sanchez", "Jacobs", "Fuentes", "Long", "Strickland", "Mitchell",
            "Adam", "Rice", "Summers", "Vargas", "Garcia", "Byrd", "Kumar", "Copeland", "Mullins",
            "Reynolds", "Sutton", "Carpenter", "Sherman", "Figueroa", "Washington", "Ellis", "Robertson",
            "Watkins", "West", "Stone", "Hughes", "Wood", "Peterson", "Perez", "Hampton", "Banks", "Pratt",
            "Douglas", "Newton", "Elliott", "O'Reilly", "Thorne", "Wong", "Brooks", "Bryant", "Zimmerman",
            "Willis", "Schneider", "Blair", "Salazar", "Manning", "Holland", "Dixon", "Rhodes", "Thomas", "Robbins",
            "Medina", "Thompson", "Mckinney", "Mccarthy", "Ferguson", "Oliver", "Schroeder", "Little", "Espinoza",
            "Simpson", "Fox", "Ashton", "Graves", "Parks", "Stewart", "Hawkins", "Mcdonald", "Wells", "Ruiz", "Scott",
            "Benson", "Schofield", "King", "Kent", "Griffiths", "Gomez", "Mills", "Sims", "Jimenez", "Bowen", "Brady",
            "Watson", "Brown", "James", "Harper", "Hamilton", "Henderson", "Richardson", "Davidson",
            "Poon", "Chan", "Chen", "Lee", "Cheung", "Zhang", "Wong", "Wang", "To", "Ho"
        ];
        return "~" + lNameLst[Math.floor(Math.random() * lNameLst.length)];
    }

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    // put document ready functions here
    async function main() {

        if ( "object" != typeof ccrResources || null == ccrResources ) {
            let delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(100); // wait till i18 resources are completely loaded.
        }

        if (isShowMinBtn === false) {
            $("#minBtn").remove();
        }

        if (isShowResizeBtn === false) {
            $("#maxBtn").remove();
        }

        if (isShowCloseBtn === false) {
            $("#closeBtn").remove();
        }

        if (isClntAuthRq === false) {
            $("input#id_token").remove();
        }

        updateHtmlHeadingIndexes(headerStartIndex);

        // call server to for engagement report
        usrEngagementCall('LOAD');
        if ( "object" == typeof containerFrame.ccrResources && containerFrame.ccrResources) {
            ccrResources = containerFrame.ccrResources;
        }
        if ( "object" != typeof ccrResources || null == ccrResources ) {
            ccrResources = {}; // so that we are NOT killed.
        }
        i18n.init({
            "lng": locale,
            "resStore": ccrResources,
            "fallbackLng": ((ccrResources && typeof ccrResources == "object" && Object.keys(ccrResources).length > 0) ?
                Object.keys(ccrResources)[0] :
                "INVALID_LOCALE")
        }, function (t) {
            $(document).i18n();
        });

        var lang = ccrResources[locale] ? locale : (Object.keys(ccrResources).length > 0 ? Object.keys(ccrResources)[0] : "INVALID_LOCALE");
        if (!ccrResources[lang] || !ccrResources[lang].translation || !ccrResources[lang].translation.NoPersonalInfo || ccrResources[lang].translation.NoPersonalInfo == "") {
            $("[data-i18n=NoPersonalInfo]").css({display: "none"});
        }
        if (!ccrResources[lang] || !ccrResources[lang].translation || !ccrResources[lang].translation.TermsOfUse || ccrResources[lang].translation.TermsOfUse == "") {
            $("[data-i18n=TermsOfUse]").css({display: "none"});

        }
        if (!ccrResources[lang] || !ccrResources[lang].translation || !ccrResources[lang].translation.poweredby || ccrResources[lang].translation.poweredby == "") {
            $("#poweredby").css({display: "none"});
        }

        $("html").attr("lang", locale);
        $("#korahCcrButton").addClass(locale);
        $("#korahCcrModalImg").addClass(locale);

        if (typeof termsLinkUrl == "string") {
            $("#termsLink").attr("href", termsLinkUrl);
        }

        //MH: We should not change parent page title.
        // if (window.parent && window.parent.document && document.title) {
        //     window.parent.document.title = document.title
        // }

        var bodyPaddingRight = $('body').css('padding-right');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("#korahCcrModal").addClass("mobile");
        } else {
            /* The main logic of our widget */
            $("#korahCcrModal").draggable({
                handle: ".modal-header",
                containment: "window"
            });
        }

        // dect if broswer is internet explore
        //isIe = detectIE();
        isIe = true;
        if (isIe) {
            $(".headerBtnIcon.img").show();
        } else {
            $(".headerBtnIcon.svg").show();
        }
        $(".headerBtnIcon.normal").hide();
        //$(window).resize(function () {
        //    var modal = $("#korahCcrModal");
        //    if (!modal.hasClass("mobile")) {
        //        var height = $(this).height();
        //        var modalHeight = modal.height();
        //        if (modalHeight == height) {
        //            modal.draggable({ disabled: true });
        //        } else {
        //            /* The main logic of our widget */
        //            modal.draggable({
        //                handle: ".modal-header",
        //                disabled: false,
        //                scroll: false
        //            });
        //        }
        //        var modalTop = parseInt(modal.css("top"));
        //        if (modalTop < 0) {
        //            modal.css("top", "0px");
        //        }
        //        if ((modalHeight + modalTop) > height) {
        //            modal.css("top", (height - modalHeight) + 'px');
        //        }
        //        var width = $(this).width();
        //        var modalWidth = modal.width();
        //        if ((modalWidth + parseInt(modal.css("left"))) > width) {
        //            modal.css("left", (width - modalWidth) + 'px');
        //        }
        //    }
        //});

        //CcrChat Modal onShow
        $('#korahCcrModal').on('show.bs.modal', function () {
            // if(isSlimWidget == false){
                //This hideNoticeMsgAndResizeContainer() need to be called before any resizing containerFrame logic. Otherwise your logic will be overwritten by hideNoticeMsg()
                hideNoticeMsgAndResizeContainer();
                try {
                    if(isAutoShowConversation){
                        localStorage.setItem(orgId + ".korahlimitedOpen", true);
                    }
                } catch (e) {
                    // This exception can be triggered by 3rd party cookie disabled, no need to handle it for now
                }
                //window.parent.document.getElementById("korahCcrChatContainer").classList.add("openedChatframe");
                containerFrame.style.bottom = '10px';
                containerFrame.style.right = '10px';
                var body = $("body");
                if ($(this).hasClass("mobile")) {
                    body.css("position", "fixed").css("width", "100%");
                    containerFrame.style.width = "100%";
                    containerFrame.style.height = "100%";
                    $("#maxBtn").hide();
                } else {
                    containerFrame.style.width = containerFrame.defaults.width;
                    //containerFrame.style.height = "calc(75% - 0.5px)";
                    containerFrame.style.height = containerFrame.defaults.height;
                    var iconBtnType = (true == isIe) ? ".img" : ".svg";
                    $(".normal").hide();
                    $(".fullscreen").show();
                    $("#maxBtn").attr("aria-label", i18n.translate("MaxChat"));
                    setTimeout(function () {
                        body.removeClass("modal-open")
                            .css('padding-right', bodyPaddingRight)
                    }, 0.1);
                    if ($(this).height() == $(window).height()) {
                        $(this).draggable({
                            disabled: true
                        });
                    } else {
                        /* The main logic of our widget */
                        $(this).draggable({
                            handle: ".modal-header",
                            disabled: false
                        });
                    }
                }

                // if(isSlimWidget == "true" || isSlimWidget == true){
                //     $("#korahCcrModal").data("state", "min");
                //     $("#korahCcrModal").modal("hide");
                // }else{
                    messager.sendShow();

                    var korahCcrBtn = $('button#korahCcrButton');
                    korahCcrBtn.hide();
                    //var url = korahCcrBtn.data('ccr-popup-url');
                    var title = korahCcrBtn.data('ccr-popup-title');
                    $(this).find(".modal-header h4.modal-title").text(title).attr("title", title);
                    isModalShown = true;
                // }


            // }


        }).on('hidden.bs.modal', function (e) {
            if ($("#korahCcrModal").data("state") == "min") {
                $("#statusMessage").text(i18n.translate("chatDialogMinimized"));
            } else {
                $("#statusMessage").text(i18n.translate("chatDialogClosed"));
            }

            console.log($("#statusMessage").text());
            try {
                localStorage.setItem(orgId + ".korahlimitedOpen", false);
            } catch (e) {
                // This exception can be triggered by 3rd party cookie disabled, no need to handle it for now
            }
            //window.parent.document.getElementById("korahCcrChatContainer").classList.remove("openedChatframe");
            containerFrame.style.height = containerHeight;
            containerFrame.style.width = containerWidth;
            containerFrame.style.bottom = containerBottom;
            containerFrame.style.right = containerRight;

            messager.sendHidden();

            $('button#korahCcrButton').show();
            var body = $("body");
            if (!$(this).hasClass("mobile")) {
                body.css('padding-right', bodyPaddingRight);
            }
            body.css("position", "")
                .css("width", "");

            showCloseModalConfirmation(false);
        }).on('shown.bs.modal', function() {
            $("#statusMessage").text(i18n.translate("chatDialogOpened"));
            console.log($("#statusMessage").text());
            //detect the first tabbable element and set keydown event to detect shift tab and post to child iframe
            //MH: Can't use keypress event here because it doesn't catch tab key
            $(":tabbable", document).first().off("keydown").keydown(function (e) {
                try {
                    if (e.keyCode == 9 && e.shiftKey) {
                        console.log("Shift tab key pressed");

                        if ($(".modal-footer:visible").length == 0 || $(':tabbable', $(".modal-footer:visible")).length == 0) {
                            e.preventDefault();
                            for (var i = 0; i < window.frames.length; i++) {
                                window.frames[i].postMessage('shiftTab', '*');
                            }
                        } else {
                            e.preventDefault();
                            $(':tabbable', $(".modal-footer:visible")).last().focus();
                        }

                    }
                } catch (ex) {
                    console.warn(ex);
                }
            });

            //detect the first tabbable element and set keydown event to detect shift tab and post to child iframe
            $(':tabbable', $(".modal-footer:visible")).last().off("keydown").keydown(function (e) {
                try {
                    // SHIFT + TAB key
                    if (e.keyCode == 9 && e.shiftKey) {
                        console.log("Shift tab key pressed");
                        e.preventDefault();
                        for (var i = 0; i < window.frames.length; i++) {
                            window.frames[i].postMessage('shiftTab', '*');
                        }
                        // TAB
                    } else if (e.keyCode == 9) {
                        // if (!navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) {
                        //     e.preventDefault();
                        // }
                        e.preventDefault();
                        $(':tabbable').first().focus();
                    }
                } catch (ex) {
                    console.warn(ex);
                }
            });

            showModal();
            
            // if(isSlimWidget == "true" || isSlimWidget == true){
            //     $("#korahCcrModal").data("state", "min");
            //     $("#korahCcrModal").modal("hide");
            // }

        });

        function showModal() {                                                  // whp
            var korahCcrBtn = $('button#korahCcrButton');
            //var url = korahCcrBtn.data('ccr-popup-url');
            var url = ccRChatUrl;
            var title = korahCcrBtn.data('ccr-popup-title');
            var hiddenForm = $('#korahCcrChatForm');
            hiddenForm.attr("action", ccRChatUrl);
            if (isShowingUsrInfoModal == true) {
                // No need to submit form here
            } else {
                if (true == isClntAuthRq) {
                    try {
                        var profileStr = containerFrame.profile;
                        if (profileStr) {
                            var profile = JSON.parse(profileStr);

                            let propMap = {
                                "email": "usrEmail",
                                "given_name": "usrFName",
                                "family_name": "usrLName",
                                "phone": "usrPhone"
                            };
                            for ( const prop in profile ) {
                                if ( Object.prototype.hasOwnProperty.call(profile, prop) ) {
                                    if ( "string" == typeof propMap[ prop ] ) {
                                        $(hiddenForm).find("input[name='" + propMap[ prop ] + "']").val( profile[prop] );
                                    } else if ( "object" == typeof profile[ prop ] && "user_metadata" == prop ) {
                                        for ( const metaprop in profile[ prop ] ) {
                                            if (Object.prototype.hasOwnProperty.call(profile[ prop ], metaprop)) {
                                                if ( "string" == typeof propMap[ metaprop ] ) {
                                                    $(hiddenForm).find("input[name='" + propMap[ metaprop ] + "']").val( profile[prop][metaprop] );
                                                } else {
                                                    if ( 0 == $(hiddenForm).find("input[name='" + metaprop + "']").length ) {
                                                        $(hiddenForm).append("<input type='text' name='" + metaprop + "' />");
                                                    }
                                                    $(hiddenForm).find("input[name='" + metaprop + "']").val( profile[prop][metaprop] );
                                                }
                                            }
                                        }
                                    } else {
                                        if ( 0 == $(hiddenForm).find("input[name='" + prop + "']").length ) {
                                            $(hiddenForm).append("<input type='text' name='" + prop + "' />");
                                        }
                                        $(hiddenForm).find("input[name='" + prop + "']").val( profile[prop] );
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        var jwt_id_token = localStorage.getItem('jwt'); // 20180412000whp
                        if (jwt_id_token) {
                            $(hiddenForm).find("input[name='id_token']").val(jwt_id_token); // 20180412000whp
                        }
                    } catch (e) {
                        // This exception can be triggered by 3rd party cookie disabled, no need to handle it for now
                    }

                } else {
                    // Generate random id to login
                    $(hiddenForm).find("input[name='usrFName']").val(makeFName());
                    $(hiddenForm).find("input[name='usrLName']").val(makeLName());
                    $(hiddenForm).find("input[name='usrEmail']").val(makeid() + "@internet.com");
                    $(hiddenForm).find("input[name='usrPhone']").val(makeid());
                }
            }
            if (!isChatFrameHasSrc || isEndChatClicked === true
                    || true == $('#korahCcrChatForm').attr("target").startsWith( "_onlyBlank" )) {
                $("#korahCcrChatForm").submit();
                isChatFrameHasSrc = true;
                isEndChatClicked = false;
            }
        }                                                                               // E20200404whp

        containerFrame.style.width = containerWidth;
        containerFrame.style.height = containerHeight;
        containerFrame.style.display = "block";
        containerFrame.style.visibility = "visible";
        containerBottom = containerFrame.defaults.bottom;
        containerRight = containerFrame.defaults.right;
        //var newUrl = ccRChatUrl + orgId + parentPageQueryString;

        messager.sendStart();

        $("#korahCcrChatForm").attr("action", ccRChatUrl);
        //$("#korahCcrChatContainer").attr("title", chatTitle);

        //$("#korahCcrChat").attr("src", newUrl);

        $("#korahCcrButton")
            //.data('ccr-popup-url', newUrl)
            //.data('ccr-popup-title', chatTitle)
            .css('width', containerFrame.style.width)
            .css('height', containerFrame.style.height)
            .click(function () {
                // call server to for engagement report
                usrEngagementCall('CLICK');
                                                                                        // B20200404ingwhp
                if ( false == $('#korahCcrChatForm').attr("target").startsWith( "_onlyBlank" ) ) {
                    $('#korahCcrModal').modal({
                        backdrop: false,
                        'toggle': true
                    });

                    $("#korahCcrModal").modal('show');

                    if(isSlimWidget == "true" || isSlimWidget == true){
                        $("#korahCcrModal").modal("hide");
                    }
                } else {
                    showModal();
                }                                                                       // E20200404whp
            })
            .css('display', 'inline');

        $('#closeKorahCcrNotice').click(function () {
            hideNoticeMsgAndResizeContainer();
        });
        $('#closeKorahCcrNotice').on("keypress", function (e) {
            if (e.keyCode === 13) {
                hideNoticeMsgAndResizeContainer();
            }
        });

        $('#minBtn').click(function () {
            $("#korahCcrModal").data("state", "min");
            $("#korahCcrModal").modal("hide");
        });

        $('#closeBtn').click(function () {
            if (isShowConfirmationOnClose == true) {
                if ( false == $('#alertNotice .alert').is(":visible") ) {
                    showCloseModalConfirmation(isShowConfirmationOnClose, false);
                } else {
                    $('#alertNotice .alert').fadeOut()
                }
            } else {
                isEndChatClicked = true;
                $("#korahCcrModal").data("state", "close");
                $("#korahCcrModal").modal("hide");
                refreshIframeSrc();
            }
        });
        $('#maxBtn').click(function () {
            var iconBtnType = (true == isIe) ? ".img" : ".svg";
            var fullscreenIcon = $(this).find(".fullscreen");
            var normalScreenIcon = $(this).find(".normal");
            var modal = $('#korahCcrModal');
            if (containerFrame.style.width !== "100%") {
                // maximize the out iframe
                containerFrame.style.width = "100%";
                containerFrame.style.height = "100%";
                fullscreenIcon.hide();
                normalScreenIcon.show();
                $(this).attr("aria-label", i18n.translate("RestoreChat"));
            } else {
                // minimize to normal size
                containerFrame.style.width = containerFrame.defaults.width;
                containerFrame.style.height = containerFrame.defaults.height;
                fullscreenIcon.show();
                normalScreenIcon.hide();
                $(this).attr("aria-label", i18n.translate("MaxChat"));
            }
            messager.sendResize();
        });

        $(document).on('click', '#closeModal', function () {
            showCloseModalConfirmation(false, true);
            isEndChatClicked = true;
            refreshIframeSrc();
        });

        $(document).on('click', '#downloadModal', function() {
            console.log('Helloll');
            for (var i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage('downloadConversationForWidget', '*');
            }
        })

        $(document).on('keydown', '#goToInput', function (e) {
            if (e.keyCode == 13) {
                for (var i = 0; i < window.frames.length; i++) {
                    window.frames[i].postMessage("gotoInput", '*');
                }
            }
        });

        $(document).on('click', '#goToInput', function (e) {
            for (var i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage("gotoInput", '*');
            }
        });

        // $('#goToInput').on('focus', function () {
        //     $(this).parent().css('opacity', '1');
        //     $(this).text(i18n.translate("goToInput"));
        // }).on('blur', function () {
        //     $(this).parent().css('opacity', '0');
        //     $(this).text("");
        // });

        // $('#goToInput').on('focus', function () {
        //     $(this).css('z-index', '99999');
        //     $(this).text(i18n.translate("goToInput"));
        // }).on('blur', function () {
        //     $(this).css('z-index', '-1');
        //     $(this).text("");
        // });

        $(document).mouseup(function (e) {
            var alertBox = $('#alertNotice .alert');
            var closeBtn = $('#closeBtn');
            // if the target of the click isn't the container nor a descendant of the container
            if (!alertBox.is(e.target) && alertBox.has(e.target).length === 0 && !closeBtn.is(e.target) && closeBtn.has(e.target).length === 0) {
                showCloseModalConfirmation(false);
            }
        });

        function focusNextEle(evt) {
            if (evt.data === "tab") {
                console.log("Received " + evt.data + " from " + evt.origin);
                for (var i = 0; i < window.frames.length; i++) {
                    window.frames[i].blur();
                }
                // MH Important: This is the key to make tab work from child iframe to parent page in FireFox.
                $("*").blur();
                // Check if footer is visible
                if ($(".modal-footer:visible").length == 0 || $(':tabbable', $(".modal-footer:visible")).length == 0) {
                    console.log("tab to minimize button.");
                    $(':tabbable').first().blur().focus();
                } else {
                    console.log("Tab to terms link");
                    $(':tabbable', $(".modal-footer:visible")).first().blur().focus();
                }
            }
        }
                /*
        if (window.addEventListener) {
            window.addEventListener("message", focusNextEle, false);
        } else {
            window.attachEvent("onmessage", focusNextEle);
        }
                */
        function showCloseModalConfirmation(isShow, isCloseModal) {
            if (typeof isCloseModal != "boolean" || isCloseModal !== true) {
                isCloseModal = false;
            }

            if (typeof isShow != "boolean" || isShow !== false) {
                isShow = true;
            }
            var alertBox = $('#alertNotice .alert');
            if (alertBox && alertBox.length > 0) {
                //alertBox = alertBox[0];
                if (true == isShow) {
                    alertBox.removeClass('alert-success alert-info alert-warning alert-danger row').addClass('alert-warning row').find('div').remove();

                    alertBox.append('<div class="row" style="margin-left: 0%;"><div id="closeModal" class="container col-6" style="padding: 5px 2px 5px 5px;">' +
                        '       <button class="btn btn-warning col-12" data-i18n="confirmationEnd" data-dismiss="modal"> ' + i18n.translate("confirmationEnd") + '<span data-i18n="confirmationEndTitle" class="visually-hidden">' + i18n.translate("confirmationEndTitle") + '</span></button>' +
                        '</div>' +
                        '<div id="downloadModal" class="container col-6" style="padding: 5px 2px 5px 2px;">' +
                        '   <button class="btn btn-success col-12" data-i18n="confirmationDownload">' + i18n.translate("confirmationDownload") + '<span date-i18n="confirmationDownloadTitle" class="visually-hidden">' + i18n.translate("confirmationDownloadTitle") + '</span></button>' +
                        '</div></div>'
                    //  +
                    //  '<div class="container col-xs-4" style="padding: 5px 5px 5px 2px;">' +
                    //  '       <button id="cancelConfirmation" class="btn btn-success col-xs-12" data-i18n="confirmationCancel">' + i18n.translate("confirmationCancel") + '<span data-i18n="confirmationCancelTitle" class="sr-only">' + i18n.translate("confirmationCancelTitle") + '</span></button>' +
                    //  '</div>'
                    ).fadeIn();
                    $("#cancelConfirmation").click(function () {
                        $('#alertNotice .alert').fadeOut();
                    })
                } else {
                    alertBox.fadeOut();
                    if (isCloseModal === true) {
                        $("#korahCcrModal").data("state", "close");
                        $("#korahCcrModal").modal("hide");
                    }
                }
            }
        }
    }

    function updateHtmlHeadingIndexes(startIndex) {
        let headingTags = $(":header");
        for (let i = 0; i < headingTags.length; i++) {
            try {

                let curIndex = parseInt($(headingTags[i]).prop("tagName").match(/H(\d)/)[1]);
                let newIndex = Utils.parseHeaderIndex(curIndex + startIndex - 1);
                let newTagName = "<h" + newIndex + ">";
                replaceHtmlTag($(headingTags[i]), newTagName);
            } catch (e) {
                console.error(e);
            }
        }
        ccrChatHeaderStartIndex = Utils.parseHeaderIndex(parseInt($("#korahCcrModalTitle").prop("tagName").match(/H(\d)/)[1]) + 1);
        ccRChatUrl = hostUrl + "ccrChat/" + ccrChatPhpUrl
                   + ( 0 > ccrChatPhpUrl.indexOf( "?" ) ? "?" : "&" )
                   +  "sR=" + sR
                   + ( "string" == typeof ccrChatInitInt && 0 < ccrChatInitInt.length
                       ? "&initInt=" + ccrChatInitInt
                       : ""
                     )
                   + "&orgId=" + orgId
                   + "&isShowUsrModal=" + isShowingUsrInfoModal
                   + "&lang=" + locale
                   + "&headerStartIndex=" + ccrChatHeaderStartIndex; //+ parentPageQueryString;
    }

    function replaceHtmlTag(sourceEle, destTagName) {
        if (/^<\w+>$/.test(destTagName) === false) {
            destTagName = "<" + destTagName + ">";
        }

        sourceEle.replaceWith(function () {
            let curHtml = $(this).html();
            let tempEle = $(destTagName, {
                html: curHtml
            });

            let attrs = $(this).prop("attributes");

            for (let i = 0; i < attrs.length; i++) {
                tempEle.attr(attrs[i].name, attrs[i].value);
            }

            return tempEle;
        })
    }


    function showConversation() {

        var isChatFrameOpened = false;
        try {
            isChatFrameOpened = Utils.parseBoolean(localStorage.getItem(orgId + ".korahlimitedOpen"));
            //isChatFrameOpened = !(typeof isChatFrameOpened != "undefined" && isChatFrameOpened != null && isChatFrameOpened == "false");
        } catch (e) {
            console.warn(e);
        }
        if (isAutoPopup || isChatFrameOpened) {
            $("#korahCcrButton").click();
        }
    }

    function setCookie(cname, cvalue, expireMillisec) {
        var isSecure = window.location.protocol == "https:";
        if (expireMillisec) {
            var d = new Date();
            d.setTime(d.getTime() + expireMillisec);
            var expires = "expires=" + d.toUTCString();
            document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + ";path=/;SameSite=None;" + (isSecure ? "Secure;" : "") + expires;
        } else {
            document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + ";path=/;SameSite=None" + (isSecure ? ";Secure" : "");
        }
    }

    function getCookie(cname) {
        var name = cname + "=";

        //var decodedCookie = decodeURIComponent(document.cookie);
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = decodeURIComponent(ca[i]);
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setThirdPartyCookieMode(lsAdapter, cookieJar) {

        window.cookieJar = cookieJar;

        Object.defineProperty(window, "localStorage", {
            get: function () {
                return lsAdapter;
            }
        });

        $(document).ajaxSend(function (event, jqxhr, settings) {

            if(settings.type.toUpperCase() == "POST") {
                switch(typeof settings.data) {
                    case "string":
                        // if (settings.contentType == "application/json") {
                        if ( true == settings.contentType.startsWith("application/json") ) {
                            var postData = JSON.parse(settings.data);
                            if(postData) {
                                postData.cookiejar = JSON.stringify(cookieJar.dump());
                                settings.data = JSON.stringify(postData);
                            }
                        } else {
                            settings.data = settings.data + '&cookiejar=' + encodeURIComponent(JSON.stringify(cookieJar.dump()));
                        }
                        break;
                    case "object":
                        settings.data.cookiejar = JSON.stringify(cookieJar.dump());
                        break;
                }
            }

        });

        window.setCookie = setInMemoryCookie;
        window.getCookie = getInMemoryCookie;
        window.deleteCookie = deleteInMemoryCookie;
    }

    function deleteCookie(key) {
        debugger;
        // console.log(key + ' deleted from cookie');
        setCookie(key, "", -1);
    }

    function setInMemoryCookie(cname, cvalue, expireMillisec) {
        window.cookieJar.setItem(cname, cvalue);
    }

    function getInMemoryCookie(cname) {
        var cookie = window.cookieJar.getItem(cname);
        return cookie ? cookie : "";
    }

    function deleteInMemoryCookie(key) {
        window.cookieJar.removeItem(key);
    }

    function loadScript(url, callback) {
        /* Load script from url and calls callback once it's loaded */
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);
        if (typeof callback !== "undefined") {
            if (scriptTag.readyState) {
                /* For old versions of IE */
                scriptTag.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        callback();
                    }
                };
            } else {
                scriptTag.onload = callback;
            }
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

    function loadScriptUi(url, jQuery, $, callback) {
        jQuery(function ($) {
            $.getScript(url, function () {
                callback(jQuery, $);
            });
        });
    }

    function showNoticeMsgAndResizeContainer( msg = "" ) {
        if (false == $('button#korahCcrButton').is(":visible")) {
            return;
        }
        // Hide all locale first
        //$('#noticeMsgMutiLocale').find('div.noticeMsg').css('display', 'none');
        //var defaultLocale = "en";
        //var locale = Utils.getUrlParameter("lang", window.parent.location.href) || defaultLocale;
        //var foundLangDiv = $('#noticeMsgMutiLocale').find('div.noticeMsg.lang_' + locale);
        //if (foundLangDiv.length == 0) {
        //    foundLangDiv = $('#noticeMsgMutiLocale').find('div.noticeMsg.lang_' + defaultLocale)
        //}
        //foundLangDiv.css('display', 'inline');

        $('#noticeMsgMutiLocale').find('div.noticeMsg').css('display', 'inline');
        if (!isModalShown) {
            var msgDiv = $('#korahCcrNoticeMsg');
            var newWidth = 0;
            var newHeight = 0;
            newWidth = Number(containerFrame.style.width.replace("px", "")) + msgDiv.outerWidth(true);
            containerFrame.style.width = newWidth + "px";
            newHeight = Number(containerFrame.style.height.replace("px", "")) + msgDiv.outerHeight(true);
            containerFrame.style.height = newHeight + "px";

            messager.sendResize();

            msgDiv.css('display', 'inline').css('right', $('#korahCcrButton').outerWidth(true));
            $('#korahCcrButton').css('display', 'inline');

            document.getElementsByClassName("noticeMsg").value = "hello";

            if( msg ){
                var x = document.getElementsByClassName("noticeMsg");
                x[0].innerHTML = msg;
            }
        }
    }

    function hideNoticeMsgAndResizeContainer() {
        if (false == $('button#korahCcrButton').is(":visible")) {
            return;
        }
        var msgDiv = $('#korahCcrNoticeMsg');
        if (false == msgDiv.is(":visible")) {
            return;
        }
        containerFrame.style.width = containerWidth;
        containerFrame.style.height = containerHeight;

        messager.sendResize();

        msgDiv.css('display', 'none');
        $('#korahCcrButton').css('display', 'inline');
    }

    function usrEngagementCall(evt) {
        //var serverHost = $("#korahCcrButton").data('ccr-popup-url').split('?');
        //var host = '';
        //if (serverHost.length > 0) {
        //    var tmp = serverHost[0];
        //    var lastIdx = tmp.lastIndexOf('ccrChat/ccrChat.php');
        //    lastIdx = (-1 == lastIdx
        //        ? tmp.lastIndexOf('ccrChat/ccrChatClnt.php')
        //        : lastIdx);
        //    serverHost = tmp.substr(0, lastIdx);
        //}

        $.ajax({
            url: hostUrl + 'saveUsrEngagement.php',
            type: 'POST',
            data: {
                'orgId': orgId,
                'parentUrl': parentUrl,
                'evt': evt
            },
            error: function (response) {

            },
            success: function (response) {

            }
        });
    }
    
    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            return true;
        }
        // other browser
        return false;
    }

    function refreshIframeSrc() {
        var hiddenForm = $('#korahCcrChatForm');
        var endChatUrl = Utils.updateQueryString("end", "true", hiddenForm.attr("action"));
        hiddenForm[0].action = endChatUrl;
        hiddenForm[0].submit();
        //isChatFrameHasSrc = true;
        //isEndChatClicked = false;
        hiddenForm[0].reset();
        if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            isChatFrameHasSrc = false;
        }
    }
}(window, document, jQuery)); /* end IIFE */
