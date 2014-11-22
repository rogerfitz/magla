var graph = require('./graph');
var freebase = require('./freebase');

function expand(name){
	console.log(name);
	freebase.getGraph(name, 1, function(r){
		r.forEach(function(entry){
			graph.prepareEntry(entry, function(cleaned){
				graph.addPair(cleaned, function(callback){
					graph.addRel(cleaned);
				});
			})
		})
	});
}