#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, render_template, request, session, jsonify
# from flask.ext.sqlalchemy import SQLAlchemy
import logging
from logging import Formatter, FileHandler
#from forms import *
import os
import config
#import requests
#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_object('config')
#db = SQLAlchemy(app)

# Login required decorator.

#--------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#


@app.route('/', methods=['GET', 'POST'])
def home():
	return render_template('pages/test.html', db_url=config.db_url)

@app.route('/about')
def about():
    return render_template('pages/placeholder.about.html')


@app.route('/login')
def login():
    #http://blog.miguelgrinberg.com/post/restful-authentication-with-flask
    form = LoginForm(request.form)
    return render_template('forms/login.html', form=form)

#need to require a csrf to ensure website endpoint not abused
@app.route('/get')
def get():
    try:
        url = request.args['url']
        response = requests.get(url)
        return response.content
    except:
        return 'Error loading', url


#need to require a csrf to ensure website endpoint not abused
@app.route('/api', methods=['GET'])
def api():
	options = {'video_id': request.args['video_id'], 'played': session['video']}
	video = pick.getRelated(options)
	session['video'].append(video)
	print video
	return jsonify(video)


@app.route('/register')
def register():
    form = RegisterForm(request.form)
    return render_template('forms/register.html', form=form)


@app.route('/forgot')
def forgot():
    form = ForgotForm(request.form)
    return render_template('forms/forgot.html', form=form)

# Error handlers.


@app.errorhandler(500)
def internal_error(error):
    #db_session.rollback()
    return render_template('errors/500.html'), 500


@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(403)
def not_found_error(error):
    return render_template('errors/404.html'), 404

if not app.debug:
    file_handler = FileHandler('error.log')
    file_handler.setFormatter(
        Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    )
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('errors')

#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#
'''
# Default port:
if __name__ == '__main__':
    app.run()
'''
# Or specify port manually:

if __name__ == '__main__':
    print 'supa'
    port = int(os.environ.get('PORT',31337))
    app.run(host='0.0.0.0', port=port, debug=True)

