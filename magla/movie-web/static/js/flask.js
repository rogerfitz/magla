var flask = flask || {};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = flask;
}

//Gets nodes from a label. Returns in Cyto form
flask.getNext = function()
{

	//var query = "START root=node(*) where has(root.name) and root.name ='"+temp+"' RETURN ID(root),root.name ";
	var query = "MATCH (n:`"+label+"`) RETURN n LIMIT 25"
	var res = ''
	$.ajax({
		type:"POST",
		url: 'flask',
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
