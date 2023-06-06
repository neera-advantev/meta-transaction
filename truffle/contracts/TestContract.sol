// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestContract is
    OwnableUpgradeable,
    UUPSUpgradeable,
    ERC2771Recipient
{
    function initialize(
        address _forwarder
    ) public virtual initializer {
        __UUPSUpgradeable_init();
        __Ownable_init_unchained();
        _trustedForwarder=_forwarder;
    }

    address private _trustedForwarder;

    mapping(address => string) private testString;

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    function isTrustedForwarder(address forwarder) public virtual override view returns(bool) {
        return forwarder == _trustedForwarder;
    }

    function _msgSender()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771Recipient)
        returns (address sender)
    {
        return super._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771Recipient)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    function setString (string memory _text) public {
        testString[_msgSender()] = _text;
    }
}
