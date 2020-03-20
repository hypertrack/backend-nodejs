<a href="https://www.hypertrack.com/">
    <img src="https://www.hypertrack.com/green.eeca143346e01b96d600.svg" alt="HyperTrack logo" title="HyperTrack" align="right" height="40" />
</a>

# Sample Backend Integration

![](https://img.shields.io/circleci/build/gh/hypertrack/backend-nodejs?style=flat-square)
![](https://img.shields.io/david/hypertrack/backend-nodejs?style=flat-square)
![](https://img.shields.io/github/license/hypertrack/backend-nodejs?style=flat-square)

A sample NodeJS/ExpressJS server integration with the HyperTrack platform. It consumes the HyperTrack APIs and Webhooks and exposes them through REST API endpoints for front-end or mobile application usage.

## Overview

- [Sample Backend Integration](#sample-backend-integration)
  - [Overview](#overview)
  - [Features](#features)
  - [Possibilities](#possibilities)
  - [How it works](#how-it-works)
  - [Requirements](#requirements)
  - [Installation and setup](#installation-and-setup)
    - [Local setup](#local-setup)
    - [Heroku setup](#heroku-setup)
  - [Usage](#usage)
    - [REST API Endpoints](#rest-api-endpoints)
    - [Webhooks](#webhooks)
  - [Related](#related)
  - [Credits](#credits)
  - [License](#license)

## Features

- One-click deploy to Heroku (using ONLY free add-ons)
- Synchronize all existing devices and trips on startup
- Store devices, trips, and all webhook records in MongoDB with Mongoose
- Receive webhooks and test locally with [Localtunnel](https://github.com/localtunnel/localtunnel)

## How it works

The project uses the Model-Routes-Controllers pattern ([read more](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)) as the project structure. With that, the project structure looks like this:

- **/common**: Common functionality for HyperTrack API usage
- **/controllers**: Handlers for all routes
- **/models**: Mongoose Schema definitions for all relevant entities
- **/routes**: Definition of available REST API endpoints
- **index.js**: Main entry point for ExpressJS, setup of the server (CORS, Mongoose), and sync of devices and trips through the HyperTrack API

Once started, the project will collect and store all available devices and trips from the HyperTrack API. The Mongoose setup will ensure that missing collection definitions will be created. Once that is complete, the server will listen to HyperTrack Webhooks to come in. Every Webhook will create or update records in the database and execute related tasks (e.g. complete a trip from a trip completion webhook). The server will expose REST API endpoints in CRUD fashion for all available entities (trips, devices, etc).

> _Note_: For the sake of simplicity, the REST API endpoints **do not** enforce any auth mechanisms. Before going into production, ensure to secure your server communication.

## Requirements

The goal of this project is to get you to a deployed integration in minutes. For this to work, you need to have:

- [ ] Set up a [HyperTrack account](https://dashboard.hypertrack.com/signup) and obtain your `AccountId` and `SecretKey` from the [Dashboard](https://dashboard.hypertrack.com/)
- [ ] Integrate the HyperTrack SDK in your mobile application ([iOS](https://github.com/hypertrack/quickstart-ios), [Android](https://github.com/hypertrack/quickstart-android), or [React Native](https://github.com/hypertrack/quickstart-react-native)) or use our sample app to send location data ([iOS](https://github.com/hypertrack/live-app-ios) or [Android](https://github.com/hypertrack/live-app-android))
- [ ] Set up a [Heroku account](https://signup.heroku.com/) for deployment

## Installation and setup

You can install this project on your local machine and deploy it quickly to Heroku for free.

### Local setup

After cloning or forking this repository, you should install all dependencies on your machine:

```shell
# with npm
npm install

# or with Yarn
yarn
```

Next, you need to set your environmental variables. The project uses [dotenv](https://github.com/motdotla/dotenv), so it's best to create a `.env` file in the root folder of the project. This file is listed in `.gitignore` and shall not be checked into public repositories. Below is the content on the file - please ensure to replace the keys with your own:

```shell
# HyperTrack
HT_ACCOUNT_ID = <YOUR_ACCOUNT_ID>
HT_SECRET_KEY = <YOUR_SECRET_KEY>

# MongoDB
MONGODB_URI = <YOUR_MONGODB_URI>
```

With the dependencies and configuration in place, you can start the server in development mode:

```shell
# with npm
npm run dev

# or with Yarn
yarn dev
```

On startup, Localtunnel is used to generate a publicly accessible URL for your local server (`https://<unqiue_id>.localtunnel.me`). A new browser window will open with your unique, temporary domain. If successful, the browser window should show:

```text
HyperTrack Backend is RUNNING
```

**Congratulations!** You just completed the integration with HyperTrack APIs and Webhooks.

### Heroku setup

This project is set up to be deployed to Heroku within seconds. You need a Heroku account. All you need to do is to click on the one-click-deploy button below. It will provide the following services and add-ons:

- Web Dyno - to run the server on Heroku (free)
- NodeJS buildpack - to run NodeJS/ExpressJS on Heroku (free)
- MongoLab - hosted MongoDB database (free)
- PaperTrail - hosted logging system (free)

Similar to the local setup, you need to have your keys ready before the deployment. The Heroku page will ask you for the following:

- `HT_ACCOUNT_ID`: Your HyperTrack AccountId from the [HyperTrack Dashboard](https://dashboard.hypertrack.com/setup)
- `HT_SECRET_KEY`: Your HyperTrack SecretKey from the [HyperTrack Dashboard](https://dashboard.hypertrack.com/setup)

You need to enter all of these keys for the project to run successfully. Heroku uses the input to pre-set the environmental variables for the deployment. You can change after the setup as well.

**Deploy this project now on Heroku:**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hypertrack/backend-nodejs)

## Usage

The project exposes all devices and trip data through a variety of interfaces. Below is an explanation of each interface, setup steps, and usage details.

### REST API Endpoints

ExpressJS exposes API endpoints based on the routes defined in the _/route_ folder. Here is a breakdown of available routes, methods, and use cases.

> _Note_: All the endpoints below respond with data from the MongoDB database, not directly from the HyperTrack API.

| Route                            | Methods     | Use Cases                                                                                          |
| -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| /                                | GET         | Status checking endpoint, returns plain text message                                               |
|                                  |
| /devices                         | GET         | Get all tracked [devices](https://www.hypertrack.com/docs/references/#references-apis-devices)                                |
| /devices/{device_id}             | GET, DELETE | Get/delete device by device ID                                                                     |
| /devices/{device_id}/trips       | GET         | Get all [trips](https://www.hypertrack.com/docs/references/#references-apis-trips) for specific device                        |
| /trips                           | GET, POST   | Get all or create new trip                                                                         |
| /trips/{trip_id}                 | GET, POST   | Get/update a trip by trip ID                                                                       |
| /device-status                   | GET, POST   | Get all or save new [device status update](https://www.hypertrack.com/docs/references/#references-webhooks-device-status-payload)     |
| /device-status/{device_id}       | GET         | Get all device status updates for specific device                                                  |
| /device-status/{device_id}/last  | GET         | Get last device status update for specific device                                                  |
| /battery-status                  | GET, POST   | Get all or save new [battery status update](https://www.hypertrack.com/docs/references/#references-webhooks-battery-payload)          |
| /battery-status/{device_id}      | GET         | Get all battery status updates for specific device                                                 |
| /battery-status/{device_id}/last | GET         | Get last battery status update for specific device                                                 |
| /locations                       | GET, POST   | Get all or save new [location update](https://www.hypertrack.com/docs/references/#references-webhooks-location-payload)               |
| /locations/{device_id}           | GET         | Get all location updates for specific device                                                       |
| /locations/{device_id}/last      | GET         | Get last location update for specific device                                                       |
| /trip-status                     | GET, POST   | Get all or save new [trip status update](https://www.hypertrack.com/docs/references/#references-webhooks-trip-payload)                |
| /trip-status/{device_id}         | GET         | Get all trip status updates for specific trip                                                      |
| /trip-status/{device_id}/last    | GET         | Get last trip status update for specific trip                                                      |
|                                  |
| /hypertrack                      | POST        | Endpoint to receive [HyperTrack Webhooks](https://www.hypertrack.com/docs/references/#references-webhooks). Read more below. |

### Webhooks

<p align="center">
  <img src="static/sample-webhook.png" />
</p>

With the deployment of this project, you will have an endpoint listening to incoming webhooks. Depending on the deployment (local/Heroku/etc), your domain will change, but the available Webhook endpoint will end with `/hypertrack`. Here are samples of the full webhook URL that you will have to enter on the HyperTrack Dashboard:

- Heroku: `https://<heroku_app_name>.herokuapp.com/hypertrack`
- Localtunnel: `https://<alias>.localtunnel.me/hypertrack` (alias can be configured in the package.json)

All webhooks will be processed and stored to the MongoDB. Some updates might update other database records (e.g. battery status update reflected in device records). It is important to note that `destination_arrival` [trip webhooks](https://www.hypertrack.com/docs/references/#references-webhooks-trip-payload) will trigger [trip completion API calls](https://www.hypertrack.com/docs/references/#references-apis-trips-complete-trip) two minutes after the webhook arrival. You can change this behavior by modifying the `routes/webhook.route.js` file.

> _Note_: You can look into the console logs to review all received webhooks. This also allows you to run through the one-time verification for HyperTrack Webhooks.

## Credits

This project uses the following open-source packages:

- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [cors](https://expressjs.com/en/resources/middleware/cors.html): Node.js CORS middleware
- [dotenv](https://github.com/motdotla/dotenv): Load environment variables from .env files
- [express](https://expressjs.com/): Web framework for Node.js
- [localtunnel](https://github.com/localtunnel/localtunnel): Expose your localhost to the world for testing and sharing
- [mongoose](https://mongoosejs.com/): Mongodb object modeling for node.js
- [nodemon](https://github.com/remy/nodemon): Monitor for any changes in your node.js application and automatically restart the server
- [request](https://github.com/request/request): Simplified HTTP client

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
