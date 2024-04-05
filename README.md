# star_wars_api
Serverless de swapi

# Guía de Configuración del Proyecto Serverless de swapi con Node.js y TypeScript

Esta guía proporciona instrucciones para configurar una aplicación Serverless utilizando Node.js y TypeScript, junto con una instancia local de DynamoDB para el desarrollo. Sigue estos pasos para preparar tu entorno de desarrollo y para desplegar la aplicación.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes prerrequisitos en tu sistema:

- Node.js (versión 16.x.x)
- npm (viene con Node.js)
- Serverless Framework


## Instrucciones de Configuración

### 1. Instalar Serverless Framework Globalmente

El Serverless Framework permite a los desarrolladores construir y desplegar aplicaciones autoescalables, de pago por ejecución y orientadas a eventos en cualquier proveedor de nube. Instálalo globalmente usando npm:

```bash
npm install -g serverless@3.21.0
```
### 2. Verificar la Instalación de Node.js
Asegúrate de que la versión 16 de Node.js esté correctamente instalada en tu sistema. Puedes verificar tu versión de Node con el siguiente comando:
```
node --version
```
El resultado debe comenzar con v16. Si tienes una versión diferente, considera usar nvm para instalar y gestionar múltiples versiones de Node.js.

###  3. Instalar DynamoDB Localmente para Desarrollo Serverless
Para trabajar con tablas de DynamoDB de forma offline, instala DynamoDB localmente usando el comando de Serverless:
```
serverless dynamodb install -s dev
```
### 4. Instalar Dependencias de AWS DynamoDB Local y Plugin de Serverless-DynamoDB
Estos paquetes son necesarios para integrar DynamoDB Local con tu aplicación Serverless. Te permiten emular operaciones de tablas de DynamoDB en tu máquina local.
```
npm install aws-dynamodb-local
npm install serverless-dynamodb
```

###  Configuración Adicional (Opcional)
Configurar AWS CLI
Para desplegar tu aplicación en AWS, podrías necesitar configurar el AWS CLI con tus credenciales. Este paso es opcional para el desarrollo local pero necesario para el despliegue.
```
aws configure
```
Sigue las instrucciones para ingresar tu AWS Access Key ID, Secret Access Key, nombre de la región por defecto y formato de salida.

### Ejecutar DynamoDB Localmente
Cuando estés desarrollando localmente, inicia la instancia de DynamoDB Local con:
```
sls dynamodb start --migrate
```
### Desplegar en AWS
Para desplegar tu aplicación Serverless en AWS, usa:
```
serverless deploy
```
Este comando desplegará tus funciones en AWS Lambda, configurará el API Gateway y otros recursos de AWS definidos en tu serverless.yml.

