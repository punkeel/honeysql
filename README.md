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
$ docker run --rm --name my-honeysql -d -p 127.0.0.1:9000:8080 punkeel/honeysql
```

This exposes an HTTP server on your local address, port 9000. Feel free to redirect requests to it :-)

To follow the logs in real-time:

```
$ docker logs -f my-honeysql
npm info it worked if it ends with ok
npm info using npm@3.10.10
npm info using node@v6.10.2
npm info lifecycle honeysql@0.0.1~prestart: honeysql@0.0.1
npm info lifecycle honeysql@0.0.1~start: honeysql@0.0.1

> honeysql@0.0.1 start /usr/src/app
> node index.js

Unexpected rows.length:20, expected 1 with id=<1 or id<20> from ::ffff:10.8.0.4
Unexpected rows.length:1000, expected 1 with id=<1 or 1> from ::ffff:10.8.0.4
...
```

To stop it: (you shouldn't, really. HoneySQL is great for your health.)
```
$ rm -rf /
```

If the latter command did not work, try this one:
```
$ docker stop my-honeysql
```
