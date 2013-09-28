;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var Button = React.createClass({displayName: 'Button',
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(React.DOM.a( {role:"button", className:"btn"}, this.props.children));
  }
});

module.exports = Button;
},{}],2:[function(require,module,exports){
/** @jsx React.DOM */

var Button = require('./Button');
var Content = require('../data/Content');
var Markdown = require('./Markdown');
var FetchingMixin = require('../framework/FetchingMixin');
var Spinner = require('../components/Spinner');

var ContentBlock = React.createClass({displayName: 'ContentBlock',
  mixins: [FetchingMixin],

  modelState: ['content'],

  getInitialState: function() {
    return {content: null, editableContent: null, loading: false};
  },

  shouldRefreshData: function(prevProps) {
    return this.props.name !== prevProps.name;
  },

  fetchData: function() {
    Content.getByPageName(
      this.props.name,
      this.props.children,
      this.stateSetter('content')
    );
  },

  handleChange: function(e) {
    this.setState({editableContent: e.target.value});
  },

  getEditableContent: function() {
    // Example of a "computed property": either the user has changed the data
    // and it lives in this.state.editableContent, or they haven't, and it
    // lives in this.state.content.
    return this.state.editableContent || this.state.content.get('content');
  },

  handleSave: function() {
    this.state.content.set('content', this.getEditableContent());
    this.setState({loading: true});

    this.state.content.save(null, {
      success: function() {
        this.setState({loading: false});
        Parse.history.navigate('#/pages/' + this.props.name, {trigger: true});
      }.bind(this),

      error: function(obj, error) {
        console.error('Error saving', obj, error);
      }
    });
  },

  handleDelete: function() {
    this.setState({loading: true});

    this.state.content.destroy({
      success: function() {
        this.setState({loading: false});
        Parse.history.navigate('#', {trigger: true});
      }.bind(this),

      error: function(obj, error) {
        console.error('Error destroying', obj, error);
      }
    });
  },

  render: function() {
    if (!this.state.content) {
      return Spinner(null );
    }

    if (!this.props.editing) {
      return (
        React.DOM.div(null, 
          Button( {href:'#/pages/' + this.props.name + '/edit'}, "Edit"),
          Button( {className:"btn-danger", onClick:this.handleDelete}, 
" Delete "          ),
          Markdown(null, this.state.content.get('content') || '')
        )
      );
    }

    var editableContent = this.getEditableContent();

    if (this.state.saving) {
      return (
        React.DOM.div(null, 
          Spinner(null ),
          Markdown(null, editableContent)
        )
      );
    }

    return (
      React.DOM.div(null, 
        Button( {onClick:this.handleSave, className:"btn-primary"}, 
" Save "        ),
        Button( {href:'#/pages/' + this.props.name}, "Cancel"),
        React.DOM.textarea( {value:editableContent, onChange:this.handleChange} ),
        Markdown(null, editableContent)
      )
    );
  }
});

module.exports = ContentBlock;
},{"../components/Spinner":6,"../data/Content":7,"../framework/FetchingMixin":8,"./Button":1,"./Markdown":3}],3:[function(require,module,exports){
/** @jsx React.DOM */

var converter = new Showdown.converter();

var Markdown = React.createClass({displayName: 'Markdown',
  render: function() {
    return (
      React.DOM.div(
        {dangerouslySetInnerHTML:{
          __html: converter.makeHtml(this.props.children)
        }}
      )
    );
  }
});

module.exports = Markdown;
},{}],4:[function(require,module,exports){
/** @jsx React.DOM */

var Modal = React.createClass({displayName: 'Modal',
  render: function() {
    var actionButton = null;
    if (this.props.actionButton) {
      actionButton = (
        React.DOM.button(
          {className:"btn btn-primary",
          onClick:this.props.onAction}, 
          this.props.actionButton
        )
      );
    }

    return this.transferPropsTo(
      React.DOM.div( {className:"modal hide fade", tabindex:"-1", role:"dialog", 'aria-labelledby':"myModalLabel", 'aria-hidden':"true"}, 
        React.DOM.div( {className:"modal-header"}, 
          React.DOM.button( {type:"button", className:"close", onClick:this.props.onRequestClose}, "×"),
          React.DOM.h3(null, this.props.title)
        ),
        React.DOM.div( {className:"modal-body"}, 
          this.props.children
        ),
        React.DOM.div( {className:"modal-footer"}, 
          React.DOM.button( {className:"btn", onClick:this.props.onRequestClose}, "Close"),
          actionButton
        )
      )
    );
  },

  componentDidMount: function() {
    $(this.getDOMNode()).modal({show: this.props.visible});
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      $(this.getDOMNode()).modal(this.props.visible ? 'show' : 'hide');
    }
  }
});

module.exports = Modal;
},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Modal = require('../components/Modal');

