# -*- coding: utf-8 -*-
"""Graph API module.
This module define every API related to maps.
"""
from __future__ import print_function, absolute_import

from flask import jsonify
from flask import request
from flask import redirect
from flask import url_for
from flask import abort

from flask.ext.classy import FlaskView, route

from app.extensions import mongo

class SearchView(FlaskView):

    @route('/<hash>', methods=['POST'])
    def search(self):
        hash = request.args["hash"]
        if hash:
            assets = mongo.db.assets
            query = assets.find({"$or": [{"ssdeep": {"$eq": hash}}, {"md5": {"$eq": hash}}, {"sha1": {"$eq": hash}}, {"sha256": {"$eq": hash}},{"sha512": {"$eq": hash}}]})
            if query.count() == 0:
                abort(404)
            elif query.count() == 1:
                query.next()
                redirect(url_for("detail.index", hash=query.sha256))
            else:
                abort(500)
        redirect(url_for("index.index"))