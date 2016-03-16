# Style Light

A lightweight JavaScript library for attribute, style, class manipulations, and the removal of common developer pitfalls.

## Purpose

Style Light is meant to provide some of the functionality of JQuery while using regular JavaScript HTMLElements. The hope is that Style Light can stop developers from needing to recreate simple functions such as 'addClass' or downloading a full fledged library such as JQuery.

It implements a series of commonly used functions, as well as a few fixes for common annoyances, such as, querySelectorAll returning a NodeList instead of an Array.

## Installation

```sh
bower install style-light
```

## Usage

#### class manipulation:

```js
var body = document.querySelector('body');

body.addClass('test').removeClass('other').addClass(['some', 'classes']);
```

#### attribute manipulation:

```js
var body = document.querySelector('body');

var theWordOther = body.attr('test', 'other').attr('test');

var listOfAttributeValues = body.attr(['test', 'other']);

body.attr(['test', 'other'], ['newVal', 'otherVal']);

body.attr({test: "replace that value"});
```

#### style manipulation:

```js

var body = document.querySelectorAll('nodes').forEach(element => {

    element.css({background: 'red'}).css(['height', 'color'], [128, 'blue']).css('width', 100);
    
});
```