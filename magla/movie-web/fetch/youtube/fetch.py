from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser
import re
import httplib2
import pprint
import neo4j

# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
#   https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.
http = httplib2.Http(cache=".cache")
DEVELOPER_KEY = "AIzaSyC47GJPVRn9cPuMYCX-ttJ0-9Hzjx6I4VU"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)#DISABLE IPV6

def youtube_search(options):
	# Call the search.list method to retrieve results matching the specified
	# query term.
	response = youtube.search().list(
	q=options['q'],
	part="id,snippet",
	maxResults=options['max_results']
	).execute()
	
	#print response
	videos = []
	for result in response.get("items", []):
		if result["id"]["kind"] == "youtube#video":
			v = {}
			v['id'] = result["id"]["videoId"]
			v['title'] = result['snippet']['title']
			videos.append(v)
	return videos

def detail_videos(ids):
	response = youtube.videos().list(
	part="statistics,topicDetails,snippet",
	id=ids
	).execute()	
	return response.get("items", [])

def fetch(options):
	videos = youtube_search(options)
	print 'BREAK'
	ids = ",".join([v['id'] for v in videos])
	result = detail_videos(ids)
	#get title, likeCount, dislikes, views, 
	videos=[]	
	for r in result:
		v={}
		v['id'] = r['id']
		v['title'] = r['snippet']['title']
		v['views'] = r['statistics']['viewCount']
		v['likes'] = r['statistics']['likeCount']
		v['dislikes'] = r['statistics']['dislikeCount']
		v['related'] = getRelated({'id': v['id']})
		print v
		videos.append(v)
	neo4j.buildVideos(videos)
	#print videos
	#return [v['related'] for v in videos]


def getRelated(options):
	# Call the search.list method to retrieve results matching the specified
	# query term.
	response = youtube.search().list(
	#q=options['q'],
	type='video',
	relatedToVideoId=options['id'],
	part="id",
	maxResults=options.get('maxResults', 25),
	).execute()

	#print [v['id']['videoId'] for v in response.get("items", [])]
	return [v['id']['videoId'] for v in response.get("items", [])]

#Make learn constraints like ignore live or only prioritize live videos, acoustic, 
def checkConstraints(v, history):
	if re.search(r'\live\b', v['title'], re.I):
		return False
	if 'live' or 'album' in v['title'].lower():
		print v['title']
		return False
	if any(v['id']==d['id'] for d in history):
		print v['title']
		return False
	return True

if __name__ == "__main__":
  argparser.add_argument("--q", help="Search term", default="Red hot chili peppers")
  argparser.add_argument("--max-results", help="Max results", default=5  )
  args = vars(argparser.parse_args())
  args['type'] = 'video'
  try:
    print fetch(args)
  except HttpError, e:
    print "An HTTP error %d occurred:\n%s" % (e.resp.status, e.content)
