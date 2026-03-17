function LSAdapter(parentWindow, name, uid) {

    var _self = this;
    var _cache = {};
    var _parentWindow = parentWindow;
    var _name = name;
    var _uid = uid;

    function _init() {
        window.addEventListener("message", function (e) {
            if (e.data.name == _name) {
                // this.console.log(e);
                switch (e.data.action) {
                    case LSAdapter.EVENTS.INIT:
                        if (e.data.initiator == _uid) {
                            _cache = e.data.args.cache;
                            _self.onLoad();
                        }
                        break;
                    case LSAdapter.EVENTS.SET:
                        if (e.data.initiator != _uid) {
                            _setItem(e.data.args.key, e.data.args.item, false);
                        }
                        break;
                    case LSAdapter.EVENTS.UNSET:
                        if (e.data.initiator != _uid) {
                            _removeItem(e.data.args.key, false);
                        }
                        break;
                    case LSAdapter.EVENTS.CLEAR:
                        if (e.data.initiator != _uid) {
                            _clear(false);
                        }
                        break;
                }
            }
        });
        _notify(LSAdapter.EVENTS.INIT, null);
    }

    function _onLoad() {}

    //When passed a number n, this method will return the name of the nth key in the storage.
    function _key(n) {
        // TODO: implement this????
    }

    //When passed a key name, will return that key's value.
    function _getItem(key) {
        key = _normalizeKey(key);
        if (key in _cache) {
            return _cache[key];
        }
        return null;
    }

    //When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
    function _setItem(key, item, notify) {
        if (item === undefined) {
            throw new TypeError("Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present.");
        }
        key = _normalizeKey(key);
        if (notify) {
            _notify(LSAdapter.EVENTS.SET, {
                "key": key,
                "item": item
            });
        }
        _cache[key] = item.toString();
    }

    //When passed a key name, will remove that key from the storage.
    function _removeItem(key, notify) {
        key = _normalizeKey(key);
        if (key in _cache) {
            if (notify) {
                _notify(LSAdapter.EVENTS.UNSET, {
                    "key": key
                });
            }
            delete _cache[key];
        }
    }

    //When invoked, will empty all keys out of the storage.
    function _clear(notify) {
        if (notify) {
            _notify(LSAdapter.EVENTS.CLEAR, null);
        }
        _cache = {};
    }

    function _normalizeKey(key) {
        if (key === undefined) return "undefined";
        if (key === null) return "null";
        return key.toString();
    }

    function _notify(action, args) {
        _parentWindow.postMessage({
            "name": _name,
            "initiator": _uid,
            "action": action,
            "args": args
        }, "*");
    }

    _self.key = _key;

    _self.getItem = _getItem;

    _self.setItem = function (key, item) {
        _setItem(key, item, true);
    }

    _self.removeItem = function (key) {
        _removeItem(key, true);
    }

    _self.clear = function () {
        _clear(true);
    }

    _self.normalizeKey = _normalizeKey;

    _self.init = _init;

    _self.onLoad = _onLoad;

    _self.dump = function () {
        return _cache;
    }

    return _self;

}
LSAdapter.EVENTS = {
    INIT: 0,
    SET: 1,
    UNSET: 2,
    CLEAR: 3
}
