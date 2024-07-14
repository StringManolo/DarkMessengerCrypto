#!/usr/bin/env qjs

import * as std from 'std';

const tamañoObjetivo = 10 * 1024 * 1024; // 10 MB
const tamañoLinea = 2; // 'a' + '\n'
const numLineas = tamañoObjetivo / tamañoLinea;

const archivo = std.open('10MBfile.txt', 'w');

for (let i = 0; i < numLineas; i++) {
    archivo.puts('a\n');
}

archivo.close();
std.printf('Done.\n');

