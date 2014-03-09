var app = Ember.Application.create()

// Router
app.Router.map(function() {
    this.route('idea', {
        path: 'idea/:idea_string'
    });
});

// Routes 
app.ApplicationRoute = Ember.Route.extend({});
app.IdeaRoute = Ember.Route.extend({
		model: function(params) {
			return params.idea_string;
		}
})

// Controllers
app.ApplicationController = Ember.Controller.extend({
	actions: {
		generate: function() {
			this.transitionToRoute('idea', runGenerator().join(" "));
		}
	}
})
app.IdeaController = Ember.Controller.extend({});

// Views
app.ApplicationView = Ember.View.extend({});
app.IdeaView = Ember.View.extend({
	templateName: 'idea',

	// The element is in the DOM after this function.
	didInsertElement: function() {
	}
});

window.App = app;
