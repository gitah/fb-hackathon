/** @jsx React.DOM */

function handleRouteChange(component) {
  var routeParams = Array.prototype.slice.call(arguments, 1);
  React.renderComponent(
    <component routeParams={routeParams} />,
    document.body
  );
}

var ReactHack = {
  router: null,

  start: function(routes, pushState) {
    if (ReactHack.router) {
      throw new Error('Already started ReactHack');
    }

    var idseed = 0;
    var backboneRoutes = {};
    var backboneMethods = {};

    for (var route in routes) {
      if (!routes.hasOwnProperty(route)) {
        continue;
      }

      var routeComponentClass = routes[route];
      var routeName = 'route' + (idseed++);

      backboneRoutes[route] = routeName;
      backboneMethods[routeName] = handleRouteChange.bind(this, routeComponentClass);
    }

    backboneMethods.routes = backboneRoutes;

    var AppRouter = Parse.Router.extend(backboneMethods);
    ReactHack.router = new AppRouter();
    Parse.history.start({pushState: !!pushState});
  }
};

module.exports = ReactHack;
