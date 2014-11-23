import simplejson as json
import urllib
import pprint

api_key = open(".freebase_api_key").read()
service_url = 'https://www.googleapis.com/freebase/v1/mqlread'

def getGenres():
	query = [{
	'type': '/music/genre', 
	'/common/topic/image' : [{"id": None, 'limit': 1}],
	"key": {"namespace": "/wikipedia/en_id", "value": None}, 
	'name': None, 
	'mid': None, 
	'id': None,
	'artists': [{'name': None, 'mid':None}], 
	'limit': 5
	}]

	params = {'query': json.dumps(query), 'key': api_key}
	
	url = service_url + '?' + urllib.urlencode(params)

	response = urllib.urlopen(url).read()
	#print response

	data = json.loads(response)
	data = data['result']#[0]
	

	return data


def getArtist(name):
	#query = [{"name": name, "*":[{}], "id": {}, "mid": {},"active_start": None, "genre": [], "key": {"namespace": "/wikipedia/en_id", "value": None}, "type":"/music/artist"}]#, "b:type": "/common/topic"}]
	query = [{"name": name, 'type': '/music/recording', 'name': None, 'id': None }]

	params = {'query': json.dumps(query), 'key': api_key}
	
	url = service_url + '?' + urllib.urlencode(params)

	response = urllib.urlopen(url).read()
	print response

	data = json.loads(response)
	data = data['result'][0]
	print pprint.pprint(data)

def getArtists(limit):
	query = [{"name": {}, "id": {}, "a:type":"/people/person", "b:type": "/common/topic", "limit": limit}]
	#query = [{"name": None, "type": "/film/actor", "film": [{"film": {"name": None,"story_by": [{"name": None}],"/film/film/written_by": [{"name": None,"/book/author/works_written": [{"name": None,"limit": 5,"optional": True}]}],"initial_release_date": None,"directed_by": [{"name": None,"film": [{"name": None,"limit": 5,"optional": True}]}]}}]}]

	params = {'query': json.dumps(query), 'key': api_key}

	url = service_url + '?' + urllib.urlencode(params)

	response = json.loads(urllib.urlopen(url).read())

	artist = []
	try:
		for a in response['result']:
	  		artist.append(a)
	  	return artist
	except:
		print 'error'
		print response
		return []

def resolveNode(name):
	try:
		#query = [{"name": name, "id": {}, "mid": {}, "key": {"namespace": "/wikipedia/en_id", "value": None}, "a:type":"/people/person", "b:type": "/common/topic"}]
		query = [{"name": name, "id": {}, "peers": [], "mid": {}, "key": {"namespace": "/wikipedia/en_id", "value": None}, "a:type":"/people/person", "b:type": "/common/topic"}]
		params = {'query': json.dumps(query), 'key': api_key}
		
		url = service_url + '?' + urllib.urlencode(params)

		response = json.loads(urllib.urlopen(url).read())
		#print response
		data = response['result'][0]
		data['mid']=data['mid']['value']
		data['id']=data['id']['value']
		data['wiki_url']='http://en.wikipedia.org/wiki/index.html?curid='+data['key']['value']
		data.pop('key', None)

		labels = [data['a:type'], data['b:type']]
		data.pop('a:type', None)
		data.pop('b:type', None)

		return data, labels
	except:
		print response
		return -1, -1
		#raise Exception
	#print response#['result'][0]['mid']['value']

def getLabels(mid):
	try:
		query = {"mid": mid, "type": []}
		params = { 'query': json.dumps(query), 'key': api_key}


		url = service_url + '?' + urllib.urlencode(params)

		response = json.loads(urllib.urlopen(url).read())
		return  response['result']['type']

	except:
		return []

def getMQL(query):
	params = {'query': json.dumps(query), 'key': api_key}
	
	url = service_url + '?' + urllib.urlencode(params)

	response = json.loads(urllib.urlopen(url).read())
	print pprint.pprint(response)
	#for r in response['result']:
	#	print r['id']

def getSongs(mid):

	#try:
		#query = [{"name": {}, "a:type":"/music/artist", "b:type": "/common/topic", "limit": 100}]"artist":{"id":"/en/bob_dylan"}
		query = [{"type":"/music/track","artist":{"id":"/en/jimi_hendrix"}, 'name': None,"limit":10}]
		params = { 'query': json.dumps(query), 'key': api_key}



		url = service_url + '?' + urllib.urlencode(params)
		response = urllib.urlopen(url).read()
		data = json.loads(response)
		

		return  data
	#except:
		return []


#getLabels('/m/05bmb_')
#print pprint.pprint(getSongs('/m/01vsy3q'))

'''
getMQL([{
 "mid":   '/m/05bmb_',
 "type": [],
}])
#resolveNode('Jimi Hendrix')'''