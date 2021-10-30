import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import busboyBodyParser from 'busboy-body-parser';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, crypto, busboyBodyParser);

app.listen(process.env.PORT ?? 4321);