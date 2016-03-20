from py2neo import Graph, Node
import py2neo
import simplejson as json
from helpers import labelList
from shitjson import properDump
import requests

graph = Graph()
#py2neo.schema.SchemaResource.create_index('video', 'id')
db_url = 'http://localhost:7474'
api_key = 'AIzaSyA5b9ihq5IWV6GCdNhwcAh16EVmQJOBG_E'
cypher_url = db_url+'/db/data/cypher'

def computeLabels(video):
	labels=['video']
	if 'full' in video['title']:
		print video['title']
		print 'hi'
	print ', '.join(labels)
	return ', '.join(labels)

def buildVideos(videos):
	for v in videos:
		rels = v['related']
		del v['related']
		node1 = Node.cast(v)
		node1.labels.add(computeLabels(v))


		graph.create(node1)
		for r in rels:
			node2 = Node("video", id=r)
			graph.create((node1, "yRel", node2))

def get(id):
	for v in graph.cypher.execute("match (p:video {id: '"+id+"'}) RETURN p"):
		print v



if __name__ == "__main__":
	get('AqajUg85Ax4')