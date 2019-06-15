
SOURCE EXPLORER:
To run source-map-explorer insert this in package.json,
"dependencies" section:
	"source-map-explorer": "^1.5.0",
This was removed from the normal build because it causes an npm audit warning on
its use of insecure 'open'.
