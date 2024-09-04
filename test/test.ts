import { put } from '@vercel/blob';
import fs from 'fs';

async function main() {
  const file = fs.readFileSync('test.mp4');

  const blob = await put('large-movie.mp4', file, {
    access: 'public',
    multipart: true,
    token: 'vercel_blob_rw_6FYqCpaK2oEza8dk_3sIuDGCuWeAdAO1ubaOT1GIsDUdtPx',
  });

  console.log(blob);
}

main();
