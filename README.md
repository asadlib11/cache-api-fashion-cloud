# Cache API - Fashion Cloud

Cache API is aa REST API that exposes methods to interact with a cache that gets stored in the db.
Provided operations in this server are fetch, add, update, remove and remove all. You can perform these api calls using Postman collection provided in the project.

# Configurations:

Application and database configurations can be found in json files created in app/config. Here you can change different configurations like dev or test environment settings for server and database.

# APIs:

## GET request to baseUrl/cache

This will list down all cache entries that exists in a database.

## GET request to baseUrl/cache/{key}

This will return a particular cache key stored in database

## POST request to baseUrl/cache/{key}

This will create a key in the database against the information provided

## DELETE request to baseUrl/cache/{key}

This will delete the particular entry against the key provided

## DELETE request to baseUrl/cache

This call will remove all entries from database

# Project Execution

1) Install dependencies using following command:
```javascript
npm install
```

2) Launch MongoDB Instance:
```javascript
docker run --name cache-mongo -d --net=host mongo
```

3) Run tests
```javascript
npm run test
```

3) Run server
```javascript
npm start
```

4) Run server for development
```javascript
npm run dev
```
A postman collection has been added to facilitate with testing the project