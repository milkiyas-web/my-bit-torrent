'use strict';
const dgram = require('dgram');
const { response } = require('express');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

// 1. send connection request
// 2. Get the connection and extranct the connection id
// 3. Use the connection id to send announce request - this is where we tell the tracker which files we're interested in 
// 4. Get the announce response and extract the peers list

module.exports.getPeers = (torrent, callback) => {
    const socket = dgram.createSocket('udp4');
    const url = torrent.announce.toString('utf8');

    // Send connection request
    udpSend(socket, buildConnReq(), url);

    socket.on('message', response => {
        if(respType(response) === 'connect') {
            // Receive and parse connect response
            const connResp = parseConnResp(response)
            // Send announce request
            const announceReq = buildAnnounceReq(connResp.connectionId);
            udpSend(socket, announceReq, url);
        } else if(respType(response) === 'announce'){
            // parse announce response
            const announceResp = parseAnnounceResp(response);
            //pass peers to callback
            callback(announceResp.peers)
        }
    })
};

function udpsend(socket, message, rawUrl, callback=() => {}) {
    const url = urlParse(rawUrl)
    socket.send(message, 0, message.length, url.port, url.hostname, callback);
}