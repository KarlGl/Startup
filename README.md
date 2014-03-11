You can email me here if you get stuck on any of these steps: kg@papercloud.com.au

LEVEL 1
===
1.  Clone the startup generator:

	```
	git clone git@github.com:KarlGl/Startup.git
	```

1.  Include these libraries:

	```
	handlebars.js, ember.js
	```

2.  Include a template:

	```
	<script type="text/x-handlebars">
		<b>FOO</b>
	</script>
	```

2.  Create an Ember Application:

	```
	Ember.Application.create()
	```
    With only this, we have content on the page. But you have an empty body element.

3.  Add an **outlet** to the main template in the <output> element.

3.  Add some routes:

	```
	app.Router.map(function() {
	  this.route('route_name', {
	    path: '/:dynamic_segments'
	  });
  })
	```

4.  Add a class for the route, add model function to this class:


	```
	model: function(params) {
	  return params.idea_string;
	}
	```

5.  Another template with the id attribute set:
	
	```
	id="route_name"
	```

6.  Add a generate action on the **Application** controller, make it:

    ```
    transitionToRoute 'route_name' with window.runGenerator().join(" ")
    ````

LEVEL 2
===

7.  Add a link (link-to helper) that goes to the seeds page.

8.  Add Seeds route, with a model function that is the window.genrationSeeds.

8.  Add a computed propery for the types: array of 3 types, type has a name (string) and seeds (array of strings)

		types: function() {
            return [{
                name: 'adjectives',
                list: this.get('content.adjectives')
            }, {
                name: 'nouns',
                list: this.get('content.nouns'),
            }, {
                name: 'modifiers',
                list: this.get('content.modifiers')
            }];
        }.property()

9.  Template that lists seeds.

		type in types
			type.name
			seed in type.list

LEVEL 3
===

10.  Search bar in template linked to "search" {{input value=search}}

11.  Filtering all words

		var filterModule = {
		    search: "",
		    filter: function(words) {
		        if (words)
			        return words.filter(function(word) {
		            return (word.indexOf(this.get('search')) > -1);
			        }.bind(this))
		    }
		};

12.  Filter each list in types.

		list: this.filter.call(this, this.get('content.adjectives'))

LEVEL 4
===

13.  "Clear all" button

	```
	<button {{action deleteAll}}>
	```

14.  deleteAll action (with this code in the function body)

    ```
		  this.changeSeeds({
			  "adjectives": [],
			  "nouns": [],
			  "modifiers": []
	    })
    ```

    ```
    changeSeeds: function(newV) {
            this.set("content", newV)
            window.seedGenerator(newV)
            window.genrationSeeds = newV
            localStorage.setItem('seeds', JSON.stringify(newV))
    },
    ```
    
15.  Notice this won't work untill the types function observes 'content'

15.  Add input helpers for adding new types {{input value=newType}} 

15.  Button to add new seed. 

    ```
    {{action addNew type.name newType}}
    ```

17.  addNew action with this body

	```
    this.get('content')[typeName].pushObject(newV);
    this.changeSeeds(this.get('content'));
  ```

16.  Normal types also must observe the, but we are setting content each time anyway...

		'content.adjectives.length'

18.  Persitance:

		// to load in seeds: 		
			var persistedSeeds = JSON.parse(localStorage.getItem('seeds'));
			if (persistedSeeds) {
			    window.genrationSeeds = persistedSeeds;
			}


LEVEL 5: BONUS LEVEL: BUILD TOOLS:
===

	git clone git@github.com:KarlGl/gulp-ember-skeliton.git

put all your templates in the js/templates folder.



Startup Idea Generator
=======
Randomly generates startup ideas from a list of ```adjectives```, ```nouns``` and ```modifiers```. The modifiers are words or sentences tacked on to the end — these only have a 30% chance of occurring.

The list of words can be edited in the json file /data/data.json

Please feel free to give me any feedback here or on twitter <a href="https://twitter.com/krystalfister">@krystalfister</a>


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/krystalfister/startup/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

