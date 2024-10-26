// SPDX-License-Identifier: MITs
pragma solidity ^0.8.0;

contract FlareDataStorage {

    // Struct to store the tri-tuple
    struct DataEntry {
        bytes32 dataHash;   // Hash of the data (immutable)
        string dataResult;  // Result of the data (updatable)
        uint256 dataId;     // Unique ID of the data (immutable)
    }

    // Mapping from dataId to DataEntry
    mapping(uint256 => DataEntry) private dataEntries;

    // Event emitted when a new data entry is created
    event DataEntryCreated(uint256 indexed dataId, bytes32 dataHash, string dataResult);
    
    // Event emitted when the dataResult is updated
    event DataResultUpdated(uint256 indexed dataId, string newResult);

    // Modifier to check that the dataId exists
    modifier entryExists(uint256 dataId) {
        require(dataEntries[dataId].dataId != 0, "Data entry does not exist");
        _;
    }

    // Function to create a new data entry
    function createDataEntry(uint256 dataId, bytes32 dataHash) external {
        // Ensure the dataId is unique
        require(dataEntries[dataId].dataId == 0, "Data entry with this ID already exists");

        // Create an empty dataResult
        string memory dataResult = "";

        // Store the new data entry
        dataEntries[dataId] = DataEntry({
            dataHash: dataHash,
            dataResult: dataResult,
            dataId: dataId
        });

        emit DataEntryCreated(dataId, dataHash, dataResult);
    }

    // Function to update the dataResult of an existing data entry
    function updateDataResult(uint256 dataId, string memory newResult) external entryExists(dataId) {
        // Update the dataResult in the existing entry
        dataEntries[dataId].dataResult = newResult;
        
        emit DataResultUpdated(dataId, newResult);
    }

    // Function to get the details of a data entry
    function getDataEntry(uint256 dataId) external view entryExists(dataId) returns (bytes32, string memory, uint256) {
        DataEntry storage entry = dataEntries[dataId];
        return (entry.dataHash, entry.dataResult, entry.dataId);
    }
}
