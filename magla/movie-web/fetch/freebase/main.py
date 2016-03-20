import simplejson as json
import urllib

api_key = open(".freebase_api_key").read()
service_url = 'https://www.googleapis.com/freebase/v1/mqlread'
query = [{"name": {}, "a:type":"/music/artist", "b:type": "/common/topic", "limit": 100}]

params = {'query': json.dumps(query), 'key': api_key}

url = service_url + '?' + urllib.urlencode(params)
print url

response = json.loads(urllib.urlopen(url).read())


try:
	for artist in response['result']:
  		print repr(artist['name']['value']) #print planet['name']['value']
except:
	print response


