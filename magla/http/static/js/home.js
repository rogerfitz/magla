$(function(){ // on dom ready


console.log()



var cy = cytoscape({
  container: document.getElementById('cy'),
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5,
        'background-color': 'white',
        'background-image': 'data(img_url)',
        'content': 'data(name)',//'Jimi Hendrix',
        'text-valign': 'bottom',
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })
    ,
  
  elements: neo4j.fromLabel('genre'),
  
  //shift to arbor. Fix resume problem
  layout: {
    name: 'arbor',
    fit: false,
    directed: true,
    gravity: true,
    avoidOverlap: true,
    infinite: true,
    animate: true,
    stiffness: 0.001,
    damping: .6,
    padding: 5,
    edgeLength: 1,
    liveUpdate: true,
  }
}); // cy init
  
cy.on('tap', 'node', function(){
  var nodes = this;
  var tapped = nodes;
  var food = [];
  console.log(this.data());
  }); 
console.log(neo4j.fromLabel('genre'));
  
cy.panningEnabled(true)
}); // eof
