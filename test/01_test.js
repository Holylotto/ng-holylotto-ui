var Lottery = artifacts.require("./Lottery.sol");
//var nextLottery = artifacts.require("./nextLottery.sol");
expect = require("chai").expect;

contract("Lottery", function(accounts){
  var c_Lottery;
  const testSize = 10;
  var bets = [[],[],[],[],[],[],[],[],[],[]];
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[],
              // [],[],[],[],[],[],[],[],[],[]];
  var agent = [testSize];
  // var price = 5000000000000000000;
  var fs = require("fs");

  // Catch an instance
  it("Catch an instance of the deployed contract", function(){
    return Lottery.new({"from": accounts[0]}).then(function(instance){
      c_Lottery = instance;
    });
  });
  it("Fill bets vector", function(){
    fs.readFile('./Apuestas.json', 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);
      for (var i = 0; i < testSize; i ++){
        bets[i][0] = obj[i].pos0.toString();
        bets[i][1] = obj[i].pos1.toString();
        bets[i][2] = obj[i].pos2.toString();
        bets[i][3] = obj[i].pos3.toString();
        bets[i][4] = obj[i].pos4.toString();
      }
    });
  });
  // Send some bets
  for(var n = 0; n < testSize; n ++){
    bet(n);
  }
  function bet(_index) {
    var agent;
    if (_index < 10) {
      agent = accounts[_index];
    } else if (_index < 20) {
      agent = accounts[_index % 10];
    } else if (_index < 30) {
      agent = accounts[_index % 20];
    } else if (_index < 40) {
      agent = accounts[_index % 30];
    } else if (_index < 50) {
      agent = accounts[_index % 40];
    } else if (_index < 60) {
      agent = accounts[_index % 50];
    } else if (_index < 70) {
      agent = accounts[_index % 60];
    } else if (_index < 80) {
      agent = accounts[_index % 70];
    } else if (_index < 90) {
      agent = accounts[_index % 80];
    } else if (_index < 100) {
      agent = accounts[_index % 90];
    }
    it("New bet", function(){
      return c_Lottery.bet(bets[_index][0], bets[_index][1], bets[_index][2], bets[_index][3], bets[_index][4], {"from": agent}).then(function(){
        console.log("      => This is the bet number " + _index + ": " + bets[_index][4] + bets[_index][3] + bets[_index][2] + bets[_index][1] + bets[_index][0]);
      });
    });
  }
  // Set the result
  it("Set the result", function(){
    return c_Lottery.setResult({"from": accounts[0]}).then(function(){
      return c_Lottery.newHash().then(function(res){
        console.log("\n      New Hash: " + res);
      });
    });
  });
  // Check hits
  for(var n = 0; n < testSize; n ++){
    getHits(n);
  }
  function getHits(_index) {
    it("Check the number of hits", function(){
      return c_Lottery.hits(_index).then(function(res){
        console.log("\n      Number of hits of bet number " + _index + ": " + res.toNumber());
      });
    });
  }
  // Distribute the prizes
  it("Distribute the prizes", function(){
    return c_Lottery.distributePrizes({"from": accounts[0]}).then(function(){
    });
  });
  // Check hits
  for(var n = 0; n < 10; n ++){
    printBalances(n);
    if (n == testSize - 1) {
      printJackpot();
    }
  }
  function printBalances(_index) {
    it("Print the balances", function(){
      return c_Lottery.balances(accounts[_index]).then(function(res){
        console.log("\n      Balance of player " + _index + ": " + res.toNumber());
      // }).then(function(){
      //   c_Lottery.getBalanceInEth(accounts[_index + 1]).then(function(res){
      //     console.log("\n      Balance in Ether of player " + _index + ": " + res.toNumber());
      //   });
      });
    });
  }
  function printJackpot() {
    it("Print the jackpot", function(){
      return c_Lottery.jackpot().then(function(res){
        console.log("\n      Jackpot: " + res.toNumber());
      // }).then(function(){
      //   return c_Lottery.getBalanceInEth(c_Lottery.address).then(function(res){
      //     console.log("\n      Check: " + res.toNumber());
      //   });
      });
    });
  }
  // Catch an instance
  /*it("Catch an instance of the deployed contract", function(){
    return nextLottery.new(c_Lottery.address, {"from": accounts[0]}).then(function(instance){
      c_nextLottery = instance;
    }).then(function(){
      return c_nextLottery.jackpot().then(function(res){
        console.log("\n      Accrued jackpot: " + res.toNumber());
      });
    });
  });*/

});
