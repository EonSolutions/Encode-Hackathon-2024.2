import "@nomicfoundation/hardhat-verify";
import { artifacts, ethers, run } from 'hardhat';
// @ts-ignore
import { FlareDataStorage } from '../typechain-types';
const DataStorage: FlareDataStorage = artifacts.require('FlareDataStorage');


async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const args: any[] = []
    const simpleFtsoExample = await DataStorage.new(...args);
    console.log("DataStorage deployed to:", simpleFtsoExample.address);
    try {

        const result = await run("verify:verify", {
            address: simpleFtsoExample.address,
            constructorArguments: args,
        })

        console.log(result)
    } catch (e: any) {
        console.log(e.message)
    }
    console.log("Deployed contract at:", simpleFtsoExample.address)

}
main().then(() => process.exit(0))