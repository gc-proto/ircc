(function (scope) {
    
    const defaultPublicKey = "BPHapxMALmazZcEtmuuASDLlhWzJPXJxP4I1o1Fb3a5hsQbwx06BQ0t4wV2VHDaYn3jKYkSamPV5jmee5rX6-qw";
    
    function PushClient(serviceWorkerPath, publicKey) {
            
        var _self = this;
        var _publicKey = publicKey ? publicKey : defaultPublicKey;
        var _serviceWorkerPath = serviceWorkerPath ? serviceWorkerPath : "./serviceWorker.js";
        
        _constructor();
        
        function _constructor() {
            
            if (_hasPushSupport()) {
                _registerServiceWorker();
            }
            
        }
        
        function _hasPushSupport() {
            return "serviceWorker" in navigator && "PushManager" in window;
        }
        
        function _registerServiceWorker() {
            
            return navigator.serviceWorker.register(_serviceWorkerPath, {
                scope: "/"
            }).then(function(swRegistration) {
                return swRegistration;
            });
            
        }
        
        
        function _createPushSubscription() {

            return navigator.serviceWorker.ready.then(function(serviceWorker) {
                return serviceWorker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: _publicKey
                }).then(function(subscription) {
                    return subscription;
                });
            });
            
        }
        
        function _getPushSubscription() {
            
            return navigator.serviceWorker.ready.then(function(serviceWorker) {
                return serviceWorker.pushManager.getSubscription();
            }).then(function(pushSubscription) {
                return pushSubscription;
            });
            
        }
        
        function _requestPushPermission() {
            
            return Notification.requestPermission(function(result) {
                return result;
            });
            
        }
        
        function _hasPermission () {
            return Notification.permission === 'granted';
        }
        
        function _isDenied () {
            return Notification.permission === 'denied';
        }
        
        _self.requestPushPermission = _requestPushPermission;
        _self.hasPermission = _hasPermission;
        _self.isDenied = _isDenied;
        _self.hasPushSupport = _hasPushSupport;
        _self.getPushSubscription = function () {
            
            return _getPushSubscription().then(function (sub) {
                if (sub) {
                    return sub;
                } else {
                    return _createPushSubscription();
                }
            });
            
        };

        _self.getCurrentSubscription = _getPushSubscription;
        
        return _self;
        
    }
    
    scope.PushClient = new PushClient("/oprCns/js/serviceWorker.js", defaultPublicKey);
    
})(window);