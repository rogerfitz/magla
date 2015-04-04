from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser
import re

# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
#   https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = "AIzaSyB2mdtS2ixK8Ai5qTdfOmHjwV8BKYuiDJo"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
	developerKey=DEVELOPER_KEY)

def getFromSearch(options):
	search_response = youtube.search().list(
	q=options['q'],
	type='video',
	part="id,snippet",
	maxResults='15',
	).execute()

	return pickRandom(search_response)

def getRelated(options):
	# Call the search.list method to retrieve results matching the specified
	# query term.
	search_response = youtube.search().list(
	#q=options['q'],
	type='video',
	relatedToVideoId=options['video_id'],
	part="id,snippet",
	maxResults='25',
	).execute()
	return pickPR(options, search_response)

#Make learn constraints like ignore live or only prioritize live videos, acoustic, 
def checkConstraints(v, history):
	if re.search(r'\live\b', v['title'], re.I):
		return False
	if any(v['id']==d['id'] for d in history):
		print v['title']
		return False
	return True

def pickPR(options, response):
	videos = []
	for result in response.get("items", []):
		if result["id"]["kind"] == "youtube#video":
			v = {}
			v['id'] = result["id"]["videoId"]
			v['title'] = result['snippet']['title']
			if checkConstraints(v, options['played']):
				videos.append(v)
	
	import random
	return random.choice(videos)
	

def pickRandom(response):
	videos = []
	
	for result in response.get("items", []):
		if result["id"]["kind"] == "youtube#video":
			v = {}
			v['id'] = result["id"]["videoId"]
			v['title'] = result['snippet']['title']
			videos.append(v)
		print result['etag']
			
	import random
	return random.choice(videos)


if __name__ == "__main__":
  try:
	pass
  except HttpError, e:
    print "An HTTP error %d occurred:\n%s" % (e.resp.status, e.content)
