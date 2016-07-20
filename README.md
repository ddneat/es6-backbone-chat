# ES6-Backbone-Chat

* [14pixels](https://github.com/14pixels)
* [davidspinat](https://github.com/davidspinat)

## Start Application

Install mongoDB
```
brew install mongodb
```
Create MongoData dir
```
mkdir -p /data/db
```
Set permissions
```
sudo chmod 0755 /data/db
sudo chown $USER /data/db
```
Run MongoDB
```
mongod
```
Start app
```
npm install
gulp
```

## Tests

```
gulp test
```

## Only Coverage

```
gulp coverage
```

## Documentation

```
gulp doc
```
