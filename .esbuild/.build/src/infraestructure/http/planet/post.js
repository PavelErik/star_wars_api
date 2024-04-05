"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infraestructure/http/planet/post.ts
var post_exports = {};
__export(post_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(post_exports);

// src/domain/entities/planet.entity.ts
var Planet = class {
  constructor(id, clima, diametro, gravedad, nombre, periodoOrbital, poblacion, residentes, periodoRotacion, aguaSuperficial, terreno, url) {
    this.id = id;
    this.clima = clima;
    this.diametro = diametro;
    this.gravedad = gravedad;
    this.nombre = nombre;
    this.periodoOrbital = periodoOrbital;
    this.poblacion = poblacion;
    this.residentes = residentes;
    this.periodoRotacion = periodoRotacion;
    this.aguaSuperficial = aguaSuperficial;
    this.terreno = terreno;
    this.url = url;
  }
};

// src/shared/mappers.ts
var toPlanet = (id, planet) => {
  return new Planet(
    id,
    planet.clima,
    planet.diametro,
    planet.gravedad,
    planet.nombre,
    planet.periodoOrbital,
    planet.poblacion,
    planet.residentes,
    planet.periodoRotacion,
    planet.aguaSuperficial,
    planet.terreno,
    planet.url
  );
};

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/domain/usecases/planet/create-planet.usecase.ts
var CreatePlanet = class {
  constructor(planetRepository2) {
    this.planetRepository = planetRepository2;
  }
  execute = async (planet) => {
    return await this.planetRepository.savePlanet(toPlanet(v4_default(), planet));
  };
};

// src/infraestructure/db/dynamodb.ts
var AWS = __toESM(require("aws-sdk"));
var dynamoDBClient = () => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "us-east-2",
      endpoint: "http://localhost:8000",
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey",
      convertEmptyValues: true
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};
var dynamodb_default = dynamoDBClient;

// src/adapters/repository/models/planet.repository.ts
var PlanetRepository = class {
  dynamoDb = dynamodb_default();
  tableName = "Planet";
  getPlanet = async () => {
    const params = {
      TableName: this.tableName
    };
    try {
      const data = await this.dynamoDb.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error("Error al obtener planetas de DynamoDB:", error);
      throw new Error("Error al obtener planetas");
    }
  };
  getPlanetById = async (id) => {
    const params = {
      TableName: this.tableName,
      Key: {
        ["id"]: id
      }
    };
    try {
      const data = await this.dynamoDb.get(params).promise();
      return data.Item;
    } catch (error) {
      console.error("Error al obtener planeta de DynamoDB:", error);
      throw new Error("Error al obtener planeta");
    }
  };
  savePlanet = async (planet) => {
    const params = {
      TableName: this.tableName,
      Item: { ...planet }
    };
    try {
      await this.dynamoDb.put(params).promise();
      console.log("Planeta creada con \xE9xito:", planet);
      return planet;
    } catch (error) {
      console.error("Error al crear planeta en DynamoDB:", error);
      throw new Error("Error al crear planeta");
    }
  };
};

// src/infraestructure/http/planet/post.ts
var planetRepository = new PlanetRepository();
var createPlanetUseCase = new CreatePlanet(planetRepository);
var handler = async (_event, _context) => {
  console.log("Body params", _event.body);
  if (!_event.body)
    return {
      statusCode: 400,
      body: "La solicitud no contiene un cuerpo"
    };
  try {
    const planet = JSON.parse(_event.body);
    const response = await createPlanetUseCase.execute(planet);
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
