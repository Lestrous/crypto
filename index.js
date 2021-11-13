import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import busboyBodyParser from 'busboy-body-parser';
import imageSize from 'image-size';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, crypto, busboyBodyParser, imageSize);

app.listen(process.env.PORT ?? 4321);