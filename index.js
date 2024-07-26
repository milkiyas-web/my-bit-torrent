'use strict';
const fs = require('fs');
const bncode = require('bncode');

const data = fs.readFileSync('puppy.torrent');
const torrent = bncode.decode(data);
console.log(torrent.announce.toString('utf8'));
