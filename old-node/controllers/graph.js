var neo4j = require('neo4j-js');
var lazy=require("lazy");
var fs = require('fs');
var freebase = require('./freebase');
var async = require('async');


// cypher url
var db_url = 'http://192.168.1.34:7474/db/data/';

function sendQuery(query, res) {
	//query=query.replace(/"/g, '\\"')
	neo4j.connect(db_url, function(err, graph) {
		if (err)
			throw err;
	//var batch = graph.createBatch();
		graph.query(query, function(err, results) {
			if (err) {
				console.log(err);
				console.log(err.stack);
			}
			//console.log(results);
			if (typeof res=="function"){
				res(results);
			}
		});
	});
}


function labelList(file, type) {
	neo4j.connect(db_url, function(err, graph) {
		
		if (err)
			throw err;
		console.log('hi');
	//var batch = graph.createBatch();
		new lazy(fs.createReadStream(file))
		.lines
		.forEach(function(genre){
			query = "MATCH (n:`Page`) WHERE n.title = '"+genre+"' set n :"+type+" RETURN n";
			console.log(query);
			graph.query(query, function(err, results) {
				if (err) {
					console.log(err);
					console.log(err.stack);
				}
				console.log(results);
				console.log(JSON.stringify(results, null, 5));
			});
		});
		
	});
}

function addInfluences(name, depth, call){
	freebase.getInflGraph(name, depth, function(graph){
		function createNodes(callback){
			var nodes = []
			async.forEach(Object.keys(graph), function(name, callback){
				async.forEach(graph[name], function(influence, callback){
					nodes.push(influence['name']);
					callback();					
				});
				callback();
			});

			mergeNodes(nodes, function(done){
				callback();
			});
			callback();
		}

		function buildRels(done2){
			createNodes(function(callback){
				var rels=[]
				//console.log('hi');
				async.forEach(Object.keys(graph), function(key, callback){
					async.forEach(graph[key], function(influence, callback){
						influence['property'].forEach(function(p){
							//console.log('hi');
							var rel={}
							rel.a=key
							rel.b=influence['name']
							rel.prop=p.match(/\/([^/]*)$/)[1]
							rels.push(rel);
						});
						callback();
					});
					callback();		
				});
				done2(rels);
			});
		}

		buildRels(function(rels){
			//console.log(rels);
			buildRelationships(rels);
		});
		
	});
}

function cleanData(data, cleaned){
	function clean(key, value){
		//console.log(value+'&&&&&&&&&&&');
		//if (Object.prototype.toString.call(value) === '[object Array]')
			//return ' ';
		return value;
	}
	data = JSON.stringify(data, clean, 1)
	data = data.replace(/\"([^(\")"]+)\":/g,"$1:");
	//console.log(data+'&&&&&&&&&&&&&');
	cleaned(data);
}

//TODO add more than just name features
function mergeNodes(names, done) {
	for (var i in names){
		query = 'MERGE (n:Person:Writer { name: "'+names[i].replace(/"/g, '\\"')+'" }) return n;'
		//console.log(query);
		sendQuery(query);
	}
}

function buildRelationships(rels){
	rels.forEach(function(rel){
		query = 'MATCH (a { name: "'+rel.a.replace(/"/g, '\\"')+'" }) MATCH (b { name: "'+rel.b.replace(/"/g, '\\"')+'" }) CREATE UNIQUE (a)-[:'+rel.prop+']-(b) return b;'
		console.log(query);
		sendQuery(query);
	});
}

function getUnlinked(label){
	query = 'MATCH (a:`'+label+'`) WHERE NOT (a)-[]->()-[]->() return a.name;'
	//console.log(query);
	sendQuery(query, function(res){
		for (var i in res){
			addInfluences(res[i]['a.name'], 0);
		}
	});
}

function expand(rootName, depth){
	freebase.infDepth(rootName, depth, function(names){
		names.forEach(function(name){
			console.log(name);
			freebase.getGraph(name, 1, function(r){
				r.forEach(function(entry){
					prepareEntry(entry, function(cleaned){
						addPair(cleaned, function(callback){
							addRel(cleaned);
						});
					})
				})
			});
		})
	})
}

function cleanLabels(obj, labels){
	try {
		labels((obj['type'].join("`:`")))
	}
	catch (ex){
		labels("undefined");
	}
}

function addPair(pair, callback){
	buildNode(pair['object'])
	buildNode(pair['subject'])
	callback();
}

function buildNode(obj) {
	dataStr = JSON.stringify(obj)
	dataStr = dataStr.replace(/\"([^(\")"]+)\":/g,"$1:");
	labels=obj['labels']
	query = 'MERGE (n:`'+labels+'` '+dataStr+') return n;'
	//console.log(query);
	sendQuery(query);
}

function addRel(pair){
	objData = JSON.stringify(pair['object']).replace(/\"([^(\")"]+)\":/g,"$1:")
	subjData = JSON.stringify(pair['subject']).replace(/\"([^(\")"]+)\":/g,"$1:")
	query = 'MATCH (a :`'+pair['object']['labels']+'` '+objData+') MATCH (b :`'+pair['subject']['labels']+'` '+subjData+') CREATE UNIQUE (a)-[:`'+pair['relation']+'`]-(b) return b;'
	//console.log(query);
	sendQuery(query);
}

function prepareEntry(entry, cleaned){
	subject=entry['subject']
	object=entry['object']
	object['mid']=object['id']
	relation=entry['subject']['property']
	if (relation === undefined)
		relation=entry['object']['property']

	delete subject.property
	delete object.property
	delete subject.direction
	delete subject['relevance:score']
	delete object['relevance:score']
	cleanLabels(object, function(labels){
		object['labels']=labels;
		delete object.type
		cleanLabels(subject, function(slabels){
			subject['labels']=slabels
			delete subject.type
		})
		obj={"object": object, "subject": subject, "relation": relation}
		cleaned(obj);
	})
	
}

module.exports.addPair = addPair;
module.exports.addRel = addRel;
module.exports.prepareEntry = prepareEntry;

//addInfluences('Jimi Hendrix', 0);
//addInfluences('Roald Dahl', 1);
//getUnlinked('Musician');
//freebase.getLinkSchema("Jimi Hendrix");

expand("Jimi Hendrix", 2);

//labelList('../data/genre.txt', 'Genre');
//exports.queryGraph = function(q){
//};
