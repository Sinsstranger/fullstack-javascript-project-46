import { cwd } from 'node:process';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import { paths, extname } from '../src/paths.js';

const fullPath = path.resolve(cwd(), '__fixtures__');

test('format', () => {
  expect(extname(path.join(fullPath, 'file1.json'))).toEqual('.json');
  expect(extname(path.join(fullPath, 'file1.yaml'))).toEqual('.yaml');
});

test('filepaths', () => {
  expect(paths('file1.json')).toEqual(path.join(fullPath, 'file1.json'));
  expect(paths('file1.yaml')).toEqual(path.join(fullPath, 'file1.yaml'));
  expect(paths('')).toEqual(fullPath);
  expect(paths(fullPath)).toEqual(fullPath);
});

const expectedValueStylish = fs.readFileSync(paths('result_stylish.txt'), 'utf-8');

test('compare flat JSON files', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedValueStylish);
});

test('compare flat YAML files', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedValueStylish);
});

test('compare flat YAML files (stylish)', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(expectedValueStylish);
});

const expectedValuePlain = fs.readFileSync(paths('result_plain.txt'), 'utf-8');

test('compare flat JSON files (plain)', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedValuePlain);
});

test('compare flat YAML files (plain)', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expectedValuePlain);
});

const expectedValueJson = fs.readFileSync(paths('result_json.txt'), 'utf-8');

test('compare flat JSON files (json)', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedValueJson);
});

test('compare flat YAML files (json)', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedValueJson);
});
