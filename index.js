import express from 'express';
import bodyParser from 'body-parser';
import fs, { createReadStream } from 'fs';
import crypto from 'crypto';
import http from 'http';
import Busboy from 'busboy';
import { inspect } from 'util';
import busboyBodyParser from 'busboy-body-parser';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, createReadStream, crypto, http, fs, Busboy, inspect, busboyBodyParser);

app.listen(process.env.PORT ?? 4321);