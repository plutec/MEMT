# MEMT Categorizer

Tool for generating the initial dataset from your samples. This tool classifies, all your samples and outputs a nice JSON ready to be imported into MongoDB, it also generates all the images regarding your samples.

## Building and installation

### Requirements

First we need to clone the project repository:

`git clone https://github.com/SecurityArtWork/MEMT`

After this, a symlink must be created to the `$GOPATH`, if you don't have a operative Go environment you should setup one before going further.

`ln -s /home/securityartwork/MEMT/cat $GOPATH/src/github.com/securityartwork/cat`

ALERT!! Be careful (I spend a lot of hours), it only works with libfuzzy-dev => 2.13.2
`apt-get install libfuzzy-dev`

### Installation

Now you can build the categorizer issuing:


```go
go get
go build categorizer.go
```

## Usage

```
./categorizer -h

Usage of categorizer:
  -dir string
      Dir to scan. (default "./")
  -imgout string
      Output directory of generated pictures. (default "/tmp")
  -threshold int
      Sets threshold to compare (default 1)
  -verbose
      Goes verbose.
```

After generate your data from the binaries dataset, you can import them to mongodb using the `db_importer.py` script:

The requeriments are geoip2 module:
```sh
pip install geoip2 pymongo
```
And you can get the cities free database from: https://www.maxmind.com/en/geoip2-city

After, save it in /cat/ folder with the name GeoLite2-City.mmdb

Then, run the loader:
```
python init_loader.py output_file.json
```