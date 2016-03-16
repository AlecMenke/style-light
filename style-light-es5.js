'use strict';

var oldQuerySelectorAll =  document.querySelectorAll;

document.querySelectorAll = function(){
    return Array.prototype.slice.call(oldQuerySelectorAll.apply(this, arguments));
};

var cssTypeConversion = function cssTypeConversion(val) {
    return val == null ? "" : typeof val === 'string' ? val : val + 'px';
};

var argumentsToPropertyObject = function argumentsToPropertyObject(args) {
    //return will be {[cssPropertyName: string]: [value: string|number]}

    if (args.length === 1) // first argument is already property object
        return args[0];

    var properties = {};

    if (args[0] instanceof Array) {
        // arguments = [propertyName: string[], propertyValue: any[]]
        //arguments[0] = key; arguments[1] = value
        args[0].forEach(function (key, i) {
            return properties[key] = args[1][i];
        });

        return properties;
    }

    properties[args[0]] = args[1];
    return properties;
};

HTMLElement.prototype.addClass = function () {

    var classReplacementString = this.className[this.className.length - 1] === " " ? this.className.slice(0, -1) : this.className;

    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    classes.forEach(function (className) {
        return classReplacementString += ' ' + className;
    });

    this.className = classReplacementString;

    return this;
};

HTMLElement.prototype.removeClass = function () {
    var _this = this;

    for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
    }

    classes.forEach(function (className) {
        return _this.className = _this.className.split(className).join("");
    });

    this.className = this.className.split("  ").join("").trim();

    return this;
};

HTMLElement.prototype.css = function () {
    var _this2 = this;

    var properties = argumentsToPropertyObject(arguments);

    //done formatting properties.. Let's apply those properties now.

    Object.keys(properties).forEach(function (cssPropertyName) {
        return _this2.style[cssPropertyName] = cssTypeConversion(properties[cssPropertyName]);
    });

    return this;
};

HTMLElement.prototype.attr = function () {
    var _this3 = this;

    //does only one element exist as an array or string
    if (arguments.length === 1 && (!(arguments[0] instanceof Object) || arguments[0] instanceof Array)) return arguments[0] instanceof Array ? arguments[0].map(function (attributeName) {
        return _this3.getAttribute(attributeName);
    }) : this.getAttribute(arguments[0]);

    var properties = argumentsToPropertyObject(arguments);

    Object.keys(properties).forEach(function (attributeName) {
        return properties[attributeName] == null ? _this3.removeAttribute(attributeName) : _this3.setAttribute(attributeName, properties[attributeName]);
    });

    return this;
};