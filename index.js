import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import busboyBodyParser from 'busboy-body-parser';
import sharp from 'sharp';
import axios from 'axios';
import Bearer from 'bearer';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, crypto, busboyBodyParser, sharp, axios, Bearer);

app.listen(process.env.PORT ?? 4321);