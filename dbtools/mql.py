import simplejson as json
import urllib
import pprint

api_key = open(".freebase_api_key").read()
service_url = 'https://www.googleapis.com/freebase/v1/mqlread'



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
		query = [{"name": name, "id": {}, "mid": {}, "key": {"namespace": "/wikipedia/en_id", "value": None}, "a:type":"/people/person", "b:type": "/common/topic"}]

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

#getLabels('/m/05bmb_')
'''
getMQL([{
 "mid":   '/m/05bmb_',
 "type": [],
}])
#resolveNode('Jimi Hendrix')'''