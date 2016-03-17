const oldQuerySelectorAll =  document.querySelectorAll;

document.querySelectorAll = function(){
  return Array.prototype.slice.call(oldQuerySelectorAll.apply(this, arguments));
};

const cssTypeConversion = (val) => val == null? "" : (typeof val === 'string'? val : (val + 'px'));

const argumentsToPropertyObject = (args) => {
    //return will be {[cssPropertyName: string]: [value: string|number]}

    if(args.length === 1) // first argument is already property object
        return args[0];

    const properties = {};

    if(args[0] instanceof Array){ // arguments = [propertyName: string[], propertyValue: any[]]
    //arguments[0] = key; arguments[1] = value
        args[0].forEach((key, i) => properties[key] = args[1][i]);

        return properties;
    }

    properties[args[0]] = args[1];
    return properties;

};

HTMLElement.prototype.addClass = function(...classes){

    var classReplacementString = this.className[this.className.length - 1] === " "? this.className.slice(0,-1) : this.className;

    classes.forEach(className => classReplacementString += ' ' + className);

    this.className =  classReplacementString;

    return this;
};

HTMLElement.prototype.removeClass = function(...classes){


    classes.forEach(className => this.className = this.className.split(className).join(""));

    this.className = this.className.split("  ").join("").trim();

    return this;
};


HTMLElement.prototype.css = function(){

    const properties = argumentsToPropertyObject(arguments);

    //done formatting properties.. Let's apply those properties now.

    Object.keys(properties).forEach(cssPropertyName =>
        this.style[cssPropertyName] = cssTypeConversion(properties[cssPropertyName])
    );

    return this;
};


HTMLElement.prototype.attr = function(){
    //does only one element exist as an array or string
    if(arguments.length === 1 && (!(arguments[0] instanceof Object) || (arguments[0] instanceof Array)))
        return arguments[0] instanceof Array? arguments[0].map(attributeName => this.getAttribute(attributeName)) : this.getAttribute(arguments[0]);

    const properties = argumentsToPropertyObject(arguments);

    Object.keys(properties).forEach(attributeName =>
        properties[attributeName] == null? this.removeAttribute(attributeName) : this.setAttribute(attributeName, properties[attributeName])
    );

    return this;
};

Request = function({type, url, async, data, contentType}){

    var ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open(type || "GET", url, async || true);

    var promise = new Promise((resolve, reject) => {

        ajaxRequest.onreadystatechange = function(){

            if(ajaxRequest.status === 200)
                if(ajaxRequest.readyState === XMLHttpRequest.DONE)
                resolve(ajaxRequest.responseText);
            else
                reject(ajaxRequest.status);

        }
    });

    if(contentType !== undefined){
        ajaxRequest.setRequestHeader("Content-Type", contentType);

        ajaxRequest.send(JSON.stringify(data));
    }else
    ajaxRequest.send(data);

    return promise;
};


Request.json = function(url, data){

    const settings = {
        type: 'POST',
        url,
        data
    };

    if(data instanceof Object)
        settings.contentType = 'application/json';

    return Request(settings);
};