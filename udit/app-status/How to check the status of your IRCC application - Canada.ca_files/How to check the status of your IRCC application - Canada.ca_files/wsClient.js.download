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

/**
 * wsClient.js
 */

function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "objecth ", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

	console.log("Fail to parse jsonString. " + jsonString);
    return false;
}

var ccrKorahWsClient = function () {
	// ccr Type
	var self = this,
		ws = null;

    self.id = null;
	self.CCR_TYPE_CLIENT = 0;
	self.CCR_TYPE_OPERATOR = 1;
		
	// chat window action
	self.MSG_TYPE_CLIENT_CLIENT_SIDE_INIT_CONNECTION = 0;
	self.MSG_TYPE_CLIENT_SERVER_LOGIN = 1;
	self.MSG_TYPE_CLIENT_NEW_SESSION = 2;
	self.MSG_TYPE_CLIENT_DISPATCH = 3;
    self.MSG_TYPE_CLIENT_DISPATCH_TIMEOUT = 4;
    self.MSG_TYPE_CLIENT_QUICK_RPY_UPDATED = 119;
	
	// operator action
	self.MSG_TYPE_OPR_CLIENT_SIDE_INIT_CONNECTION = 5;
	self.MSG_TYPE_OPR_SERVER_LOGIN = 6;
	self.MSG_TYPE_OPR_BINDING_OBSERVE = 7;
	self.MSG_TYPE_OPR_BINDING_JOIN = 8;
	self.MSG_TYPE_OPR_BINDING_FORCE_JOIN = 9;
	self.MSG_TYPE_OPR_DEL_BINDING = 10;
	self.MSG_TYPE_OPR_LOGOUT = 11;
    self.MSG_TYPE_OPR_SWITCH_ORG = 12;
    self.MSG_TYPE_RETRIEVE_EXT_TABLE = 13;
    self.MSG_TYPE_TOKENIZE_FILE = 14;
    self.MSG_TYPE_OPR_BINDING_UNJOIN = 17;
    self.MSG_TYPE_REFRESH_AVAILABILITY_STATUS_LIST = 19;
	
	// common action
    self.MSG_TYPE_DEL_SESSION = 15;
    self.MSG_TYPE_MSG = 16;
    self.MSG_TYPE_TYPING = 18;
    self.MSG_TYPE_MSG_SEND = 19;
    self.MSG_TYPE_CS_CLOSE = 20;
			
	// notify action
	self.NOTICE_MSG_UPDATED = 0;
    self.NOTICE_SESSION_UPDATED = 1;
    self.NOTICE_SESSION_RETRIEVE_EXT_TABLE = 2;
    self.NOTICE_SESSION_TOKENIZE_FILE = 3;
    self.NOTICE_SESSION_HANGUP = 4;
    self.NOTICE_SESSION_UNJOIN = 5;
    self.NOTICE_SESSION_INIT = 6;
    self.NOTICE_MSG_TYPING = 7;
    self.NOTICE_OPERATOR_STATUS_UPDATED = 8;
    self.NOTICE_MSG_RECEIVED = 9;
    self.NOTICE_OPERATOR_SWITCH_ORG = 21;

    self.ADMIN_BROADCAST_MESSAGE = 202;
    
	self.init = function (wsUrl, data, connectionCallback, receiveMsgCallback) {
            if ("WebSocket" in window) {
                    var wsUrlPort = url("port", wsUrl);
                    var wsUrlPath = url("path", wsUrl);
                    var wsUrlQuery = url("query", wsUrl);
                    var urlToConnect = ( url('protocol', wsUrl) == 'https' ? 'wss' : 'ws') + "://" 
                                            + url("hostname", wsUrl) 
                                            + ("undefined" == typeof wsUrlPort ? "" : ":" + wsUrlPort) 
                                            + ("undefined" == typeof wsUrlPath ? "" : wsUrlPath) 
                                            + ("undefined" == typeof wsUrlQuery ? "" : "?" + wsUrlQuery);
                    // var urlToConnect = "ws://" + wsUrl;
                    // var urlToConnect = "wss://" + wsUrl;
                    // console.log("Connecting to WebSocket Server: " + urlToConnect + ". WebSocket is supported by your Browser! ");
        	        // Let us open a web socket
                    ws = new WebSocket(urlToConnect);
        	        ws.onopen = function() {
            	        connectionCallback(true);
        		        // Web Socket is connected, send data using send()
        	    	
            	        this.send(JSON.stringify(data));
                        console.debug("Connectted to WebSocket Server: " + urlToConnect);
        	        };

        	         ws.onmessage = function (evt) {
        	            var received_msg = evt.data;
                        var jsonData = tryParseJSON(received_msg);
                        if (jsonData.msgType == self.NOTICE_SESSION_INIT) {
                            self.id = jsonData.id;
                        }

                        receiveMsgCallback(jsonData);
        	            console.debug("Notice received..." + received_msg);
                    };

                    ws.onerror = function (evt) {
                        connectionCallback(false);
                        //console.log("Connection error to WebSocket Server: " + urlToConnect);
                    };
        	
        	        ws.onclose = function(evt) {
            	        connectionCallback(false);
        		        // websocket is closed.
                        //console.log("Connection closed to WebSocket Server: " + urlToConnect);
        	        };
            } else {
        	    connectionCallback(false);
        	    // The browser doesn't support WebSocket
        	    console.log("WebSocket NOT supported by your Browser! Start interval call");
            }
    };

	self.dispose = function () {
        if (ws) {
	        ws.close();
	        ws = null;
        }
    }

    self.send = function (msgObj) {
        //MH: Only send message when connection is in OPEN state.
        if (ws && ws.readyState == 1) {
        ws.send(JSON.stringify(msgObj));
        }
    };
};
