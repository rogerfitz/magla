import os, sys

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

config_path = os.path.abspath(os.path.join(basedir, '..', '..'))

sys.path.append(config_path)

from magla.config import *
