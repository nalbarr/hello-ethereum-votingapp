// 1. initialize
var fs = require('fs');
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts
//['0x5c252a0c0475f9711b56ab160a1999729eccce97'
//'0x353d310bed379b2d1df3b727645e200997016ba3'
//'0xa3ddc09b5e49d654a43e161cae3f865261cabd23'
//'0xa8a188c6d97ec8cf905cc1dd1cd318e887249ec5'
//'0xc0aa5f8b79db71335dacc7cd116f357d7ecd2798'
//'0xda695959ff85f0581ca924e549567390a0034058'
//'0xd4ee63452555a87048dcfe2a039208d113323790'
//'0xc60c8a7b752d38e35e0359e25a2e0f6692b10d14'
//'0xba7ec95286334e8634e89760fab8d2ec1226bf42'
//'0x208e02303fe29be3698732e92ca32b88d80a2d36']

// 2. compile
var code = fs.readFileSync('Voting2.sol').toString();
var solc = require('solc');
var compiledCode = solc.compile(code);

// 3. deploy
var abiDefinition = JSON.parse(compiledCode.contracts[':Voting2'].interface);
var VotingContract = web3.eth.contract(abiDefinition);
var byteCode = compiledCode.contracts[':Voting2'].bytecode;
var deployedContract = VotingContract.new(['Tom','Dick','Harry'],{data: byteCode, from: web3.eth.accounts[1], gas: 4700000});
console.log('deployedContract.address: %s', deployedContract.address);

/*
var contractInstance = VotingContract.at(deployedContract.address);
//console.log('contractInstance: %s', contractInstance);

// 3. test
var before = contractInstance.totalVotesFor.call('Tom');

//{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
var totalVotes = console.log('contractInstance: %s', contractInstance);

contractInstance.voteForCandidate('Tom', {from: web3.eth.accounts[1]});
contractInstance.voteForCandidate('Tom', {from: web3.eth.accounts[1]});
contractInstance.voteForCandidate('Tom', {from: web3.eth.accounts[1]});
contractInstance.totalVotesFor.call('Tom').toLocaleString();
console.log('totalVotes: %d', totalVotes);
*/