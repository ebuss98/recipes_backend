# Backend service description

## Main points

On Backend express is used to create a HTTP API.
Backend connets to MongoDB using mongodb npm packet.
Service is started by _npm start_ console command.
Service runs at 8080 port.

## Functionality

Service provides HTTP API to manage recipes and post scores and comments.

VK OAuth is used to login users and determine their names and avatars with out regular registration needed.

## Arcitecture

Class that handles MongoDB interaction is located at db.js. It is then imported into app.js where connection is established and exported to other components.

app.js contains the db connection establishment, creation of a HTTP server and some basic routes.

Folder routes contains decomposed routes which are aggregated in routes/index.js and exported to then used in app.js

## DB description

- **Collection recipes**
  Contains all recipies with their params, comments and scores
  </br>

- **Collection users**
  Contains basic user information retrieved from VK
  </br>

- **Collection tokes**
  Contains the relation between a frondend token and user to determine the user
