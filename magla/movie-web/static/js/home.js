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
      }),
  
  elements: {"nodes": [{"data": {"id": "The Shawshank Redemption", "related": "Pulp Fiction|Forrest Gump|Léon|The Lion King|\"Friends\""}}, {"data": {"id": "Pulp Fiction"}}, {"data": {"id": "Forrest Gump"}}, {"data": {"id": "Léon"}}, {"data": {"id": "The Lion King"}}, {"data": {"id": "The Godfather", "related": ""}}, {"data": {"id": "The Godfather: Part II", "related": "Chinatown"}}, {"data": {"id": "Chinatown"}}, {"data": {"id": "The Dark Knight", "related": "WALL·E|Gran Torino|Yip Man|\"Breaking Bad\"|\"Fringe\""}}, {"data": {"id": "WALL·E"}}, {"data": {"id": "Gran Torino"}}, {"data": {"id": "Yip Man"}}, {"data": {"id": "Pulp Fiction", "related": "Forrest Gump|Léon|The Lion King|\"Friends\""}}, {"data": {"id": "Forrest Gump"}}, {"data": {"id": "Léon"}}, {"data": {"id": "The Lion King"}}, {"data": {"id": "Schindler's List", "related": "In the Name of the Father|Jurassic Park|Groundhog Day"}}, {"data": {"id": "In the Name of the Father"}}, {"data": {"id": "Jurassic Park"}}, {"data": {"id": "Groundhog Day"}}, {"data": {"id": "12 Angry Men", "related": "Paths of Glory|The Bridge on the River Kwai|Det sjunde inseglet"}}, {"data": {"id": "Paths of Glory"}}, {"data": {"id": "The Bridge on the River Kwai"}}, {"data": {"id": "Det sjunde inseglet"}}, {"data": {"id": "The Lord of the Rings: The Return of the King", "related": "Oldeuboi|Finding Nemo|Kill Bill: Vol. 1|Pirates of the Caribbean: The Curse of the Black Pearl|\"Arrested Development\""}}, {"data": {"id": "Oldeuboi"}}, {"data": {"id": "Finding Nemo"}}, {"data": {"id": "Kill Bill: Vol. 1"}}, {"data": {"id": "Pirates of the Caribbean: The Curse of the Black Pearl"}}, {"data": {"id": "Il buono, il brutto, il cattivo", "related": ""}}, {"data": {"id": "Fight Club", "related": "The Matrix|The Green Mile|American Beauty|The Sixth Sense|\"Family Guy\"|\"Futurama\""}}, {"data": {"id": "The Matrix"}}, {"data": {"id": "The Green Mile"}}, {"data": {"id": "American Beauty"}}, {"data": {"id": "The Sixth Sense"}}, {"data": {"id": "The Lord of the Rings: The Fellowship of the Ring", "related": "Sen to Chihiro no kamikakushi|Le fabuleux destin d'Amélie Poulain|A Beautiful Mind|Donnie Darko|Monsters, Inc.|\"24\"|\"Band of Brothers\"|\"Scrubs\""}}, {"data": {"id": "Sen to Chihiro no kamikakushi"}}, {"data": {"id": "Le fabuleux destin d'Amélie Poulain"}}, {"data": {"id": "A Beautiful Mind"}}, {"data": {"id": "Donnie Darko"}}, {"data": {"id": "Monsters, Inc."}}, {"data": {"id": "Star Wars: Episode V - The Empire Strikes Back", "related": "The Shining|Raging Bull|The Elephant Man"}}, {"data": {"id": "The Shining"}}, {"data": {"id": "Raging Bull"}}, {"data": {"id": "The Elephant Man"}}, {"data": {"id": "Forrest Gump", "related": "Léon|The Lion King|\"Friends\""}}, {"data": {"id": "Léon"}}, {"data": {"id": "The Lion King"}}, {"data": {"id": "Inception", "related": "Toy Story 3|How to Train Your Dragon|Shutter Island|The King's Speech|\"Boardwalk Empire\"|\"Downton Abbey\"|\"Pretty Little Liars\"|\"Sherlock\""}}, {"data": {"id": "Toy Story 3"}}, {"data": {"id": "How to Train Your Dragon"}}, {"data": {"id": "Shutter Island"}}, {"data": {"id": "The King's Speech"}}, {"data": {"id": "One Flew Over the Cuckoo's Nest", "related": "Monty Python and the Holy Grail|Jaws|Dog Day Afternoon"}}, {"data": {"id": "Monty Python and the Holy Grail"}}, {"data": {"id": "Jaws"}}, {"data": {"id": "Dog Day Afternoon"}}, {"data": {"id": "The Lord of the Rings: The Two Towers", "related": "Cidade de Deus|The Pianist|Catch Me If You Can|\"Firefly\""}}, {"data": {"id": "Cidade de Deus"}}, {"data": {"id": "The Pianist"}}, {"data": {"id": "Catch Me If You Can"}}, {"data": {"id": "Goodfellas", "related": ""}}, {"data": {"id": "The Matrix", "related": "The Green Mile|American Beauty|The Sixth Sense|\"Family Guy\"|\"Futurama\""}}, {"data": {"id": "The Green Mile"}}, {"data": {"id": "American Beauty"}}, {"data": {"id": "The Sixth Sense"}}, {"data": {"id": "Shichinin no samurai", "related": "Rear Window|Dial M for Murder"}}, {"data": {"id": "Rear Window"}}, {"data": {"id": "Dial M for Murder"}}, {"data": {"id": "Star Wars", "related": "Annie Hall"}}, {"data": {"id": "Annie Hall"}}, {"data": {"id": "Cidade de Deus", "related": "The Pianist|Catch Me If You Can|\"Firefly\""}}, {"data": {"id": "The Pianist"}}, {"data": {"id": "Catch Me If You Can"}}, {"data": {"id": "Se7en", "related": "The Usual Suspects|Braveheart|Toy Story|Heat|Casino|Before Sunrise|Twelve Monkeys"}}, {"data": {"id": "The Usual Suspects"}}, {"data": {"id": "Braveheart"}}, {"data": {"id": "Toy Story"}}, {"data": {"id": "Heat"}}, {"data": {"id": "Casino"}}, {"data": {"id": "Before Sunrise"}}, {"data": {"id": "Twelve Monkeys"}}, {"data": {"id": "The Silence of the Lambs", "related": "Terminator 2: Judgment Day|Beauty and the Beast"}}, {"data": {"id": "Terminator 2: Judgment Day"}}, {"data": {"id": "Beauty and the Beast"}}, {"data": {"id": "The Usual Suspects", "related": "Braveheart|Toy Story|Heat|Casino|Before Sunrise|Twelve Monkeys"}}, {"data": {"id": "Braveheart"}}, {"data": {"id": "Toy Story"}}, {"data": {"id": "Heat"}}, {"data": {"id": "Casino"}}, {"data": {"id": "Before Sunrise"}}, {"data": {"id": "Twelve Monkeys"}}, {"data": {"id": "It's a Wonderful Life", "related": ""}}, {"data": {"id": "La vita è bella", "related": "Mononoke-hime|L.A. Confidential|Good Will Hunting"}}, {"data": {"id": "Mononoke-hime"}}, {"data": {"id": "L.A. Confidential"}}, {"data": {"id": "Good Will Hunting"}}, {"data": {"id": "Léon", "related": "The Lion King|\"Friends\""}}, {"data": {"id": "The Lion King"}}, {"data": {"id": "C'era una volta il West", "related": "2001: A Space Odyssey"}}, {"data": {"id": "2001: A Space Odyssey"}}, {"data": {"id": "Sen to Chihiro no kamikakushi", "related": "Le fabuleux destin d'Amélie Poulain|A Beautiful Mind|Donnie Darko|Monsters, Inc.|\"24\"|\"Band of Brothers\"|\"Scrubs\""}}, {"data": {"id": "Le fabuleux destin d'Amélie Poulain"}}, {"data": {"id": "A Beautiful Mind"}}, {"data": {"id": "Donnie Darko"}}, {"data": {"id": "Monsters, Inc."}}, {"data": {"id": "Saving Private Ryan", "related": "American History X|Lock, Stock and Two Smoking Barrels|The Big Lebowski|The Truman Show"}}, {"data": {"id": "American History X"}}, {"data": {"id": "Lock, Stock and Two Smoking Barrels"}}, {"data": {"id": "The Big Lebowski"}}, {"data": {"id": "The Truman Show"}}], "edges": [{"data": {"source": "The Shawshank Redemption", "target": "Pulp Fiction"}}, {"data": {"source": "The Shawshank Redemption", "target": "Forrest Gump"}}, {"data": {"source": "The Shawshank Redemption", "target": "Léon"}}, {"data": {"source": "The Shawshank Redemption", "target": "The Lion King"}}, {"data": {"source": "The Godfather: Part II", "target": "Chinatown"}}, {"data": {"source": "The Dark Knight", "target": "WALL·E"}}, {"data": {"source": "The Dark Knight", "target": "Gran Torino"}}, {"data": {"source": "The Dark Knight", "target": "Yip Man"}}, {"data": {"source": "Pulp Fiction", "target": "Forrest Gump"}}, {"data": {"source": "Pulp Fiction", "target": "Léon"}}, {"data": {"source": "Pulp Fiction", "target": "The Lion King"}}, {"data": {"source": "Schindler's List", "target": "In the Name of the Father"}}, {"data": {"source": "Schindler's List", "target": "Jurassic Park"}}, {"data": {"source": "Schindler's List", "target": "Groundhog Day"}}, {"data": {"source": "12 Angry Men", "target": "Paths of Glory"}}, {"data": {"source": "12 Angry Men", "target": "The Bridge on the River Kwai"}}, {"data": {"source": "12 Angry Men", "target": "Det sjunde inseglet"}}, {"data": {"source": "The Lord of the Rings: The Return of the King", "target": "Oldeuboi"}}, {"data": {"source": "The Lord of the Rings: The Return of the King", "target": "Finding Nemo"}}, {"data": {"source": "The Lord of the Rings: The Return of the King", "target": "Kill Bill: Vol. 1"}}, {"data": {"source": "The Lord of the Rings: The Return of the King", "target": "Pirates of the Caribbean: The Curse of the Black Pearl"}}, {"data": {"source": "Fight Club", "target": "The Matrix"}}, {"data": {"source": "Fight Club", "target": "The Green Mile"}}, {"data": {"source": "Fight Club", "target": "American Beauty"}}, {"data": {"source": "Fight Club", "target": "The Sixth Sense"}}, {"data": {"source": "The Lord of the Rings: The Fellowship of the Ring", "target": "Sen to Chihiro no kamikakushi"}}, {"data": {"source": "The Lord of the Rings: The Fellowship of the Ring", "target": "Le fabuleux destin d'Amélie Poulain"}}, {"data": {"source": "The Lord of the Rings: The Fellowship of the Ring", "target": "A Beautiful Mind"}}, {"data": {"source": "The Lord of the Rings: The Fellowship of the Ring", "target": "Donnie Darko"}}, {"data": {"source": "The Lord of the Rings: The Fellowship of the Ring", "target": "Monsters, Inc."}}, {"data": {"source": "Star Wars: Episode V - The Empire Strikes Back", "target": "The Shining"}}, {"data": {"source": "Star Wars: Episode V - The Empire Strikes Back", "target": "Raging Bull"}}, {"data": {"source": "Star Wars: Episode V - The Empire Strikes Back", "target": "The Elephant Man"}}, {"data": {"source": "Forrest Gump", "target": "Léon"}}, {"data": {"source": "Forrest Gump", "target": "The Lion King"}}, {"data": {"source": "Inception", "target": "Toy Story 3"}}, {"data": {"source": "Inception", "target": "How to Train Your Dragon"}}, {"data": {"source": "Inception", "target": "Shutter Island"}}, {"data": {"source": "Inception", "target": "The King's Speech"}}, {"data": {"source": "One Flew Over the Cuckoo's Nest", "target": "Monty Python and the Holy Grail"}}, {"data": {"source": "One Flew Over the Cuckoo's Nest", "target": "Jaws"}}, {"data": {"source": "One Flew Over the Cuckoo's Nest", "target": "Dog Day Afternoon"}}, {"data": {"source": "The Lord of the Rings: The Two Towers", "target": "Cidade de Deus"}}, {"data": {"source": "The Lord of the Rings: The Two Towers", "target": "The Pianist"}}, {"data": {"source": "The Lord of the Rings: The Two Towers", "target": "Catch Me If You Can"}}, {"data": {"source": "The Matrix", "target": "The Green Mile"}}, {"data": {"source": "The Matrix", "target": "American Beauty"}}, {"data": {"source": "The Matrix", "target": "The Sixth Sense"}}, {"data": {"source": "Shichinin no samurai", "target": "Rear Window"}}, {"data": {"source": "Shichinin no samurai", "target": "Dial M for Murder"}}, {"data": {"source": "Star Wars", "target": "Annie Hall"}}, {"data": {"source": "Cidade de Deus", "target": "The Pianist"}}, {"data": {"source": "Cidade de Deus", "target": "Catch Me If You Can"}}, {"data": {"source": "Se7en", "target": "The Usual Suspects"}}, {"data": {"source": "Se7en", "target": "Braveheart"}}, {"data": {"source": "Se7en", "target": "Toy Story"}}, {"data": {"source": "Se7en", "target": "Heat"}}, {"data": {"source": "Se7en", "target": "Casino"}}, {"data": {"source": "Se7en", "target": "Before Sunrise"}}, {"data": {"source": "Se7en", "target": "Twelve Monkeys"}}, {"data": {"source": "The Silence of the Lambs", "target": "Terminator 2: Judgment Day"}}, {"data": {"source": "The Silence of the Lambs", "target": "Beauty and the Beast"}}, {"data": {"source": "The Usual Suspects", "target": "Braveheart"}}, {"data": {"source": "The Usual Suspects", "target": "Toy Story"}}, {"data": {"source": "The Usual Suspects", "target": "Heat"}}, {"data": {"source": "The Usual Suspects", "target": "Casino"}}, {"data": {"source": "The Usual Suspects", "target": "Before Sunrise"}}, {"data": {"source": "The Usual Suspects", "target": "Twelve Monkeys"}}, {"data": {"source": "La vita è bella", "target": "Mononoke-hime"}}, {"data": {"source": "La vita è bella", "target": "L.A. Confidential"}}, {"data": {"source": "La vita è bella", "target": "Good Will Hunting"}}, {"data": {"source": "Léon", "target": "The Lion King"}}, {"data": {"source": "C'era una volta il West", "target": "2001: A Space Odyssey"}}, {"data": {"source": "Sen to Chihiro no kamikakushi", "target": "Le fabuleux destin d'Amélie Poulain"}}, {"data": {"source": "Sen to Chihiro no kamikakushi", "target": "A Beautiful Mind"}}, {"data": {"source": "Sen to Chihiro no kamikakushi", "target": "Donnie Darko"}}, {"data": {"source": "Sen to Chihiro no kamikakushi", "target": "Monsters, Inc."}}, {"data": {"source": "Saving Private Ryan", "target": "American History X"}}, {"data": {"source": "Saving Private Ryan", "target": "Lock, Stock and Two Smoking Barrels"}}, {"data": {"source": "Saving Private Ryan", "target": "The Big Lebowski"}}, {"data": {"source": "Saving Private Ryan", "target": "The Truman Show"}}]},
  
  layout: {
    name: 'cose'
  }
}); // cy init

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

function updateFocusDiv(data){
	
	$('#focusId').text("id: "+data['id'])
	$('#focusRelated').text("related: "+data['related'])
	$('#focusActors').text("actors: Mike Myers")
	$('#focusRating').html("rating: <a href='http://www.rottentomatoes.com/m/the_lord_of_the_rings_the_fellowship_of_the_ring/' target='_'>4.5</a>")
}  

function initializeSideBar(node){
	$('#work-list').append( "<div class='item'>"+node.data()['id']+"<br><a href='http://ergosum.co' target='iframe_a'>www.imbd.com</a><br><a href='http://ergosum.co' target='iframe_a'>www.rottentomatoes.com</a></div>" )
}
  
cy.on('tap', 'node', function(){
  var node = this;
  updateFocusDiv(node.data())
}); // on tap

cy.on('taphold', 'node', function() {
	var node = this;
	initializeSideBar(node)
}); //end hold

}); // on dom ready
