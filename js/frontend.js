var app = Ember.Application.create()

// Router
app.Router.map(function() {
    this.route('idea', {
        path: 'idea/:idea_string'
    });
    this.route('seeds');
});

// Routes 
app.ApplicationRoute = Ember.Route.extend({});
app.IdeaRoute = Ember.Route.extend({
    model: function(params) {
        return params.idea_string;
    }
})
app.SeedsRoute = Ember.Route.extend({
    model: function() {
        return window.genrationSeeds;
    }
});

// Controllers
app.ApplicationController = Ember.Controller.extend({
    actions: {
        generate: function() {
            this.transitionToRoute('idea',
                runGenerator().join(" "));
        }
    }
})
app.IdeaController = Ember.Controller.extend({});

// requires underscore.js
var filterModule = {
    search: "",
    filter: function(words) {
        if (words)
            return words.filter(function(word) {
                return (word.indexOf(this.get('search')) > -1);
            }.bind(this))
    }
};

app.SeedsController = Ember.Controller.extend(
    filterModule, {
        changeSeeds: function(newV) {
            this.set("content", newV)
            seedGenerator(newV)
            window.genrationSeeds = newV
        },
        actions: {
            deleteAll: function() {
                this.changeSeeds({
                    "adjectives": [],
                    "nouns": [],
                    "modifiers": []
                });
            },
        },
        allWords: function() {
            return Object.keys(
                this.get('content')).reduce(function(rt, key) {
                return rt.concat(this.get('content')[key]);
            }.bind(this), []);
        }.property(),

        types: function() {
            return [{
                name: 'adjectives',
                list: this.filter.call(this, this.get('content.adjectives'))
            }, {
                name: 'nouns',
                list: this.filter.call(this, this.get('content.nouns')),
            }, {
                name: 'modifiers',
                list: this.filter.call(this, this.get('content.modifiers'))
            }];
        }.property('search', 'content')
    });

// Views
app.ApplicationView = Ember.View.extend({});
app.IdeaView = Ember.View.extend({
    templateName: 'idea',

    // The element is in the DOM after this function.
    didInsertElement: function() {}
});

window.App = app;
