# -*- coding: utf-8 -*-
"""This is the main module to run the server using Gunicorn.
"""
from __future__ import print_function, absolute_import

import os
from app import create_app

## Run in production for `production` mode
## Run in default for `development` mode

application = create_app(os.getenv('FLASK_CONFIG') or 'production')

if __name__ == '__main__':
    application.run()