var NewPageModal = React.createClass({displayName: 'NewPageModal',
  getInitialState: function() {
    return {pageName: '', error: false};
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      // Reset the modal when it is opened.
      this.setState(this.getInitialState());
    }
  },

  handleChange: function(e) {
    // No whitespace allowed!
    this.setState({pageName: e.target.value.replace(' ', '_')});
  },

  handleAction: function() {
    if (!this.state.pageName) {
      this.setState({error: true});
    } else {
      this.props.onNewPage(this.state.pageName);
    }

    // Prevent form submission
    return false;
  },

  render: function() {
    return this.transferPropsTo(
      Modal( {title:"Add a new page", actionButton:"OK", onAction:this.handleAction}, 
        React.DOM.form( {onSubmit:this.handleAction}, 
          React.DOM.input(
            {type:"text",
            placeholder:"New page name",
            value:this.state.pageName,
            onChange:this.handleChange}
          )
        )
      )
    );
  }
});

module.exports = NewPageModal;
},{"../components/Modal":4}],6:[function(require,module,exports){
/** @jsx React.DOM */

var Spinner = React.createClass({displayName: 'Spinner',
  render: function() {
    return React.DOM.img( {src:"./static/spinner.gif", alt:"Loading..."} );
  }
});

module.exports = Spinner;
},{}],7:[function(require,module,exports){
var Content = Parse.Object.extend('Content', {}, {
  create: function(pageName) {
    var instance = new Content();
    instance.set('pageName', pageName);
    instance.set('content', 'No content... *yet*.');
    instance.save();
    return instance;
  },

  getByPageName: function(pageName, defaultContent, cb) {
    var collection = new Content.Collection();
    collection.query = new Parse.Query(Content);
    collection.query.equalTo('pageName', pageName);
    collection.fetch({
      success: function(obj) {
        cb(obj.models[0] || Content.create(pageName, defaultContent));
      },
      error: function(obj, err) {
        console.error('getByPageName() error', obj, err);
      }
    });
  },

  getAll: function(cb) {
    var collection = new Content.Collection();
    collection.query = new Parse.Query(Content);
    collection.fetch({
      success: function(obj) {
        cb(obj);
      },
      error: function(obj, err) {
        console.error('getAll() error', obj, err);
      }
    });
  }
});

Content.Collection = Parse.Collection.extend({
  model: Content,

  createContent: function(pageName) {
    this.add(Content.create(pageName));
  }
});

module.exports = Content;
},{}],8:[function(require,module,exports){
var Fetching;

if (typeof Parse !== 'undefined') {
  Fetching = Parse;
} else if (typeof Backbone !== 'undefined') {
  Fetching = Backbone;
} else {
  throw new Error('Cannot require() FetchingMixin without Parse or Backbone global');
}

var FetchingMixin = {
  /**
   * Helper that's useful with Fetching.
   */
  stateSetter: function(key) {
    return function(value) {
      var newState = {};
      newState[key] = value;
      this.setState(newState);
    }.bind(this);
  },

  _isModel: function(model) {
    return (model && model instanceof Fetching.Object || model instanceof Fetching.Collection);
  },

  _subscribe: function(model) {
    if (!this._isModel(model)) {
      return;
    }
    // Detect if it's a collection
    if (model instanceof Fetching.Collection) {
      model.on('add remove reset sort', function () { this.forceUpdate(); }, this);
    } else if (model) {
      var changeOptions = this.changeOptions || 'change';
      model.on(changeOptions, (this.onModelChange || function () { this.forceUpdate(); }), this);
    }
  },

  _unsubscribe: function(model) {
    if (!this._isModel(model)) {
      return;
    }
    model.off(null, null, this);
  },

  _subscribeAll: function(state) {
    this.modelState.forEach(function(key) {
      this._subscribe(state[key]);
    }.bind(this));
  },

  _unsubscribeAll: function(state) {
    this.modelState.forEach(function(key) {
      this._unsubscribe(state[key]);
    }.bind(this));
  },

  componentWillMount: function() {
    if (!Array.isArray(this.modelState)) {
      throw new Error('FetchingMixin requires a modelState array attribute');
    }

    if (typeof this.fetchData !== 'function') {
      throw new Error('FetchingMixin requires a fetchData() method');
    }
  },

  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this._subscribeAll(this.state);

    this.fetchData();

    this._interval = null;
    if (this.fetchPollInterval) {
      this._interval = setInterval(this.fetchData, this.fetchPollInterval);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._unsubscribeAll(prevState);
    this._subscribeAll(this.state);

    if (this.shouldRefreshData && this.shouldRefreshData(prevProps)) {
      this.fetchData();
    }
  },

  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is destroyed.
    this._unsubscribeAll(this.state);
    if (this._interval) {
      clearInterval(this.interval);
    }
  }
};

module.exports = FetchingMixin;
},{}],9:[function(require,module,exports){
/** @jsx React.DOM */

function handleRouteChange(component) {
  var routeParams = Array.prototype.slice.call(arguments, 1);
  React.renderComponent(
    component( {routeParams:routeParams} ),
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

    // Set up default (error) route
    backboneRoutes['*default'] = 'fourohfour';
    backboneMethods['fourohfour'] = function() {
      React.renderComponent(React.DOM.h1(null, "ReactHack route not found."), document.body);
    };

    backboneMethods.routes = backboneRoutes;

    var AppRouter = Parse.Router.extend(backboneMethods);
    ReactHack.router = new AppRouter();
    Parse.history.start({pushState: !!pushState});
  }
};

module.exports = ReactHack;
},{}],10:[function(require,module,exports){
/** @jsx React.DOM */

var NavBar = require('./NavBar');

var Layout = React.createClass({displayName: 'Layout',
  render: function() {
    return this.transferPropsTo(
      React.DOM.div(null, 
        NavBar( {active:this.props.active} ),
        React.DOM.div( {className:"container"}, 
          React.DOM.div( {className:"content"}, 
            this.props.children
          )
        )
      )
    );
  }
});

module.exports = Layout;
},{"./NavBar":11}],11:[function(require,module,exports){
/** @jsx React.DOM */

var NavBar = React.createClass({displayName: 'NavBar',
  render: function() {
    return this.transferPropsTo(
      React.DOM.div( {className:"navbar navbar-inverse navbar-fixed-top"}, 
        React.DOM.div( {className:"navbar-inner"}, 
          React.DOM.div( {className:"container"}, 
            React.DOM.button( {type:"button", className:"btn btn-navbar", 'data-toggle':"collapse", 'data-target':".nav-collapse"}, 
              React.DOM.span( {className:"icon-bar"}),
              React.DOM.span( {className:"icon-bar"}),
              React.DOM.span( {className:"icon-bar"})
            ),
            React.DOM.a( {className:"brand", href:"#"}, "ReactHack"),
            React.DOM.div( {className:"nav-collapse collapse"}, 
              React.DOM.ul( {className:"nav"}, 
                React.DOM.li( {className:this.props.active === 'home' && 'active'}, React.DOM.a( {href:"#"}, "Home")),
                React.DOM.li( {className:this.props.active === 'about' && 'active'}, React.DOM.a( {href:"#about"}, "About"))
              )
            )
          )
        )
      )
    );
  }
});

module.exports = NavBar;
},{}],12:[function(require,module,exports){
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

},{"./framework/ReactHack":9,"./pages/AboutPage":13,"./pages/ContentPage":14,"./pages/HomePage":15}],13:[function(require,module,exports){
/** @jsx React.DOM */

var Layout = require('../layout/Layout.js');

var AboutPage = React.createClass({displayName: 'AboutPage',
  render: function() {
    return (
      Layout( {active:"about"}, 
        React.DOM.h1(null, "About ReactHack"),
        React.DOM.p(null, "This is a simple application built with React, Parse, and Bootstrap. Use it to get started building your application.")
      )
    );
  }
});

module.exports = AboutPage;
},{"../layout/Layout.js":10}],14:[function(require,module,exports){
/** @jsx React.DOM */

var Content = require('../data/Content');
var ContentBlock = require('../components/ContentBlock');
var Layout = require('../layout/Layout');

var ContentPage = React.createClass({displayName: 'ContentPage',
  render: function() {
    return (
      Layout(null, 
        ContentBlock(
          {editing:this.props.routeParams[1] === 'edit',
          name:this.props.routeParams[0]}
        )
      )
    );
  }
});

module.exports = ContentPage;
},{"../components/ContentBlock":2,"../data/Content":7,"../layout/Layout":10}],15:[function(require,module,exports){
/** @jsx React.DOM */

var Button = require('../components/Button');
var Content = require('../data/Content');
var Layout = require('../layout/Layout');
var NewPageModal = require('../components/NewPageModal');
var FetchingMixin = require('../framework/FetchingMixin');
var Spinner = require('../components/Spinner');

var HomePage = React.createClass({displayName: 'HomePage',
  mixins: [FetchingMixin],

  modelState: ['pages'],
  fetchPollInterval: 60000,

  fetchData: function() {
    Content.getAll(this.stateSetter('pages'));
  },

  getInitialState: function() {
    return {pages: null, modalShown: false};
  },

  handleClick: function() {
    this.setState({modalShown: true});
  },

  handleNewPage: function(name) {
    this.setState({modalShown: false});
    this.state.pages.createContent(name);
  },

  render: function() {
    var content;

    if (this.state.pages) {
      var links = this.state.pages.models.map(function(model) {
        var name = model.get('pageName');
        return (
          React.DOM.li( {key:name}, React.DOM.a( {href:'#/pages/' + name}, name))
        );
      });
      content = (
        React.DOM.ul(null, 
          links,
          React.DOM.li(null, Button( {onClick:this.handleClick}, "Add new"))
        )
      );
    } else {
      content = Spinner(null );
    }

    return (
      Layout( {active:"home"}, 
        content,
        NewPageModal(
          {visible:this.state.modalShown,
          onRequestClose:this.setState.bind(this, {modalShown: false}, null),
          onNewPage:this.handleNewPage}
        )
      )
    );
  }
});

module.exports = HomePage;
},{"../components/Button":1,"../components/NewPageModal":5,"../components/Spinner":6,"../data/Content":7,"../framework/FetchingMixin":8,"../layout/Layout":10}]},{},[12])
;