# Voting DApp

## Live

Contract is live on Rinkeby at 0xE190B6198944f10aa9D19A12Dd98Cd2626418ffE
Found the frontend at https://cleik.github.io/Developpeur-Ethereum-Template/

## Local


In a separate terminal, launch a local ganache instance
```
npm run ganache
```

Compile and deploy on your local blockchain
```
npm run migrate
```

Configure your browser wallet with ganache available accounts and ganache local blockchain
```
RPC: http://127.0.0.1:8545 (with WSL2, you may have to use the WSL2 machine IP instead of 127.0.0.1)
Network ID: 1337
```

In the client folder, start the frontend
```
npm run start
```
