#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { SME1, DECRYPT_SME1 } from './SME1_module.js';

// Function to print usage
const printUsage = () => {
  console.log(`
Usage: node cli.js [options]

Options:
  -e, --encrypt            Encrypt the input text or file
  -d, --decrypt            Decrypt the input text or file
  -t, --text <text>        Text to be encrypted or decrypted
  -f, --file <filename>    File to be encrypted or decrypted
  -p, --pass <password>    Password to be used for encryption or decryption
  -o, --output <filename>  Output file for the encrypted or decrypted data
`);
};

// Function to parse arguments
const parseArgs = (args) => {
  const options = {};
  for (let i = 2; i < args.length; i++) {
    switch (args[i]) {
      case '-e':
      case '--encrypt':
        options.encrypt = true;
        break;
      case '-d':
      case '--decrypt':
        options.decrypt = true;
        break;
      case '-t':
      case '--text':
        options.text = args[++i];
        break;
      case '-f':
      case '--file':
        options.file = args[++i];
        break;
      case '-p':
      case '--pass':
        options.password = args[++i];
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        printUsage();
        process.exit(1);
    }
  }
  return options;
};

// Main function
const main = async () => {
  const options = parseArgs(process.argv);

  if (!options.encrypt && !options.decrypt) {
    console.error('You must specify either --encrypt or --decrypt.');
    printUsage();
    process.exit(1);
  }

  if (!options.password) {
    console.error('You must specify a password using --password.');
    printUsage();
    process.exit(1);
  }

  let inputData;

  if (options.text) {
    inputData = options.text;
  } else if (options.file) {
    try {
      inputData = fs.readFileSync(path.resolve(options.file), 'utf8');
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.error('You must specify input data using --text or --file.');
    printUsage();
    process.exit(1);
  }

  let outputData;
  let key;

  if (options.encrypt) {
    [outputData, key] = SME1(inputData, options.password);
    console.log(`Encryption Key: ${key}`);
  } else if (options.decrypt) {
    outputData = DECRYPT_SME1(inputData, options.password);
  }

  if (options.output) {
    try {
      fs.writeFileSync(path.resolve(options.output), outputData, 'utf8');
      console.log(`Output written to ${options.output}`);
    } catch (error) {
      console.error(`Error writing to file: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log(outputData);
  }
};

main();

