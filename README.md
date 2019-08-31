# HyperTrack: Sample Backend Integration

A sample NodeJS/ExpressJS server integration with the HyperTrack platform. It consumes the HyperTrack APIs and Webhooks and exposes them through REST API endpoints, Socket.io streams, and push notifications for front-end or mobile application usage.

## Features

- One-click deploy to Heroku (using ONLY free add-ons)
- Synchronize all existing devices and trips on startup
- Receive webhooks and test locally with [Localtunnel](https://github.com/localtunnel/localtunnel)
- Store devices, trips, and all webhook records in MongoDB with Mongoose
- Notify Websocket subscribers on webhook arrival using Socket.io
- Send mobile device push notifications to Google's GCM and Apple's APN on webhook arrival
- Set home and work places for devices

## Possibilities

With the capability of this project, you can build web or mobile Placeline apps with features like:

- Track all devices associated with your HyperTrack account on a world map with updates as they come in
- Map all active trips with start/end places and geofences
- Display all completed trips on a Placeline (time/location/activity series) and review relevant ones in more detail
- Create expense reports with pre-filled fields such as: distance travelled, travel date/time, expenses based on distance and rate, and description based on start and end places

> TODO: GIF with interactions on the dashboard

## How it works

The project uses the Model-Routes-Controllers pattern ([read more](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)) as the project structure. With that, the project structure looks like this:

- **/common**: Common functionality for HyperTrack API usage
- **/controllers**: Handlers for all routes
- **/models**: Mongoose Schema definitions for all relevant entities
- **/routes**: Definition or available REST API endpoints
- **index.js**: Main entry point for ExpressJS, setup of the server (Socket.io, CORS, Mongoose), and sync of devices and trips through the HyperTrack API

Once started, the project will collect and store all available devices and trips from the HyperTrack API. The Mongoose setup will ensure that missing collection definitions will be created. Once that is complete, the server will listen to HyperTrack Webhooks to come in. Every Webhook will create a record in the database and execute related tasks (e.g. complete a trip from a trip completion webhook). Finally, Webhooks will be channeled to Websocket subscribers (if any) or to mobile apps using Push Notifications. The server will expose REST API endpoints in CRUD fashion for all available entities (trips, devices, etc).

> _Note_: For the sake of simplicity, the Socket.io and REST API endpoints **do not** enforce any auth mechanisms. Before going into production, ensure to secure your server communication.

## Requirements

The goal of this project is to get you to a deployed integration in minutes. For this to work, you need to have:

- [ ] A HyperTrack account [here](https://dashboard.hypertrack.com/signup)
- [ ] Your AccountId and SecretKey from the [HyperTrack Dashboard](https://dashboard.hypertrack.com/setup)
- [ ] A [Heroku account](https://signup.heroku.com/) for deployment
- [ ] (Optional) For mobile device Push Notifications: [Firebase Cloud Messaging key](https://github.com/hypertrack/quickstart-android#enable-server-to-device-communication), [APN Key ID](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns), [APN authentication token signing key](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns), and [Apple Developer account Team ID](https://www.mobiloud.com/help/knowledge-base/ios-app-transfer/)

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

Next, you need to set your environmental varibales. The project uses [dotenv](https://github.com/motdotla/dotenv), so it's best to create a `.env` file in the root folder of the project. This file is listed in `.gitignore` and shall not be checked into public repositories. Below is the content on the file - please ensure to replace the keys with your own:

```shell
# HyperTrack
HT_ACCOUNT_ID = <YOUR_ACCOUNT_ID>
HT_SECRET_KEY = <YOUR_SECRET_KEY>

# MongoDB
MONGODB_URI = <YOUR_MONGODB_URI>

# Optional - Push Notifications
APN_CERT="<YOUR_APN_TOKEN_IN_P8>"
APN_KEY_ID=<YOUR_APN_TOKEN_KEY_ID>
APN_TEAM_ID=<YOUR_TEAM_ID>
FCM_KEY=<YOUR_FCM_KEY>
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
HyperTrack Placeline Backend is RUNNING
```

**Congratulations!** You just completed the integration with HyperTrack APIs and Webhooks.

### Heroku setup

This project is set up to be deployed to Heroku within seconds. You need a Heroku account. All you need to do is to click on the one-click-deploy button below. It will provision the following services and add-ons:

- Web Dyno - to run the server on Heroku (free)
- NodeJS buildpack - to run NodeJS/ExpressJS on Heroku (free)
- MongoLab - hosted MongoDB database (free)
- PaperTrail - hosted logging system (free)

Similar to the local setup, you need to have your keys ready before the deployment. The Heroku page will ask you for the following:

- `HT_ACCOUNT_ID`: Your HyperTrack AccountId from the [HyperTrack Dashboard](https://dashboard.hypertrack.com/setup)
- `HT_SECRET_KEY`: Your HyperTrack SecretKey from the [HyperTrack Dashboard](https://dashboard.hypertrack.com/setup)
- `FCM_KEY`: Push Notifications (optional): Your Firebase Cloud Messaging Key. [Read more here](https://github.com/hypertrack/quickstart-android#enable-server-to-device-communication)
- `APN_KEY_ID`: Push Notifications (optional): Your Apple Push Notification (APN) Key ID. [Read more here](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns)
- `APN_CERT`: Push Notifications (optional): Your Apple Push Notification (APN) authentication token signing key. Paste \*.p8 file contents in the field. [Read more here](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns)
- `APN_TEAM_ID`: Push Notifications (optional): Your Apple Developer account Team ID. [Read more here](https://www.mobiloud.com/help/knowledge-base/ios-app-transfer/)

> _Note:_ For `APN_CERT`, you have to use multiline variables (replace all new lines with `\n` and double quotes around the string). [Read more here](https://stackoverflow.com/a/46161404)

You need to enter all of these keys for the project to run successfully. Heroku uses the input to pre-set the environmental variables for the deployment. You can change after the setup as well.

**Deploy this project now on Heroku:**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hypertrack/sample-backend-nodejs)

## Usage

Coming soon ...

### REST API Endpoints

### Webhooks

### Websockets

### Push Notifications

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
