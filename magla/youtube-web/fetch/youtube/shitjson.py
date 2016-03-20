import unicodedata

#if dickt could be dirty remember to clean it!
def clean(text):
	try:
		c = unicodedata.normalize('NFKD', text).encode('ascii','ignore')
		c = c.replace('"',"'")
		return c
	except:
		return text

def properDump(dickt):
	pirate='{'
	for seaman in dickt:
		if type(dickt[seaman]) is dict:
			pirate+=seaman+': '+properDump(dickt[seaman])+"} "

		#elif type(dickt[seaman]) is int:
		#	print 'int'
		#	pirate+=seaman+': "'+str(dickt[seaman])+'", '
		
		else:
			pirate+=seaman+': "'+str(clean(dickt[seaman]))+'", '

	pirate=pirate[:-2]+'}'
	return pirate

#properDump({'poo': 'p', 'piss': {'shit':'bitch', 'a': {'d': 'hello'}}})
