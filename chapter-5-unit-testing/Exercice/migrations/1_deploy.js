const Exercice = artifacts.require("Exercice");

module.exports = (deployer) => {
    deployer.deploy(Exercice);
};
