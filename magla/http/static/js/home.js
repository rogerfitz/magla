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
      name: 'breadthfirst',
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
    

  //custom dblClk because maxkfranz is a stupid fucking liberal
  var tappedBefore = null;
  cy.on('click', function(event, b) {
    var tappedNow = event.cyTarget;
    var timer = setTimeout(function(){if (tappedBefore === tappedNow){
      //SINGLE CLICK
      tappedBefore = null;
      tappedNow.trigger('clk');
      }
    }, 300);
    if(tappedBefore === tappedNow) 
    {
      tappedBefore = null;
      tappedNow.trigger('dblClk');    
    } else {
      tappedBefore = tappedNow;
    }
  });

  cy.on('clk', 'node', function(){
    console.log(this.data());
  })
  cy.on('dblClk', 'node', function(){
    console.log('Get Children');
    var n = neo4j.getChildren(this);
    console.log(n.nodes)
    cy.add(n.nodes)
    cy.add(n.edges)
    cy.layout({
      name: 'breadthfirst',
      fit: false,
      directed: true,
      gravity: true,
      avoidOverlap: true,
      infinite: true,
      animate: true,
      friction: 10,
      //fps: 1,
      stiffness: 1001,

      repulsion: 10000,
    });
  });

  cy.on('cxttap', 'node', function(){
    console.log('rght');
    window.open(this.data().wiki_url, '_blank');
  });
cy.panningEnabled(true)

}); // eof

