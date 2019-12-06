# cell
Stuart lab cell atlas.

### install:
`npm install`
 
### run locally
`npm start`

### deploy from the local development environment
`cell/bin/deployWww`

### install on server
`cell/bin/installWww`

### stop the server
`ps -eaf | grep 'node server.js'`

### source-map-explorer
To run source-map-explorer insert this in package.json:
`"source-map-explorer": "^1.5.0",`
This was removed because it causes an npm audit warning on its use of insecure 'open'.
