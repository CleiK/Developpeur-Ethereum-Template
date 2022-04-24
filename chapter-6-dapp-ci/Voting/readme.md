# Voting DApp

## Local


In a separate terminal, launch a local ganache instance
```
npm run ganache
```

Compile and deploy on your local blockchain
```
truffle migrate --reset --network development
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