// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

///////////////////////////////////////////////////////////////////
// DO NOT CHANGE Request and Response definitions!!!
///////////////////////////////////////////////////////////////////

/**
 * @custom:name FheAgent
 * @custom:supported WEB2
 * @author Cy4
 * @notice FheAgent attestation type
 * @custom:verification Data is fetched from a url. The structure of the final json is written in the `abi_signature` field.
 * @custom:lut <lowestUsedTimestamp>
 */
interface IFheAgent {
    /**
     * @notice Toplevel request
     * @param attestationType ID of the attestation type.
     * @param sourceId ID of the data source.
     * @param messageIntegrityCode `MessageIntegrityCode` that is derived from the expected response.
     * @param requestBody Data defining the request. Type (struct) and interpretation is determined by the `attestationType`.
     */
    struct Request {
        bytes32 attestationType;
        bytes32 sourceId;
        bytes32 messageIntegrityCode;
        RequestBody requestBody;
    }

    /**
     * @notice Toplevel response
     * @param attestationType Extracted from the request.
     * @param sourceId Extracted from the request.
     * @param votingRound The ID of the State Connector round in which the request was considered.
     * @param lowestUsedTimestamp The lowest timestamp used to generate the response.
     * @param requestBody Extracted from the request.
     * @param responseBody Data defining the response. The verification rules for the construction of the response body and the type are defined per specific `attestationType`.
     */
    struct Response {
        bytes32 attestationType;
        bytes32 sourceId;
        uint64 votingRound;
        uint64 lowestUsedTimestamp;
        RequestBody requestBody;
        ResponseBody responseBody;
    }

    /**
     * @notice Toplevel proof
     * @param merkleProof Merkle proof corresponding to the attestation response.
     * @param data Attestation response.
     */
    struct Proof {
        bytes32[] merkleProof;
        Response data;
    }

    /**
     * @notice Request body for FheAgent attestation type
     * @param data_id Data id to fetch the data from
     * @param data_hash Hash of the data
     * @param model Model to run on the data
     * @param abi_signature ABI signature of the data
     **/
    struct RequestBody {
        string data_id;
        string data_hash;
        string model;
        string abi_signature;
    }

    /**
     * @notice Response body for FheAgent attestation type.
     * @param abi_encoded_data ABI encoded data
     **/
    struct ResponseBody {
        bytes abi_encoded_data;
    }
}
