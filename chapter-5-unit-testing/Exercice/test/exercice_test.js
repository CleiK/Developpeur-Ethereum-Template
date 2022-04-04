const Exercice = artifacts.require("./Exercice.sol");

const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract("Exercice", function (accounts ) {
  it("should set student in array", async function() {
    let exerciceInstance = await Exercice.new();

    await exerciceInstance.setEtudiant(accounts[5], 'toto', 20);

    const etudiant = await exerciceInstance.etudiantsArray.call(0);

    assert.equal(etudiant.name, 'toto', 'name not equal');
    assert.equal(etudiant.note, 20, 'note not equal');
  });

  it("should set student in map", async function() {
    let exerciceInstance = await Exercice.new();

    await exerciceInstance.setEtudiant(accounts[5], 'toto', 20);

    const etudiant = await exerciceInstance.etudiantsMap.call(accounts[5]);

    assert.equal(etudiant.name, 'toto', 'name not equal');
    assert.equal(etudiant.note, 20, 'note not equal');
  });

  it("should get student in array", async function() {
    let exerciceInstance = await Exercice.new();
    await exerciceInstance.setEtudiant(accounts[5], 'toto', 20);

    const etudiant = await exerciceInstance.getEtudiantInArray.call(0);
    assert.equal(etudiant.name, 'toto', 'name not equal');
    assert.equal(etudiant.note, 20, 'note not equal');
  });

  it("should get student in map", async function() {
    let exerciceInstance = await Exercice.new();
    await exerciceInstance.setEtudiant(accounts[5], 'toto', 20);

    const etudiant = await exerciceInstance.getEtudiantInMap.call(accounts[5]);
    assert.equal(etudiant.name, 'toto', 'name not equal');
    assert.equal(etudiant.note, 20, 'note not equal');
  });

  describe('hooks', function () {
    let exerciceInstance;
    before(async function () {
      exerciceInstance = await Exercice.new();
      await exerciceInstance.setEtudiant(accounts[5], 'toto', 20);
      await exerciceInstance.setEtudiant(accounts[6], 'bibi', 16);
    });

    it("should delete student in array", async function() {
      await exerciceInstance.deleteEtudiant(accounts[5]);
      
      const etudiant = await exerciceInstance.etudiantsArray.call(0);

      assert.equal(etudiant.name, '', 'name not empty');
      assert.equal(etudiant.note, 0, 'note not 0');
    });

    it("should delete student in map", async function() {
      await exerciceInstance.deleteEtudiant(accounts[5]);
      
      const etudiant = await exerciceInstance.etudiantsMap.call(accounts[5]);

      assert.equal(etudiant.name, '', 'name not empty');
      assert.equal(etudiant.note, 0, 'note not 0');
    });
  });

});
