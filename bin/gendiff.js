#!/usr/bin/env node
import gendiff from "../src/gendiff.js";
import { EOL } from "os";
gendiff.parse(process.argv);