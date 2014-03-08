var adjectivesArray;
var nounsArray;
var modifiersArray;

// Load data from json

function seedGenerator(json) {
    adjectivesArray = json.adjectives;
    nounsArray = json.nouns;
    modifiersArray = json.modifiers;
};

seedGenerator(window.genrationSeeds);

// Will return an array with the generated values.

function runGenerator() {
    // Return a random value from the array
    function randomArray(a) {
        return a[Math.floor(Math.random() * a.length)];
    };
    var adjective = randomArray(adjectivesArray);
    var noun = randomArray(nounsArray);

    function getmodifier() {
        var modifier = Math.random();
        if (modifier < 0.3) {
            return randomArray(modifiersArray);
        } else {
            return "";
        }
    }
    var modifier = getmodifier();
    return [adjective, noun, modifier];
}

// Will add the generators output to the DOM.

function addToDom(output) {
    $("#output").html("<p>" + output + "</p>");

    $(".element").share({
        text: "I just found my new startup idea: " + output,
        app_id: 1448143845416014,
        background: "#B2D1E5",
        color: "#3C8DC5",
        button_text: "Share this startup idea!",

        facebook: {
            name: "What's my startup idea?",
            link: "http://krystalfister.github.io/Startup/",
            image: "http://krystalfister.github.io/Startup/images/logo.png",
            caption: "I just found my new startup idea: " + output,
            text: "Randomly generate ideas for your startup."
        },

        twitter: {
            text: "I just found my new startup idea: " + output,
            link: "http://krystalfister.github.io/Startup/"
        },

        gplus: {
            link: "http://krystalfister.github.io/Startup/"
        }
    });
}

function clickHandler() {
    addToDom(
        runGenerator().join(" ")
    )
}
