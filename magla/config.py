#Neo4j Settings
db_url = 'http://localhost:7474'
api_key = 'AIzaSyA5b9ihq5IWV6GCdNhwcAh16EVmQJOBG_E'
cypher_url = db_url+'/db/data/cypher'

#Flask Settings
import os

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

# Secret key for session management. You can generate random strings here:
# http://clsc.net/tools-old/random-string-generator.php
SECRET_KEY = 'my precious'

# Connect to the database
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'database.db')

try:
    #print 'sup'
    from local_config import *
except ImportError:
    print 'local_config.py NOT FOUND\nProceeding with defaults'
