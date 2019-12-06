const { composeAPI } = require('@iota/core')
var sizeof = require('object-sizeof');
var crypto = require("crypto");
const fs = require('fs');
const MAMChannel = require('./MAMChannel.js');

// Depth or how far to go for tip selection entry point.
const depth = 3

// Difficulty of Proof-of-Work required to attach transaction to tangle.
// Minimum value on mainnet is `14`, `7` on spamnet and `9` on devnet and other testnets.
const minWeightMagnitude = 14

var providers = [
  "http://89.163.242.213:14265",
  "https://ultranode.iotatoken.nl:443",
  "https://wallet1.iota.town:443",
  "http://185.244.195.45:14265",
  "https://wallet2.iota.town:443",
  "http://213.136.94.247:14265",
  "http://tanglenode.de:14265",
  "http://207.180.224.65:14265",
  "https://contabo02.pinter-net.at:14267",
  "https://node-iota.org:14267",
  "http://173.249.50.233:14265",
  "https://node01.gubiota.ch:443",
  "http://173.249.43.185:14265",
  "https://node02.gubiota.ch:443",
  "http://159.69.116.60:14265",
  "http://207.180.252.59:14265",
  "http://iotawallet.tobg.com.de:14265",
  "http://167.86.121.248:14265",
  "http://78.46.254.167:14265",
  "http://node06.iotatoken.nl:14265",
  "http://85.214.106.245:14265",
  "http://116.202.20.58:14265",
  "http://node04.iotatoken.nl:14265",
  "https://perma.iota.partners:443",
  "http://node01.iotatoken.nl:14265",
  "http://node05.iotatoken.nl:14265",
  "http://188.68.48.254:14265",
  "https://nod3.theshock.de:443",
  "https://pow.iota.community:443",
  "http://node02.iotatoken.nl:14265",
  "https://iotanode.world:14267",
  "http://167.86.119.89:14265",
  "https://nodes.thetangle.org:443",
  "https://iota.chain.garden:443",
  "http://94.16.112.202:14265",
  "http://207.180.202.219:14265",
  "http://117.102.178.100:14265",
  "http://173.249.23.161:14265",
  "https://iota1.chain.garden:443",
  "http://131.112.180.45:14265",
  "http://117.102.178.102:14265",
  "http://173.249.42.88:14265",
  "https://node00.gubiota.ch:443",
  "https://nodes.iota.cafe:443",
  "http://31.214.240.100:14265",
  "http://turbor.ddns.net:14265",
  "http://144.76.186.185:14265",
  "https://trinity.iota-tangle.io:14265",
  "http://167.86.108.113:14265",
  "https://django.zapto.org:14267",
  "https://piota-node.com:443",
  "https://node.vanityfive.de:443",
  "https://stirrlink.dyndns.org:14267",
  "http://iota-fn01.sairai.de:14265",
  "https://www.iotaqubic.us:443",
  "http://node03.iotatoken.nl:14265",
  "http://213.136.79.161:14265",
  "http://212.47.242.90:14265",
  "http://me2byme2.com:14265",
  "http://173.249.16.242:14265",
  "http://195.201.114.197:14265",
  "http://174.141.204.79:14265",
  "http://speedynode.ddns.net:14265",
  "https://mama.iota.family:14267",
  "https://nodes.tangled.it:443",
  "https://v22017125353157610.bestsrv.de:14267",
  "http://60.126.208.96:14265",
  "http://5.189.135.61:14265",
  "https://papa.iota.family:14267",
  "http://85.214.148.21:14265",
  "http://173.249.17.230:14265"
];

async function simulateIOTDevice() {
  var random = Math.floor(Math.random() * 71);
  var index
  var myMAMChannel = new MAMChannel(
    'private',
    providers[random],
    '8ssssstt3c4zz1uj' + Math.floor(Math.random() * 100000),
    ''
  );

  myMAMChannel.openChannel();
  var root = myMAMChannel.getRoot();

  //console.log(root)
  try {
    for (index = 0; index < 100; index++) {

      var intermediateMsg = '{"location": "Vineyard", "device": "NodeMCU", "humidity": "70", "temperature":' + index + '}'
      var jsonMessage = JSON.parse(intermediateMsg);
      //console.log(intermediateMsg);
      //console.log(sizeof(jsonMessage))
      var date = new Date();
      var milliseconds = date.getTime();
      console.log('Sending timestamp: ' + milliseconds)
      fs.appendFile('timestamps_finale_mam_single' + root + '.csv', index + ',' + milliseconds + ',', (err) => {
        if (err) throw err;
      })
      var result = await myMAMChannel.publish(jsonMessage);
      var date2 = new Date();
      var milliseconds2 = date2.getTime();
      console.log('Attachment timestamp: ' + result[0])
      console.log('Locale timestamp: ' + milliseconds2)
      fs.appendFile('timestamps_finale_mam_single' + root + '.csv', milliseconds2 + ',' + result[1] + '\n', (err) => {
        if (err) throw err;
      })

    }
  } catch (err) {
    console.log(err)
  }

  console.log('Finished!');
}

async function process(arrayOfPromises) {
  console.time(`process`);
  let responses = await Promise.all(arrayOfPromises);
  for (let r of responses) {}
  console.timeEnd(`process`);
  return;
}

async function handler() {
  let arrayOfPromises = [
    simulateIOTDevice(),
  ];

  await process(arrayOfPromises);
  console.log(`processing is complete`);
}

handler();
