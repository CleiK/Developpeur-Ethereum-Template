// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

//import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    /// Types

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// States

    // Winning proposal id, 0 means no winning proposal has been set
    uint256 winningProposalId;

    // Voting contract status
    WorkflowStatus votingStatus;

    // proposalId -> proposal
    mapping(uint256 => Proposal) public proposals;

    // voter address -> voter structure
    mapping(address => Voter) public voters;

    // proposalCount starts at 1 because 0 means no proposal
    uint256 proposalCount = 1;

    /// Events

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);

    /// Modifiers

    // modifier to check if caller is a known voter
    modifier onlyWhitelisted() {
        require(voters[msg.sender].isRegistered, "Caller not a known voter");
        _;
    }

    // Init the contract in 'RegisteringVoters' state
    constructor() {
        votingStatus = WorkflowStatus.RegisteringVoters;
    }

    /// Functions

    // Whitelist a new voter
    function addVoter(address voterAddr) external onlyOwner {
        require(!voters[voterAddr].isRegistered, "Voter already registered");
        voters[voterAddr] = Voter(true, false, 0);
    }

    // Goes from RegisteringVoters to ProposalsRegistrationStarted state
    function startProposalRegistrationPeriod() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.RegisteringVoters,
            "Can only start proposal registrations if status was voters registration"
        );
        votingStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    // Goes from ProposalsRegistrationStarted to ProposalsRegistrationEnded state
    function stopProposalRegistrationPeriod() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Can only stop proposal registrations if status was registration started"
        );
        votingStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    // Goes from ProposalsRegistrationEnded to VotingSessionStarted state
    function startVotingSession() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Can only start voting session if status was proposals registration stoped"
        );
        votingStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    // Goes from VotingSessionStarted to VotingSessionEnded state
    function stopVotingSession() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.VotingSessionStarted,
            "Can only stop voting session if status was voting session started"
        );
        votingStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    // Goes from VotingSessionEnded to VotesTallied state and compute winning proposal
    function endVotes() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.VotingSessionEnded,
            "Cannot compute votes as voting session isn't finished"
        );
        votingStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );

        uint256 max = 0;
        uint256 winningId = 0;
        for (uint256 id = 1; id <= proposalCount; ++id) {
            if (proposals[id].voteCount > max) {
                max = proposals[id].voteCount;
                winningId = id;
            }
        }

        winningProposalId = winningId;
    }

    // Register a new proposal
    function registerProposal(string memory description)
        external
        onlyWhitelisted
    {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals registration didnt start"
        );
        proposals[proposalCount] = Proposal(description, 0);
        emit ProposalRegistered(proposalCount);
        ++proposalCount;
    }

    // Vote for a proposal
    function vote(uint256 proposalId) external onlyWhitelisted {
        require(
            votingStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session didnt start"
        );

        require(!voters[msg.sender].hasVoted, "You already voted!");
        require(proposalExist(proposalId), "Unknown proposal id");

        proposals[proposalId].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = proposalId;

        emit Voted(msg.sender, proposalId);
    }

    // Gets the winning proposal
    function getWinningProposal() external view returns (Proposal memory) {
        require(
            votingStatus == WorkflowStatus.VotesTallied,
            "Votes aren't already tallied"
        );

        // This assert should not trigger, otherwise there is a bug int the contract
        assert(proposalExist(winningProposalId));
        return proposals[winningProposalId];
    }

    // Check the existence of a proposal
    function proposalExist(uint256 proposalId) internal view returns (bool) {
        return bytes(proposals[proposalId].description).length > 0;
    }
}
