/** @jsx React.DOM */

var AboutPage = require('./pages/AboutPage');
var ContentPage = require('./pages/ContentPage');
var HomePage = require('./pages/HomePage');
var ReactHack = require('./framework/ReactHack');

Parse.initialize('z37bW2Fi1Df7b3xS3tjfJIgxA7L9ZpKQmYVLhmwU', 'ryyVdw8aqW9ZZK45XLg4jogO5LgYNiwl3oiV6yVH');

ReactHack.start({
  '': HomePage,
  'pages/:name': ContentPage,
  'pages/:name/:mode': ContentPage,
  'about': AboutPage
});
