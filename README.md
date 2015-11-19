## Hapijs example server app

This is just a barebone [Hapijs](http://hapijs.com/) example server with minimal security configuration setup.

### Installation

```
$ npm install
```

### Setup environment variables

Add these 2 in your `bashrc` or export them for easy access to the app:

```
process.env.HOST
process.env.PORT
```

NOTE: The default is `localhost` for `HOST` and `8080` for `PORT`.

### Start the server

```
$ npm start
```

### Try it out

Visit: http://HOST:PORT or the default http://localhost:8080
