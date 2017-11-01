// Crowdasle deps
var VLBProxy = artifacts.require("./VLBProxy.sol");
var VLBToken = artifacts.require("./VLBToken.sol");
var VLBCrowdsale = artifacts.require("./VLBCrowdsale.sol");
var VLBRefundVault = artifacts.require("./VLBRefundVault.sol");

module.exports = function(deployer) {
    // var currentTime = Math.floor(Date.now() / 1000);
    // var startTime = currentTime + 1;
    // var endTime = startTime + 5;

    deployer.deploy(VLBToken).then(function() {
        return deployer.deploy(VLBRefundVault).then(function () {
            return deployer.deploy(
                VLBCrowdsale,
                VLBToken.address,
                VLBRefundVault.address, 0, 0).then(function () {
                    return VLBToken.deployed().then(function (instance) {
                        instance.setCrowdsaleAddress(VLBCrowdsale.address);
                    }).catch(function (e) {
                        console.log(e);
                    });
                }).then(function () {
                    return VLBRefundVault.deployed().then(function (instance) {
                        instance.setCrowdsaleAddress(VLBCrowdsale.address);
                    }).catch(function (e) {
                        console.log(e);
                    });
                }).catch(function (e) {
                    console.log(e);
                });
        }).catch(function (e) {
            console.log(e);
        });
    }).then(function () {
        return VLBCrowdsale.deployed().then(function (instance) {
            instance.startPresale();
        });
    }).then(function(){
        return deployer.deploy(VLBProxy, VLBCrowdsale.address);
    }).catch(function(e) {
        console.error(e);
    });
};