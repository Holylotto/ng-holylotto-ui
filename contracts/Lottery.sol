pragma solidity ^0.4.8;

contract Lottery {

    struct Bet {
        address player;
        uint ID;
    }

    bytes32 public newHash;
    string [5] betHash;
    uint [5] public result;
    address public owner;
    string [16] validCharacters = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    mapping (uint => mapping (uint => Bet [])) public bets;
    mapping (uint => uint) public hits;
    uint numBets;
    address [5][100] winners;
    uint [5] numWinners;
    uint pot;
    uint public jackpot;
    mapping (address => uint) public balances;

    // Constructor
    function Lottery () public {
        owner = msg.sender;
    }

    function bet (string _char0, string _char1, string _char2, string _char3, string _char4) public payable {
    /* function bet (string _char0, string _char1, string _char2, string _char3, string _char4) public payable { */
        /* require (msg.value == 5 ether); */
        betHash = [_char0, _char1, _char2, _char3, _char4];
        bool error = false;
        for (uint i = 0; i < betHash.length; i ++) {
            if (getIdCharacter(betHash[i]) != 99) {
                bets[getIdCharacter(betHash[i])][i].push(Bet(msg.sender, numBets));
            }  else {
                error = true;
            }
        }
        // Update the number of bets
        numBets ++;
        // Update the pot
        pot += 5;
    }

    function setResult () public {
        require (msg.sender == owner);

        newHash = block.blockhash(block.number - 1);
        bytes32 newHashCopy = newHash;
        for (uint n = 0; n < result.length; n++) {
            newHashCopy &= bytes32(0xf*2**(4*n));
            if (newHashCopy == bytes32(0xf*2**(4*n))) {
                result [n] = 15;
            } else if (newHashCopy == bytes32(0xe*2**(4*n))) {
                result [n] = 14;
            } else if (newHashCopy == bytes32(0xd*2**(4*n))) {
                result [n] = 13;
            } else if (newHashCopy == bytes32(0xc*2**(4*n))) {
                result [n] = 12;
            } else if (newHashCopy == bytes32(0xb*2**(4*n))) {
                result [n] = 11;
            } else if (newHashCopy == bytes32(0xa*2**(4*n))) {
                result [n] = 10;
            } else if (newHashCopy == bytes32(0x9*2**(4*n))) {
                result [n] = 9;
            } else if (newHashCopy == bytes32(0x8*2**(4*n))) {
                result [n] = 8;
            } else if (newHashCopy == bytes32(0x7*2**(4*n))) {
                result [n] = 7;
            } else if (newHashCopy == bytes32(0x6*2**(4*n))) {
                result [n] = 6;
            } else if (newHashCopy == bytes32(0x5*2**(4*n))) {
                result [n] = 5;
            } else if (newHashCopy == bytes32(0x4*2**(4*n))) {
                result [n] = 4;
            } else if (newHashCopy == bytes32(0x3*2**(4*n))) {
                result [n] = 3;
            } else if (newHashCopy == bytes32(0x2*2**(4*n))) {
                result [n] = 2;
            } else if (newHashCopy == bytes32(0x1*2**(4*n))) {
                result [n] = 1;
            } else if (newHashCopy == bytes32(0x0*2**(4*n))) {
                result [n] = 0;
            }
            newHashCopy &= bytes32(0x0);
            newHashCopy |= newHash;
        }

        setWinners();
    }

    function setWinners () internal {
        // First loop to determine the number of hits
        for (uint i = 0; i < result.length; i ++) {
            for (uint j = 0; j < bets[result[i]][i].length; j ++ ) {
                hits[bets[result[i]][i][j].ID] ++;
                if (hits[bets[result[i]][i][j].ID] != (i + 1))
                hits[bets[result[i]][i][j].ID] --;
            }
        }
        // Second loop to fill winners vectors
        for (i = 0; i < result.length; i ++) {
            for (j = 0; j < bets[result[i]][i].length; j ++ ) {
                if (hits[bets[result[i]][i][j].ID] == (i + 1)) {
                    winners[i][numWinners[i]] = bets[result[i]][i][j].player;
                    numWinners[i] ++;
                }
            }
        }
    }

    function distributePrizes () public {
        require (msg.sender == owner);
        jackpot = pot;
        for (uint i = 0; i < result.length; i ++) {
            for (uint j = 0; j < numWinners[i]; j ++ ) {
                balances[winners[i][j]] += pot / (5 * numWinners[i]);
                jackpot -= pot / (5 * numWinners[i]);
                if (i == result.length - 1) {
                    balances[winners[i][j]] += jackpot / numWinners[i];
                    jackpot -= jackpot / numWinners[i];
                }
                /* winners[i][j].transfer(balances[winners[i][j]]); */
            }
        }
    }

    function getIdCharacter (string _char) internal view returns (uint idCharacter) {
        idCharacter = 99;
        for (uint n = 0; n < validCharacters.length; n++)
        if (keccak256(validCharacters[n]) == keccak256(_char)) { idCharacter = n; }
        return idCharacter;
    }

    function getBalanceInEth (address _address) public constant returns (uint balanceInEth) {
        balanceInEth = _address.balance / 1000000000000000000;
        return (balanceInEth);
    }

}
