// https://github.com/madmurphy/cookies.js
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

// var isNumber = _interopDefault(require('es-is/number'));
var isNumber = some => typeof some === 'number';
// var objectAssign = _interopDefault(require('es-object-assign'));
var objectAssign = Object.assign;

// src/cookies.coffee
var Cookies;

Cookies = (function() {
  function Cookies(defaults) {
    this.defaults = defaults != null ? defaults : {};
    this.get = (function(_this) {
      return function(key) {
        return _this.read(key);
      };
    })(this);
    this.getJSON = (function(_this) {
      return function(key) {
        var err;
        try {
          return JSON.parse(_this.read(key));
        } catch (error) {
          err = error;
          return {};
        }
      };
    })(this);
    this.remove = (function(_this) {
      return function(key, attrs) {
        return _this.write(key, '', objectAssign({
          expires: -1
        }, attrs));
      };
    })(this);
    this.set = (function(_this) {
      return function(key, value, attrs) {
        return _this.write(key, value, attrs);
      };
    })(this);
  }

  Cookies.prototype.read = function(key) {
    var cookie, cookies, err, i, kv, len, name, parts, rdecode, result;
    if (!key) {
      result = {};
    }
    cookies = document.cookie ? document.cookie.split('; ') : [];
    rdecode = /(%[0-9A-Z]{2})+/g;
    for (i = 0, len = cookies.length; i < len; i++) {
      kv = cookies[i];
      parts = kv.split('=');
      cookie = parts.slice(1).join('=');
      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }
      try {
        name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = cookie.replace(rdecode, decodeURIComponent);
        if (key === name) {
          return cookie;
        }
        if (!key) {
          result[name] = cookie;
        }
      } catch (error) {
        err = error;
      }
    }
    return result;
  };

  Cookies.prototype.write = function(key, value, attrs) {
    var attr, err, expires, name, result, strAttrs;
    attrs = objectAssign({
      path: '/'
    }, this.defaults, attrs);
    if (isNumber(attrs.expires)) {
      expires = new Date;
      expires.setMilliseconds(expires.getMilliseconds() + attrs.expires * 864e+5);
      attrs.expires = expires;
    }
    attrs.expires = attrs.expires ? attrs.expires.toUTCString() : '';
    try {
      result = JSON.stringify(value);
      if (/^[\{\[]/.test(result)) {
        value = result;
      }
    } catch (error) {
      err = error;
    }
    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    key = encodeURIComponent(String(key));
    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
    key = key.replace(/[\(\)]/g, escape);
    strAttrs = '';
    for (name in attrs) {
      attr = attrs[name];
      if (!attr) {
        continue;
      }
      strAttrs += '; ' + name;
      if (attr === true) {
        continue;
      }
      strAttrs += '=' + attr;
    }
    return document.cookie = key + '=' + value + strAttrs;
  };

  return Cookies;

})();

// src/index.coffee
var cookies = new Cookies();
