var freebase = require("freebase");
var async = require("async");

//get influences
function getInflGraph(rootName, depth, inflGraph){
	var graph = {}
	//var name = rootName
	var tasks = []
	if (depth>0){
		getInfluences(rootName, function(graph){
			influences=graph[rootName]
			influences.forEach(function(influence){
				tasks.push(function(callback){
					getInfluences(influence['name'], function(r){
						graph[influence['name']]=r[influence['name']]
						callback();
					});
				});
			});
			async.parallel(tasks, function(r){
				inflGraph(graph);
			});
		});
	}	
	else {
		getInfluences(rootName, function(graph){
			inflGraph(graph);
		});
	}
}

function getGraph(name, depth, callback){
	freebase.graph(name, {"depth": 2}, function(r){
	    callback(r);
	})

}



function infDepth(name, depth, callback){
	var global = []
	var count = 0

	function append(names, callback){
		global.push(names);
		count++;
		callback(global);
	}

	function recur(name, depth){
		names=[]
		getInfluences(name, function(graph){
			influences=graph[name]
			async.forEach(influences, function(influence, callFor){
				names.push(influence['name'])
				if (depth>0)
					append(names, function(){
						recur(influence['name'], depth-1)
					});
				else
					append(names, function(names){
						callFor(names);
					});
				callback(callFor);
			});

				
		})
	}

	recur(name, depth);
	//callback(global);
}

function removeNames(graph, newGraph){
	for (var key in graph){
		delete graph[key]['names'];
	}
	newGraph();
}

function getInfluences(name, callback){
	var infDict = {};
	freebase.outgoing(name, {}, function(r){
		//console.log(r)
		infDict[name] = []
		var isInf=false;
		try {
		    r.map(function(varr){
		    	var influence = {}
		    	influence.property=[]
		    	//console.log(varr)
		    	if (typeof varr.property == 'string'){
		    		if ((varr.property).indexOf("influence") > -1){
		    			influence.name=varr.name
		    			influence.freebase_id=varr.id
		    			influence.property.push(varr.property)
		    			infDict[name].push(influence);
		    		}
		    	}
		    	else{
		        	(varr.property).forEach(function(property){
		        		if (property.indexOf("influence") > -1){
		        			influence.property.push(property);
		        			isInf=true
		        			}
		        		})
		        	if(isInf){
		        		influence.name=varr.name
		        		influence.freebase_id=varr.id
		        		infDict[name].push(influence)
		        		isInf=false
		        	}
		        	
		        }
		        
	    	})
	    }
	    catch(ex) {
	    	console.log(name+' has no influences');
	    }

	    if (typeof callback=="function")
	    	//console.log(infDict);
	    	callback(infDict);
	});
}

//get link schema
function getLinkSchema(name){
	freebase.outgoing("Jimi Hendrix", {}, function(r){
		var schema = {}
	    r.map(function(varr){
	    	//console.log(varr)
	    	if (typeof varr.property == 'string'){
	    		if (! (varr.property in schema))
	    				schema[varr.property]=""
	    	}
	    	else{
	        	(varr.property).forEach(function(property){
	        		if (! (property in schema))
	    				schema[property]=""
	    			})
	        	}
	    	}) 
	    console.log(Object.keys(schema))
	})
}

//getLinkSchema("Jimi Hendrix");
module.exports.getInfluences = getInfluences;
module.exports.getInflGraph = getInflGraph;
module.exports.getLinkSchema = getLinkSchema;
module.exports.getGraph = getGraph;
module.exports.infDepth = infDepth;

infDepth("Jimi Hendrix", 0, function(callback){
	console.log(callback);
});

//freebase.sentence("Jimi Hendrix", {}, console.log);
//freebase.search("Jimi Hendrix", {}, console.log);

//freebase.inside("montreal", {}, console.log);

//freebase.notable("Jimi Hendrix", {}, console.log);
//getInfluences("Jimi Hendrix");

//freebase.from_category("Category:Blues", {depth: 2}, console.log)
//freebase.wikipedia_page("Jimi Hendrix", {}, console.log)
//freebase.wikipedia_categories("Jimi Hendrix", {}, console.log)
//freebase.wikipedia_categories("Blues", {depth: 2}, console.log)