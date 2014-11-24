from . import *
from py2neo import cypher, neo4j
import simplejson as json
import search
from helpers import labelList
from shitjson import properDump
import requests

def buildNodes():
	session = cypher.Session(cypher_url)
	tx = session.create_transaction()

	artist=search.getArtists('blues', 200)

	count=0
	for a in artist:
		query = 'MERGE (n:`'+'/people/person`:`artist'+'` '+a+') return n;'
		print query
		tx.append(query)

		count+=1
		if (count % 10) == 0:
			count=0
			tx.execute()
	tx.commit()

#decorator? 
#cusom for each singular method
def queue():
	pass


#Takes in label list and data dict. Data should be cleaned
def buildNode(labels, data):
	session = cypher.Session(cypher_url)
	tx = session.create_transaction()
	if len(data.keys()) > 2: #hackish, might need to retrieve object before this logic or use multiple sets instead of 
		query = 'MERGE (n {mid: "'+data['mid']+'"}) ON MATCH set n='+properDump(data)+' ON MATCH set n'+labelList(labels)+' ON CREATE set n='+properDump(data)+' ON CREATE set n'+labelList(labels)+'return n;'
	else:
		query = 'MERGE (n'+labelList(labels)+' '+properDump(data)+') return n;'
	print query

	tx.append(query)
	tx.commit()

def buildRel(node1, node2, rel_type):
	session = cypher.Session(cypher_url)
	tx = session.create_transaction()
	if (node1['mid']==-1 and node2['mid']==-1):
		query = 'MATCH (a { name: "'+node1['name']+'"}) MATCH (b { name: "'+node2['name']+'"}) CREATE UNIQUE (a)-[:`'+rel_type+'`]-(b);'
	elif node2['mid']==-1:
		query = 'MATCH (a { mid: "'+node1['mid']+'"}) MATCH (b { name: "'+node2['name']+'"}) CREATE UNIQUE (a)-[:`'+rel_type+'`]-(b);'
	elif node1['mid']==-1:
		query = 'MATCH (a { name: "'+node1['name']+'"}) MATCH (b { mid: "'+node2['mid']+'"}) CREATE UNIQUE (a)-[:`'+rel_type+'`]-(b);'
	else:
		query = 'MATCH (a { mid: "'+node1['mid']+'"}) MATCH (b { mid: "'+node2['mid']+'"}) CREATE UNIQUE (a)-[:`'+rel_type+'`]-(b);'

	print query

	tx.append(query)
	tx.commit()
	

def getOrCreate():
	graph_db = neo4j.GraphDatabaseService(cypher_url)

	artist=search.getArtists('',100)

	count=0
	for a in artist:
		print graph_db.create(a)
		
	#def getNodes():

def getInfluences(mid):
	rels = getRels(mid)

	session = cypher.Session(cypher_url)
	tx = session.create_transaction()

	inf = []
	for rel in rels:
		query = 'MATCH (a)-[:`'+rel+'`]->(b) where a.mid="'+mid+'" RETURN b.mid, b.name'

		tx.append(query)
		response = tx.execute()

		for data in response:
			for i in data:
				inf.append(i[1])
	return list(set(inf))


def getRels(mid):
	mid='/m/01vsy3q'
	session = cypher.Session(cypher_url)
	tx = session.create_transaction()
	

	query = 'MATCH (a)-[r]-(b) where a.mid="'+mid+'" RETURN distinct type(r);'

	'''
	headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
	response = requests.post(cypher_url, params={'query': query}, headers=headers)
	print response
	'''

	tx.append(query)
	response = tx.commit()
	
	rel = []
	for data in response:
		for r in data:
			if '/influence' in r[0]:
				rel.append(r[0])
	return rel