function playVideo(node)
{
  var x=node.position().x;
  var y=node.position().y;
  console.log('/get?url='+node.data().wiki_url);
  var url = '/get?url='+node.data().wiki_url

  //Video
  url = '/get?url=https://www.youtube.com/watch?v=a3HemKGDavw'
  var videoID = url.match(/(youtu\.be\/|&*v=|\/v\/|\/embed\/)+([A-Za-z0-9\-_]{5,11})/);
  
  videoID=videoID[2]

  $("#cy").qtip({
    content: $('<div />', { id: videoID }),
    position: {
        viewport: $(window),
        target: [1300, 50],
        adjust: 
        {
          x: 5,
          y:5,
        }
    },
    style: 
    {
      classes: 'qtip-youtube',
      tip: false,
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
                            api.player.mute();
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
                
    });
}

$(function(){ // on dom ready

  var tooltips = $('#cy').qtip({
         id: 'sampletooltip',
    content: {
        text: 'Hi. I am a sample tooltip!',
        title: 'Sample tooltip'
    }
  });
  var qtipApi = tooltips.qtip('api');
  qtipApi.toggle(true);

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
          'z-index': 100,
          
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
    },
    ready: function(){ 
      //Change to custom HTML canvas element seperate from cytoscape universe. PIN to bottom of viewable canvas
      cy.add({ group: "nodes", 
        data: { id: "queue", img_url: 'http://' }, 
        position: { x: 100, y: 100 }, 
        css: {'background-color': 'blue', height: 125, width: 200, shape: 'roundrectangle', 'z-index': 0} })
        }
  }); // cy init
  cy.cxtmenu({
            commands: [
              {
                content: '<span class="fa fa-play fa-2x"></span>',
                select: function(){
                  playVideo(this);
                  console.log( this.id() );
                }
              },
              {
                content: '<span class="fa fa-plus fa-2x"></span>',
                select: function(){
                  var c = document.getElementById('cy')//.getContext("2d");
                  var ctx = c.getContext('2d');
                  ctx.fillStyle = "Red";
                  ctx.fillRect(0,0,150,75);
                  console.log( this.data('name') );
                }
              },
              {
                content: 'Position',
                select: function(){
                  console.log( this.position() );
                }
              }
            ]
          });
  cy.panningEnabled(true)
  
  
    
/*
  //custom dblClk because maxkfranz is a stupid fucking liberal
  var tappedBefore = null;
  cy.on('click', function(event) {
    var tappedNow = event.cyTarget;
    var origEvent = event;
    var timer = setTimeout(function(){if (tappedBefore === tappedNow){
      //SINGLE CLICK
      tappedBefore = null;
      console.log(origEvent);
      tappedNow.trigger('clk', origEvent);
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
*/
/*
//Video
cy.on('click','node', function(event){
  console.log(this);
  console.log('event');
  console.log(event);
  var x=event.cyPosition.x;
  var y=event.cyPosition.y;
  console.log(x)       
  console.log(this)          
  console.log('/get?url='+this.data().wiki_url);
  var url = '/get?url='+this.data().wiki_url

  //Video
  url = '/get?url=https://www.youtube.com/watch?v=a3HemKGDavw'
  var videoID = url.match(/(youtu\.be\/|&*v=|\/v\/|\/embed\/)+([A-Za-z0-9\-_]{5,11})/);
  
  videoID=videoID[2]
  console.log(videoID)

  $("#cy").qtip({
    content: $('<div />', { id: videoID }),
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
                
    });
  });

  cy.on('mouseover', 'node', function(){
    console.log(this.data());
  })

  cy.on('grab', 'node', function(event){
    console.log(event)
    var x=event.cyTarget.position.x;
    var y=event.cyTarget.position.y;
    console.log('drag');
    var data = jQuery.extend(true, {},this.data())//Obj copy
    data['id']+='.'
    data['class']='clone'
    data['z-index']=500
    console.log(this.data())
    console.log(data)
    
    cy.add({ group: "nodes", 
        data: data, 
        position: { x: x, y: y+10 }, 
        })

    cy.layout({
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
      liveUpdate: false,
    });
    
  })
  //Need to rewrite all event codes. 
  //Normalized events cause experience to suffer for both PC and mobile. Or as maxkfranz would say "both function equally well"
  cy.on('cxttap', 'node', function(){
    window.open(this.data().wiki_url, '_blank');
  });

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
*/



}); // eof


