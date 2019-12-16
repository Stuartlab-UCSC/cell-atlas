
# cell-atlas
This is the front-end for the [UCSC's Cell Atlas](https://cellatlas.ucsc.edu/). It does handy
things like exposing single cell clustering solutions
to the community via a RESTful api, and stores the Cell Type Worksheets of our users.
Check out the back-end for 
[Cell Type Worksheets](https://cellatlasapi.ucsc.edu/cell-type).

## Requirements
node >= v10.16
git

## Install
```
git clone https://github.com/stuartlab-UCSC/cell-atlas.git
cd cell-atlas
npm install

```
## Start on development machine
```
npm start
```

## Start on production machine
The app first needs to be installed on production as below.
```
cd cell-atlas
bin/start
```

## Install on production
On your development machine, after modifying bin/deployWww to match your instance.
```
cd cell-atlas
bin/deployWww
```
On your production machine, after modifying bin/installWww to match your instance.
First copy the script, bin/installWww into hour 
```
cd <install-dir>
```
Copy the script, bin/installWww into your install directory.
```
installWww
```

## Code size view
To run source-map-explorer insert this in package.json,
"dependencies" section:
```source-map-explorer": "^1.5.0",
```
This was removed from the normal build because it causes an npm audit warning on
its use of insecure 'open'.

## Eslint all js files
```
cell-atlas/eslintAll
```

## Code style guidelines
- use material-ui
- css spacing: use theme.spacing.unit when possible
- use 4 spaces for tabs
- omit semicolons at end of lines
