// SPDX-License-Identifier: MITs
pragma solidity ^0.8.0;

import "./generated/interfaces/verification/IFheAgentVerification.sol";
import "./generated/implementation/verification/FheAgentVerification.sol";

struct DataEntry {
    bytes32 id;
    bytes32 encrypted_data_hash;
    string encrypted_data;
    string encrypted_result;
}

contract FlareDataStorage {
    DataEntry[] public dataEntries;
    IFheAgentVerification public fheAgentAttestation;

    constructor() {
        fheAgentAttestation = new FheAgentVerification();
    }

    function addDataEntry(IFheAgent.Response calldata fheResponse) public {
        IFheAgent.Proof memory proof = IFheAgent.Proof({
            merkleProof: new bytes32[](0),
            data: fheResponse
        });

        require(
            fheAgentAttestation.verifyFheAgent(proof),
            "Invalid proof"
        );

        DataEntry memory entry = abi.decode(fheResponse.responseBody.abi_encoded_data, (DataEntry));
        dataEntries.push(entry);
    } 

    function getDataEntry(bytes32 id) public view returns (DataEntry memory) {
        for (uint i = 0; i < dataEntries.length; i++) {
            if (dataEntries[i].id == id) {
                return dataEntries[i];
            }
        }

        revert("Data entry not found");
    }
}
