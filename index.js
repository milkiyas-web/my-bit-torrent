'use strict';
const fs = require('fs');
const bncode = require('bncode');
const tracker = require('./tracker');

const data = fs.readFileSync('puppy.torrent');
const torrent = bncode.decode(data);

tracker.gerPeers(torrent, peers => {
    console.log('list of peers', peers)
})
console.log(torrent.announce.toString('utf8'));
