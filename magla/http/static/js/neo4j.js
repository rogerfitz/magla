var neo4j = neo4j || {};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = neo4j;
}

var db_url = $('#db_url').data().db_url;//From Meta
var cypher_url = db_url+'/db/data/cypher'
neo4j.getEles = function()
{
	return {
    nodes: [
      { data: { id: 'genre', name: 'Genres', img_url : 'http://' } },//Should eventuall
    ],
    edges: []
  }
}

//Gets nodes from a label. Returns in Cyto form
neo4j.fromLabel = function(label)
{

	//var query = "START root=node(*) where has(root.name) and root.name ='"+temp+"' RETURN ID(root),root.name ";
	var query = "MATCH (n:`"+label+"`) RETURN n LIMIT 25"
	var res = ''
	$.ajax({
		type:"POST",
		url: cypher_url,
		accepts: "application/json",
		dataType: "json",
		async: false,
		
		headers: { 
		  "X-Stream": "true"    
		},
		data:{ "query" : query, },
		success: function(data, textStatus, jqXHR){

			var nodes = nodesToCyto(data);
			nodes.push({ data: { id: label, name: 'Genres', img_url : 'http://' } } )
			var edges = elesFromRoot(label, nodes);

			res = {'nodes': nodes, 'edges': edges};
		},
		
		error: function(jqXHR, textStatus, errorThrown){
		 //alert(errorThrown);
		 console.log(textStatus);
		 return(textStatus)
		}
	  });//end of ajax
	return res
		
		
}

function nodesToCyto(data)
{
	var nodes = []
	data.data.forEach(function(node) {
		nodes.push({'data': node[0].data})
	})
	return nodes
	//console.log(data.data);
}

function elesFromRoot(id, nodes)
{
	var edges = []
	nodes.forEach(function(node){
		edges.push({data: { source: id, target: node.data.id }})
	})
	return edges;
}