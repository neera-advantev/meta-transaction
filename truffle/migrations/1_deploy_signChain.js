const ethUtil = require('ethereumjs-util');

var SignChain = artifacts.require("TestContract");

const forwarderAddress = ethUtil.toChecksumAddress('0xB2b5841DBeF766d4b521221732F9B618fCf34A87');

module.exports = function(deployer) {
    console.log("deploying");
    deployer.deploy(SignChain).then(instance => {
        console.log(`Contract has been deployed at address: ${instance.address}`);
        return instance.initialize(forwarderAddress, { from: '0x2389E85F268a7ba46C9D953e9A13802F665C759C' });
    }).then(() => {
        console.log("Contract has been deployed and initialized.");
    }).catch(err => {
        console.log("Error deploying and initializing contract:", err);
    });
};