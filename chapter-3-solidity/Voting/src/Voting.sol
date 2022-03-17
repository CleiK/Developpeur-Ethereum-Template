// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Voting is Ownable {
    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);

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

    uint256 winningProposalId;
    WorkflowStatus votingStatus;
    mapping(address => bool) votersWhitelist;

    // proposalId -> proposerAddress -> proposal
    mapping(uint256 => mapping(address => Proposal)) proposals;

    mapping(address => Voter) voters;

    uint256 proposalCount;

    constructor() {
        votingStatus = WorkflowStatus.RegisteringVoters;
    }

    // modifier to check if caller is owner
    modifier onlyWhitelisted() {
        require(votersWhitelist[msg.sender], "Caller not whitelisted");
        _;
    }

    /// Owner methods

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

    function stopProposalRegistrationPeriod() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Can only stop proposal registrations if status was registration started"
        );
        votingStatus = WorkflowStatus.ProposalsRegistrationStoped;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationStoped
        );
    }

    function startVotingSession() external onlyOwner {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationStoped,
            "Can only start voting session if status was proposals registration stoped"
        );
        votingStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStoped,
            WorkflowStatus.VotingSessionStarted
        );
    }

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

    function addVoter(address memory voter) external onlyOwner {
        votersWhitelist[voter] = true;
    }

    /// Voter methods

    function registerProposal(string memory description)
        external
        onlyWhitelisted
    {
        require(
            votingStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals registration didnt start"
        );
        //proposals[proposalCount][msg.sender] = Proposal(description, 0);
        emit ProposalRegistered(proposalCount);
        ++proposalCount;
    }

    function vote(uint256 proposalId) external onlyWhitelisted {
        require(
            votingStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session didnt start"
        );

        //proposals[proposalId]

        emit Voted(msg.sender, proposalId);
    }

    function getWinner() view returns (address) {}
}
