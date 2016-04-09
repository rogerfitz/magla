$(function(){ // on dom ready

// photos from flickr with creative commons license
  
var cy = cytoscape({
  container: document.getElementById('cy'),
  
  boxSelectionEnabled: false,
  autounselectify: true,
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)',
        'height': 60,
        'width': 60,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5
      })
    .selector('.eating')
      .css({
        'border-color': 'red'
      })
    .selector('.eater')
      .css({
        'border-width': 9
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })
    .selector('#bird')
      .css({
        'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
      })
    .selector('#cat')
      .css({
        'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
      })
    .selector('#ladybug')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
  .selector('#aphid')
      .css({
        'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
      })
  .selector('#rose')
      .css({
        'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
      })
  .selector('#grasshopper')
      .css({
        'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
      })
  .selector('#plant')
      .css({
        'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
      })
  .selector('#wheat')
      .css({
        'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
      }),
  
  elements: {'edges': [{'data': {'source': 'The Shawshank Redemption',
    'target': 'Pulp Fiction'}},
  {'data': {'source': 'The Shawshank Redemption', 'target': 'Forrest Gump'}},
  {'data': {'source': 'The Shawshank Redemption', 'target': 'L\xe9on'}},
  {'data': {'source': 'The Shawshank Redemption', 'target': 'The Lion King'}},
  {'data': {'source': 'The Godfather: Part II', 'target': 'Chinatown'}},
  {'data': {'source': 'The Dark Knight', 'target': 'WALL\xb7E'}},
  {'data': {'source': 'The Dark Knight', 'target': 'Gran Torino'}},
  {'data': {'source': 'The Dark Knight', 'target': 'Yip Man'}},
  {'data': {'source': 'Pulp Fiction', 'target': 'Forrest Gump'}},
  {'data': {'source': 'Pulp Fiction', 'target': 'L\xe9on'}},
  {'data': {'source': 'Pulp Fiction', 'target': 'The Lion King'}},
  {'data': {'source': "Schindler's List",
    'target': 'In the Name of the Father'}},
  {'data': {'source': "Schindler's List", 'target': 'Jurassic Park'}},
  {'data': {'source': "Schindler's List", 'target': 'Groundhog Day'}},
  {'data': {'source': '12 Angry Men', 'target': 'Paths of Glory'}},
  {'data': {'source': '12 Angry Men',
    'target': 'The Bridge on the River Kwai'}},
  {'data': {'source': '12 Angry Men', 'target': 'Det sjunde inseglet'}},
  {'data': {'source': 'The Lord of the Rings: The Return of the King',
    'target': 'Oldeuboi'}},
  {'data': {'source': 'The Lord of the Rings: The Return of the King',
    'target': 'Finding Nemo'}},
  {'data': {'source': 'The Lord of the Rings: The Return of the King',
    'target': 'Kill Bill: Vol. 1'}},
  {'data': {'source': 'The Lord of the Rings: The Return of the King',
    'target': 'Pirates of the Caribbean: The Curse of the Black Pearl'}},
  {'data': {'source': 'Fight Club', 'target': 'The Matrix'}},
  {'data': {'source': 'Fight Club', 'target': 'The Green Mile'}},
  {'data': {'source': 'Fight Club', 'target': 'American Beauty'}},
  {'data': {'source': 'Fight Club', 'target': 'The Sixth Sense'}}],
 'nodes': [{'data': {'id': 'The Shawshank Redemption'}},
  {'data': {'id': 'Pulp Fiction'}},
  {'data': {'id': 'Forrest Gump'}},
  {'data': {'id': 'L\xe9on'}},
  {'data': {'id': 'The Lion King'}},
  {'data': {'id': 'The Godfather'}},
  {'data': {'id': 'The Godfather: Part II'}},
  {'data': {'id': 'Chinatown'}},
  {'data': {'id': 'The Dark Knight'}},
  {'data': {'id': 'WALL\xb7E'}},
  {'data': {'id': 'Gran Torino'}},
  {'data': {'id': 'Yip Man'}},
  {'data': {'id': 'Pulp Fiction'}},
  {'data': {'id': 'Forrest Gump'}},
  {'data': {'id': 'L\xe9on'}},
  {'data': {'id': 'The Lion King'}},
  {'data': {'id': "Schindler's List"}},
  {'data': {'id': 'In the Name of the Father'}},
  {'data': {'id': 'Jurassic Park'}},
  {'data': {'id': 'Groundhog Day'}},
  {'data': {'id': '12 Angry Men'}},
  {'data': {'id': 'Paths of Glory'}},
  {'data': {'id': 'The Bridge on the River Kwai'}},
  {'data': {'id': 'Det sjunde inseglet'}},
  {'data': {'id': 'The Lord of the Rings: The Return of the King'}},
  {'data': {'id': 'Oldeuboi'}},
  {'data': {'id': 'Finding Nemo'}},
  {'data': {'id': 'Kill Bill: Vol. 1'}},
  {'data': {'id': 'Pirates of the Caribbean: The Curse of the Black Pearl'}},
  {'data': {'id': 'Il buono, il brutto, il cattivo'}},
  {'data': {'id': 'Fight Club'}},
  {'data': {'id': 'The Matrix'}},
  {'data': {'id': 'The Green Mile'}},
  {'data': {'id': 'American Beauty'}},
  {'data': {'id': 'The Sixth Sense'}}]},
  
  layout: {
    name: 'cose'
  }
}); // cy init
  
cy.on('tap', 'node', function(){
  var nodes = this;
  var tapped = nodes;
  var food = [];
  
  nodes.addClass('eater');
  
  for(;;){
    var connectedEdges = nodes.connectedEdges(function(){
      return !this.target().anySame( nodes );
    });
    
    var connectedNodes = connectedEdges.targets();
    
    Array.prototype.push.apply( food, connectedNodes );
    
    nodes = connectedNodes;
    
    if( nodes.empty() ){ break; }
  }
        
  var delay = 0;
  var duration = 500;
  for( var i = food.length - 1; i >= 0; i-- ){ (function(){
    var thisFood = food[i];
    var eater = thisFood.connectedEdges(function(){
      return this.target().same(thisFood);
    }).source();
            
    thisFood.delay( delay, function(){
      eater.addClass('eating');
    } ).animate({
      position: eater.position(),
      css: {
        'width': 10,
        'height': 10,
        'border-width': 0,
        'opacity': 0
      }
    }, {
      duration: duration,
      complete: function(){
        thisFood.remove();
      }
    });
    
    delay += duration;
  })(); } // for
  
}); // on tap

}); // on dom ready
