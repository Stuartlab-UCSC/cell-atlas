
# cell-atlas
This is the front-end for the [UCSC's Cell Atlas](https://cellatlas.ucsc.edu/). It does handy
things like exposing single cell clustering solutions
to the community via a RESTful api, and stores the Cell Type Worksheets of our users.
Check out the back-end for 
[Cell Type Worksheets](https://cellatlasapi.ucsc.edu/cell-type).

The associated git code repositories are:

[Stuartlab-UCSC/cell-atlas](https://github.com/Stuartlab-UCSC/cell-atlas)
the server that serves the HTML and javascript for the web pages

[Stuartlab-UCSC/cluster-db](https://github.com/Stuartlab-UCSC/cluster-db)
the server of the data as well as handling user logins

[Stuartlab-UCSC/ctwpy](https://github.com/Stuartlab-UCSC/ctwpy)
the scripts to ingest scanpy objects or TSV files into the cell type workbench

[Stuartlab-UCSC/ctwseurat](https://github.com/Stuartlab-UCSC/ctwseurat)
the scripts to ingest seurat objects into the cell type workbench

[Stuartlab-UCSC/ctwingest](https://github.com/Stuartlab-UCSC/ctwingest)
a dependency of ctwpy and ctwseurat and contains the common code to ingest 
scanpy objects, seurat objects or TSV files into the cell type workbench

## Requirements
node >= v10.16, git

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

## Start on production machine
The app first needs to be installed on production as below.
```
cd cell-atlas
bin/start
```

## Code size view
To run source-map-explorer insert this in package.json,
"dependencies" section:
```
source-map-explorer": "^1.5.0",
```
This was removed from the normal build because it causes an npm audit warning on
its use of insecure 'open'.

## Eslint all js files
```
cell-atlas/eslintAll
```

## Code style guidelines
- use material-ui
- use 4 spaces for tabs
