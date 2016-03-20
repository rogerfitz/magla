from . import *
import json
import urllib
import pprint
from neo4j import buildNode, buildRel, getInfluences
from mql import resolveNode, getLabels
import sys, traceback

service_url = 'https://www.googleapis.com/freebase/v1/topic'

#Only for artists for now
def buildTopic(name):
	pNode, pLabel = resolveNode(name)
	if pNode==-1:
		buildNode(pLabel, pNode)

		topic_id = pNode['id']

		params = {
		  'key': api_key,
		  #'filter': '/influence',
		  'domain': 'people',
		}
		url = service_url + topic_id + '?' + urllib.urlencode(params)
		response = json.loads(urllib.urlopen(url).read())

		#print response
		for prop in response['property']:
			rel_type = prop
			try:
				if response['property'][prop]['valuetype'] == "object":
					for k in response['property'][prop]['values']:
						data = {'name': k['text'], 'mid': k['id']} #All worthwhile data from topic api.
						buildNode(getLabels(data['mid']), data)
						buildRel(pNode, data, rel_type)

				else: #means link is to node of other links
					compound_response = response['property'][prop]['values']#['property']
					for p in compound_response:
						try:
							p = p['property']
							for key in p:
								if not ('/type/object/type' == key or '/type/object/attribution' == key):
									rel_type = key
									#print rel_type
									for val in p[key]['values']:
										data = {'name': val['text'], 'mid': val.get('id', '-1')} #All worthwhile data from topic api.
										#print data
										buildNode(getLabels(data['mid']), data)
										buildRel(pNode, data, rel_type)
						except Exception, e:
							pass
							#print 'else'
							#print traceback.print_exc()
							#print p
							#print pprint.pprint(p)

			except Exception, e:
				pass
				#print 'if'
				#print traceback.print_exc()
				#print pprint.pprint(response['property'][prop])
				#print pprint.pprint(response['property'][prop]['values'])
	

def expand(mid):
	inf = getInfluences(mid)
	for i in inf:
		#print i
		buildTopic(i)

#buildTopic('Jimi Hendrix')
expand('/m/01vsy3q')