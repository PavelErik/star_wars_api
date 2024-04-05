"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// swagger/swagger.js
var require_swagger = __commonJS({
  "swagger/swagger.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "swagger": "2.0",
      "info": {
        "title": "serverless-star-wars-app",
        "version": "1"
      },
      "paths": {
        "/api/people/get/{id}": {
          "get": {
            "summary": "people-get",
            "description": "",
            "operationId": "people-get.get./api/people/get/{id}",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
              }
            ],
            "responses": {
              "200": {
                "description": "200 response"
              }
            }
          }
        },
        "/api/planet/post": {
          "post": {
            "summary": "planet-post",
            "description": "",
            "operationId": "planet-post.post./api/planet/post",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "body",
                "name": "body",
                "description": "Body required in the request",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/PlanetRequest"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "200 response"
              }
            }
          }
        }
      },
      "definitions": {},
      "securityDefinitions": {}
    };
  }
});

// swagger/swagger-json.js
var swagger = require_swagger();
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(swagger)
  };
};
