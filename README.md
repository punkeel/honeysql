# SQL HoneyPot

## Introduction

A read-only honeypot that gets pwned easily.
I use it to track automated behaviours, harvest common requests and detect patterns.
Once an user has given me enough data, he wins a permanent IP ban.

## Project Status

I won't be updating this project, I just wanted to open-source it.

It sould not be valuable anyway, so .... who cares? :D


## Features

- Read only database using SQLite
- Detects wrong amount of lines or strange values, thanks to Reproducible Builds™
- Uses Docker! Uses Node.js! Uses SQLite! Doesn't use Bitcoin yet :cry:

## Installation

To install: 
```
$ docker run --name my-honeysql -d -p 127.0.0.1:9000:8080 punkeel/honeysql
```

This exposes an HTTP server on your local address, port 9000. Feel free to redirect requests to it :-)

To follow the logs in real-time:

```
$ docker logs -f my-honeysql
```

