/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
"use strict";

const sl = require("server-lite");
const om = require("output-manager");
const datez = require("date-utilz");
const stringz = require("string-utilz");

const out = new om.Out();
const slUtilz = new sl.utils();

const htmlTemplate =
  '<!DOCTYPE html><html lang="en-US"><head><meta charset="UTF-8" /><title>Containerized Status in NodeJS</title></head><body><h1>I am alive</h1><h3>%{date}</h3></body></html>';

function buildHtml(template = "<html></html>", vars = {}) {
  let result = template;
  Object.keys(vars).forEach(k => {
    result = result.replace(new RegExp("%{" + k + "}", "g"), match => {
      return vars[k];
    });
  });

  return sl.content.custom(sl.content.mimeTypes.html, result);
}

const svr = new sl.server.http(
  new sl.config({
    out: out,
    port: 8888,
    onRequest: (request, response) => {
      out.i("recieved request");
      slUtilz.writeResponse(
        response,
        200,
        buildHtml(htmlTemplate, { date: datez.date() })
      );
    }
  })
);

svr.start();
