// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Exercice {

  struct Etudiant {
    string name;
    uint note;
  }

  Etudiant[] public etudiantsArray;
  mapping(address => Etudiant) public etudiantsMap;

  function getEtudiantInMap(address _etudiantAddr) public view returns (Etudiant memory) {
    return etudiantsMap[_etudiantAddr];
  }

  function getEtudiantInArray(uint _index) public view returns (Etudiant memory) {
    return etudiantsArray[_index];
  }

  function setEtudiant(address _etudiantAddr, string memory _name, uint _note) public {
    Etudiant memory etudiant;
    etudiant.name = _name;
    etudiant.note = _note;
    etudiantsMap[_etudiantAddr] = etudiant;
    etudiantsArray.push(etudiant);
  }

  function deleteEtudiant(address _etudiantAddr) public {    
    for(uint i = 0; i < etudiantsArray.length; ++i) {
      if(stringEquals(etudiantsArray[i].name, etudiantsMap[_etudiantAddr].name)) {
        delete etudiantsArray[i];
      }
    }
    delete etudiantsMap[_etudiantAddr];
  }

  function stringEquals(string memory _s1, string memory _s2) public pure returns (bool) {
    return keccak256(abi.encodePacked(_s1)) == keccak256(abi.encodePacked(_s2));
  }
  
}
