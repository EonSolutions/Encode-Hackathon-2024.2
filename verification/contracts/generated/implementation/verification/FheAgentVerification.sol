// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
  
  import '../../../interfaces/types/IFheAgent.sol';
  import '../../interfaces/verification/IFheAgentVerification.sol';
  
  /**
   * Contract mocking verifying FheAgent attestations.
   */
  contract FheAgentVerification is IFheAgentVerification {
  
     /**
      * @inheritdoc IFheAgentVerification
      */
     function verifyFheAgent(
        IFheAgent.Proof calldata _proof
     ) external pure returns (bool _proved) {
        return _proof.data.attestationType == bytes32("FheAgent");
     }
  }
     