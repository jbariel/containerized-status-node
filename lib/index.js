'use strict';

const sl = require('server-lite');
const slUtilz = new sl.utils();
const om = require('output-manager');
const out = new om.Out();

function onReq(request, response) { 
    out.i('recieved request');
    slUtilz.writeResponse(response, 200, sl.content.text('I am alive'));
}

const cfg = new sl.config({ out: out, port: 8888, onRequest: onReq });
const svr = new sl.server.http(cfg);
svr.start();
