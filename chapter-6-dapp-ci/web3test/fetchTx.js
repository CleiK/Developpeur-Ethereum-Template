var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.g.alchemy.com/v2/JPx2H6VuB4cKQfg9pUCh07nz4Q7SCtXh'));

var ethTx = ('0x68039f3a75f5335f7ce21ec3be03ac57e67c0ae42f664c4a25c8befe6cd018b6');

web3.eth.getTransaction(ethTx, function(err, result) { 

if (!err && result!== null) {
    console.log(result); // Log all the transaction info
    console.log('From Address: ' + result.from); // Log the from address console.log('To Address: ' +  result.to); // Log the to address
    console.log('Ether Transacted: ' + web3.utils.fromWei(result.value, 'ether')); // Get the value, convert from Wei to Ether and log it
}

else {
    console.log('Error!', err); // Dump errors here
}

});