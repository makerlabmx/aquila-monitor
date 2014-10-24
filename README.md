# Aquila Monitor

Command line monitor for the Aquila API.

This is a node.js console configured with the aquila-client library.
You can use any of the library's command for monitoring and interfacing with the Aquila network.
Form more details, check aquila-client documentation [here](https://github.com/makerlabmx/aquila-client-node).

## Instalation

```
npm install aquila-monitor -g
```

## Use

```
aquila-monitor --url <Hub server url> --user <User name> --password <Password> --verbose
```

Parameters:
- ``--url``: The URL of your hub server. Default: http://localhost:8080
- ``--user``: Your User name. Default: Admin
- ``--password``: Your Password. Default: Admin
- ``--verbose``: Enables Logging of when a device is added, removed and events in the Aquila network