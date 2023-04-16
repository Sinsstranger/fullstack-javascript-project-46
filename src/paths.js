import { cwd } from 'node:process';
import path from 'node:path';

export const paths = (filepath) => (path.isAbsolute(filepath) ? filepath : path.resolve(cwd(), '__fixtures__', filepath));

export const extname = (filepath) => path.extname(filepath);
