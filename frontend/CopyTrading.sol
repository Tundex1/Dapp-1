// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CopyTrading {
    struct Trade {
        address trader;
        address follower;
        uint256 amount;
        string tradeType;
        uint256 timestamp;
    }

    mapping(address => address[]) public followers;
    Trade[] public trades;

    function followTrader(address _trader) public {
        followers[_trader].push(msg.sender);
    }

    function executeTrade(uint256 _amount, string memory _tradeType) public {
        for (uint i = 0; i < followers[msg.sender].length; i++) {
            trades.push(Trade({
                trader: msg.sender,
                follower: followers[msg.sender][i],
                amount: _amount,
                tradeType: _tradeType,
                timestamp: block.timestamp
            }));
        }
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }
}
 