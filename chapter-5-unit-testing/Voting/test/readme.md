# Voting contract testing

The voting_test.js file contains all the relevant unit tests for the Voting smartcontract.

It uses openzeppelin's test-helpers library to test reverts and events.
It also uses chai library to use the expect function.

Todo:
only one expect per test
expect(new BN(result.data)).to.be.bignumber.equal(new BN(10));

## Getters

### getVoter function

Before testing the function, we create a new Voting contract instance and add a voter.
We then test several cases:
- Revert when the caller is not a voter
- Get an empty value when the voter doesn't exist
- The nominal case: get a registered voter


### getOneProposal function


## Registration

## Proposal

## Vote

## State