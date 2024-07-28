'use strict';
const fs = require('fs');
const bncode = require('bncode');
const tracker = require('./tracker');
const download = require('./src/download');
const torrentParser = require('./src/torrent-parser');

const torrent = torrentParser.open(process.argv[2]);

download(torrent);
const data = fs.readFileSync('puppy.torrent');

tracker.gerPeers(torrent, peers => {
    console.log('list of peers', peers)
})
console.log(torrent.announce.toString('utf8'));
