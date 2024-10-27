// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  import "../../../interfaces/types/IFheAgent.sol";
  
  
  interface IFheAgentVerification {
     function verifyFheAgent(
        IFheAgent.Proof calldata _proof
     ) external view returns (bool _proved);
  }
     