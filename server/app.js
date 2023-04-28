import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import fallback from 'express-history-api-fallback';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = import.meta.env?.PORT ? import.meta.env.PORT : 3000;
const app = express();

const staticFilesRegex = /\.(?:jpg|jpeg|gif|png|mp3|js|css|ttf|woff2)/;
const root = join(__dirname, '../dist');

app.use(
  '/',
  expressStaticGzip(root, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    serveStatic: {
      setHeaders: (res, path) => {
        if (staticFilesRegex.test(path)) {
          res.setHeader('Cache-Control', 'max-age=15552000');
          return;
        }

        res.setHeader(
          'Cache-Control',
          'max-age=no-cache, no-store, must-revalidate',
        );
      },
    },
  }),
);

app.use(
  fallback('index.html', {
    root,
    headers: { 'Cache-Control': 'max-age=no-cache, no-store, must-revalidate' },
  }),
);

app.listen(port);

console.log(`Server started on port ${port}`);
