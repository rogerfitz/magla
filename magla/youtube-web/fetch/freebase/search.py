from . import *
import json
import urllib
import pprint
import sys
from shitjson import properDump


#api_key = open(".freebase_api_key").read()
service_url = 'https://www.googleapis.com/freebase/v1/search'

def getArtists(query, limit):

	params = {
	  'key': api_key,
	  'query': "musicians",
	  'type': "/people/person",
	  'domain': 'music',
	  'limit': limit,
	  #'output': '(/influence/influence_node/peers)',
	  
	}

	url = service_url + '?' + urllib.urlencode(params)
	response = json.loads(urllib.urlopen(url).read())
	artist=[]
	try:
		for a in response['result']:
			#artist.append('{name: "'+clean(a['name'])+'", mid: "'+a['mid']+'", g_score: '+str(a['score'])+', id: "'+a.get('id', '-1')+'" }')
			d = {'name': a['name'], 'mid': a['mid'], 'g_score': a['score'], 'id': a.get('id', '-1') }
			artist.append(properDump(d))
		return artist
	except:
		print response
		print sys.exc_info()
		print url

def getSongs():
	params = {
	  'key': api_key,
	  'query': "Castles made of sand",
	  #'type': "/music/track",
	  'limit': 10,
	  
	}

	url = service_url + '?' + urllib.urlencode(params)
	response = json.loads(urllib.urlopen(url).read())

	for r in response['result']:
		print r['name']
	#print response
#getSongs()

'''
for property in topic['property']:
	print property
	print property + ':'
	for value in topic['property'][property]['values']:
	print ' - ' + repr(value['text'])'''