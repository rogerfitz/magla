db_url = 'http://localhost:7474'
api_key = 'AIzaSyA5b9ihq5IWV6GCdNhwcAh16EVmQJOBG_E'

try:
    from local_config import *
except ImportError:
    print 'local_config.py NOT FOUND\nProceeding with defaults'