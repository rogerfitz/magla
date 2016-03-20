import fetch.youtube

def getFromSearch(options):
	#NOT IMPLEMENTED
	return {'id': 'AqajUg85Ax4', 'title': 'Avril Lavigne - Let Me Go ft. Chad Kroeger'}

def getRelated(options):
	return {'id': 'AqajUg85Ax4', 'title': 'Avril Lavigne - Let Me Go ft. Chad Kroeger'}

if __name__ == "__main__":
  try:
	print 'hi'
  except HttpError, e:
    print "An HTTP error %d occurred:\n%s" % (e.resp.status, e.content)
