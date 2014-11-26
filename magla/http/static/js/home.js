$(function(){ // on dom ready


  console.log()
  
  var tooltips = $('#cy').qtip({
         id: 'sampletooltip',
    content: {
        text: 'Hi. I am a sample tooltip!',
        title: 'Sample tooltip'
    }
  });
  var qtipApi = tooltips.qtip('api');
  qtipApi.toggle(true);

  console.log(qtipApi.get('content.text'));
  qtipApi.set('position.target', [500,500]);


  console.log(qtipApi.get('position'));

  
 
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

cy.on('mouseover','node', function(event){
  console.log(this);
  var x=event.cyPosition.x;
  var y=event.cyPosition.y;
  console.log(x)       
  console.log(this)          
  console.log('/get?url='+this.data().wiki_url);
  var url = '/get?url='+this.data().wiki_url
  url = '/get?url=https://www.youtube.com/watch?v=a3HemKGDavw'
  var videoID = url.match(/(youtu\.be\/|&*v=|\/v\/|\/embed\/)+([A-Za-z0-9\-_]{5,11})/);
  
  videoID=videoID[2]
  console.log(videoID)

  $("#cy").qtip({
    content: $('<div />', { id: videoID }),
    /*
    content: {
        text: function(event2, api) {
            $.ajax({
                url: url
                //url: 'http://qtip2.com/demos/data/owl'
            })
            .then(function(content) {
                // Set the tooltip content upon successful retrieval
                api.set('content.text', '<iframe src='+url+'>');
                console.log(content)
            }, function(xhr, status, error) {
                // Upon failure... set the tooltip content to error
                api.set('content.text', status + ': ' + error);
            });

            return 'Loading...'; // Set some initial text
        }
    },
    */
    position: {
        viewport: $(window),
        target: [x+3, y+3],
        adjust: 
        {
          x: 10,
          y:7
        }
    },
    style: 
    {
      classes: 'qtip-youtube',
      width: 295,
    },
    events: {
            render: function(event, api) {
                new YT.Player(videoID, {
                    playerVars: {
                        autoplay: 1,
                        enablejsapi: 1,
                        origin: document.location.host
                    },
                    origin: document.location.host,
                    height: 180,
                    width: 275,
                    videoId: videoID,
                    events: {
                        'onReady': function(e) {
                          
                            api.player = e.target;
                            ///api.player.mute();
                        },
                    }
                });
            },
            hide: function(event, api){
                api.player && api.player.stopVideo();
            },
          },
    
    show: 
    {
      delay: 0,
      event: false,
      ready: true,
      effect:false
    },

    hide: 'unfocus'
                
    
    /*
    position: 
    {


      target: [x+3, y+3],
      adjust: 
      {
        x: 100,
        y:7
      }

    },
    hide: 
    {
      fixed: true,
      event: false,
      inactive: 2000
    },
  */
  });
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

  //Need to rewrite all event codes. 
  //Normalized events cause experience to suffer for both PC and mobile. Or as maxkfranz would say "both function equally well"
  cy.on('cxttap', 'node', function(){
    window.open(this.data().wiki_url, '_blank');
  });
cy.panningEnabled(true)


}); // eof

