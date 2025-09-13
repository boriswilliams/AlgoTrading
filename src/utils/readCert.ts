import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function readCert(file: string) {
  return String(fs.readFileSync(resolve(__dirname, '..', '..', 'certs', file))).trim();
}
