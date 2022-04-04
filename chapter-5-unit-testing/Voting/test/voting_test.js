const Voting = artifacts.require("./Voting.sol");

const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

contract("Voting", function (accounts ) {
  const user1 = accounts[1];
  const user2 = accounts[2];

  // getVoter
  describe('getVoter', function () {
    let votingInstance;
    let owner;

    // Create the voting contract and add user1 as voter
    before(async function () {
      votingInstance = await Voting.new();
      owner = await votingInstance.owner();
      await votingInstance.addVoter(user1, {from: owner});
    });

    it("should revert (caller is not a voter)", async function() {
      let getVoterPromise = votingInstance.getVoter.call(user1,{ from: user2 });
      expectRevert(getVoterPromise, "You're not a voter");
    });

    it("should return an empty value", async function() {
      let actual = await votingInstance.getVoter.call(user2, {from:user1});
      expect(actual.isRegistered).to.be.equal(false, "bad isRegistered state");
    });

    it("should return a registered voter", async function() {
      let actual = await votingInstance.getVoter.call(user1, {from:user1});
      expect(actual.isRegistered).to.be.equal(true, "bad isRegistered state");
    });
  });

  // getOneProposal
  describe('getOneProposal', function () {
    let votingInstance;
    let owner;
    const proposalDescription = "My testing proposal";

    // Create the voting contract, add user1 as voter and add a proposal at index 0
    before(async function () {
      votingInstance = await Voting.new();
      owner = await votingInstance.owner();

      await votingInstance.addVoter(user1, {from: owner});
      await votingInstance.startProposalsRegistering({from: owner});
      await votingInstance.addProposal(proposalDescription, {from: user1});
    });

    it("should revert (caller is not a voter)", async function() {
      let getOneProposalPromise = votingInstance.getOneProposal.call(0,{ from: user2 });
      expectRevert(getOneProposalPromise, "You're not a voter");
    });

    it("should revert on non existent proposal", async function() {
      let getOneProposalPromise = votingInstance.getOneProposal.call(1, {from:user1});
      expectRevert.unspecified(getOneProposalPromise);
    });

    it("should return an existing proposal with the correct description", async function() {
      let actual = await votingInstance.getOneProposal.call(0, {from:user1});
      expect(actual.description).to.be.a('string').equal(proposalDescription);
    });

    it("should return an existing proposal with the correct voteCount", async function() {
      let actual = await votingInstance.getOneProposal.call(0, {from:user1});
      //expect(actual.voteCount).to.be.equal(0);
      assert.equal(actual.voteCount, 0, "voteCount not 0");
    });
  });

  // getWinner

  // addVoter
  describe('addVoter', function () {
    let votingInstance;
    let owner;

    // Create the voting contract
    before(async function () {
      votingInstance = await Voting.new();
      owner = await votingInstance.owner();
    });

    it("should add user1 as voter and emit event", async function() {
      let addVoterReceipt = await votingInstance.addVoter(user1, {from: owner});
      expectEvent(addVoterReceipt, "VoterRegistered", {voterAddress: user1});
    });

    it("should revert (voter already registered)", async function() {
      let addVoterPromise = votingInstance.addVoter(user1, {from: owner});
      expectRevert(addVoterPromise, "Already registered");
    });

    it("should revert (caller is not the owner)", async function() {
      let addVoterPromise = votingInstance.addVoter.call(user1,{ from: user2 });
      expectRevert(addVoterPromise, "Ownable: caller is not the owner");
    });

    it("should revert (workflowstatus not RegisteringVoters)", async function() {
      // change workflowstatus to trigger the revert
      votingInstance.startProposalsRegistering.call({from: owner});
      let addVoterPromise = votingInstance.addVoter(user1, {from: owner});
      expectRevert(addVoterPromise, "Already registered");
    });
  });

  // addProposal
  // setVote
  // startProposalsRegistering
  // endProposalsRegistering
  // startVotingSession
  // endVotingSession
  // tallyVotesDraw

});
