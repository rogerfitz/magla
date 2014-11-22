var wikipedia = require("node-wikipedia");

wikipedia.page.data("Clifford_Brown", { content: true }, function(response) {
    // structured information on the page for Clifford Brown (wikilinks, references, categories, etc.)
    //console.log(response);
});

wikipedia.categories.tree(
    "Blues",
    function(tree) {
        //nested data on the category page for all Phillies players
        console.log(tree);
    }
);