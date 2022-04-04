const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract("SimpleStorage", accounts => {

  describe('event and revert part', function() {
    it("...should emit event.", async () => {
      const simpleStorageInstance = await SimpleStorage.deployed();
  
      // Set value of 89
      const receipt = await simpleStorageInstance.set(89, { from: accounts[0] });
  
      expectEvent(receipt, 'dataStored', {_data: new BN(89), _addr: accounts[0]})
    });
  
    it("...should revert.", async () => {
      const simpleStorageInstance = await SimpleStorage.deployed();
  
      // Set value of 0
      const setPromise = simpleStorageInstance.set(0, { from: accounts[0] });
  
      expectRevert(setPromise, "vous ne pouvez pas mettre une valeur nulle")
    });
  });

  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });



});