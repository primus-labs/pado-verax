const hre = require("hardhat");

async function main() {
    console.log("version is:", hre.ethers.version)

    const [deployer] = await hre.ethers.getSigners();
    const commonSchemaStr = "string ProofType,string Source,string Content,string Condition,bytes32 SourceUserIdHash,bool Result,uint64 Timestamp,bytes32 UserIdHash";
    const assetProofSchemaStr = "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,address receipt,uint64 getDataTime,uint64 baseValue,bool balanceGreaterThanBaseValue";
    const tokenHoldingSchemaStr = "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,address recipient,uint64 getDataTime,string asset,string baseAmount,bool balanceGreaterThanBaseAmount";
    const identityProofSchemaStr = "string source,string credentialType,bytes32 authUseridHash,address recipient,uint64 timestamp,bool result";
    const assetProofSchemaPolygonStr = "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 getDataTime,uint64 baseValue,bool balanceGreaterThanBaseValue";
    const tokenHoldingSchemaPolygonStr = "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 getDataTime,string asset,string baseAmount,bool balanceGreaterThanBaseAmount";
    const identityProofSchemaPolygonStr = "string source,string credentialType,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 timestamp,bool result";
    const eventSchema = "string source,bool result"

    console.log(deployer)
    const schemaMap = {
        commonSchema: commonSchemaStr,
        /*assetProof: assetProofSchemaStr,
        assetProofPolygon: assetProofSchemaPolygonStr,
        tokenHolding: tokenHoldingSchemaStr,
        tokenHoldingPolygon: tokenHoldingSchemaPolygonStr,
        identityProof: identityProofSchemaStr,
        identityProofPolygon: identityProofSchemaPolygonStr,*/
    };

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const portalRegistyAddress = "0x1627De35D35F8c3B75b25BDb2541293F640ECA9d";
    const portalRegisty = await hre.ethers.getContractAt("PortalRegistry", portalRegistyAddress);
    const resIsIssuer = await portalRegisty.isIssuer(deployer.address);
    console.log("resSetIssuer=", resIsIssuer.address);
    if(!resIsIssuer){
        const tx = await portalRegisty.setIssuer(deployer.address);
        const recipient = await tx.wait()
        console.log(recipient)
    }

    const routerAddress = "0x2884E43B48c2Cc623A19c0c3d260DD8f398fd5F3";
    const router = await hre.ethers.getContractAt("Router", routerAddress);
    const resRouter = await router.getPortalRegistry();
    console.log("resRouter=", resRouter.address);

    const schemaRegistryAddress = "0x87E53C9eD9C58B0039DA17F35A31CF069447bDc0";
    const schemaRegistry = await hre.ethers.getContractAt("SchemaRegistry", schemaRegistryAddress);
    //let resRegister = await schemaRegistry.createSchema("PADO Assets Proof", "Assets Proof of PADO", "https://arbitrum.easscan.org/schema/view/0xcc1f2c6308ffbb7ac5b915641cbc74b6d6404bcdedaf304f9637e5ef7ecc593d", "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,address recipient,uint64 getDataTime,uint64 baseValue,bool balanceGreaterThanBaseValue");
    //let resRegister = await schemaRegistry.createSchema("PADO Token Holdings", "Token Holdings of PADO", "https://arbitrum.easscan.org/schema/view/0xe4c12be3c85cada725c600c1f2cde81d7cc15f957537e5756742acc3f5859084", "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,address recipient,uint64 getDataTime,string asset,string baseAmount,bool balanceGreaterThanBaseAmount");
    //let resRegister = await schemaRegistry.createSchema("PADO Identity", "Identity of PADO", "https://arbitrum.easscan.org/schema/view/0x871cb30613666b4349fe45b1e4af222e7da3c3f3b6487ef99b813a897470cb28", "string source,string credentialType,bytes32 authUseridHash,address recipient,uint64 timestamp,bool result");
    //let resRegister = await schemaRegistry.createSchema("PADO Web", "Web of PADO", "https://arbitrum.easscan.org/schema/view/0x5f868b117fd34565f3626396ba91ef0c9a607a0e406972655c5137c6d4291af9", "string ProofType,string Source,string Content,string Condition,bytes32 SourceUserIdHash,bool Result,uint64 Timestamp,bytes32 UserIdHash");
    //let resRegister = await schemaRegistry.createSchema("PADO Assets Proof Polygon ID", "Assets Proof Polygon ID of PADO", "https://arbitrum.easscan.org/schema/view/0x518b6ddf38db93ae2bab1164038c6fa0606ce4b5080406749ea65f9415bb0503", "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 getDataTime,uint64 baseValue,bool balanceGreaterThanBaseValue");
    //let resRegister = await schemaRegistry.createSchema("PADO Token Holdings Polygon ID", "Token Holdings Polygon ID of PADO", "https://arbitrum.easscan.org/schema/view/0x112d140be471e0fac2dc2ee596c55d5f0c679b8fa9a71c15ec5516b87d6d1278", "string source,bytes32 sourceUseridHash,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 getDataTime,string asset,string baseAmount,bool balanceGreaterThanBaseAmount");
    // let resRegister = await schemaRegistry.createSchema("PADO Identity Polygon ID", "Identity Polygon ID of PADO", "https://arbitrum.easscan.org/schema/view/0xe08e249cc244e018cc56cb05938665fd16e373e77acc23d625e84cd4fe07cc48", "string source,string credentialType,bytes32 authUseridHash,string issuerDID,string recipientDID,address recipient,uint64 timestamp,bool result");
    // let resRegister = await schemaRegistry.createSchema("EVENT SCHEMA", "Schema For Event", "https://arbitrum.easscan.org/schema/view/0xe08e249cc244e018cc56cb05938665fd16e373e77acc23d625e84cd4fe07cc48", eventSchema);
    let resRegister = await schemaRegistry.createSchema("ChatGPT SCHEMA", "Schema For ChatGPT", "https://arbitrum.easscan.org/schema/view/0xe08e249cc244e018cc56cb05938665fd16e373e77acc23d625e84cd4fe07cc48", commonSchemaStr);
    const recipient = await resRegister.wait()
    console.log("recipient=", recipient);
    /*for (const key in schemaMap) {

        try {
            let shcemaId = await contract.getIdFromSchemaString(schemaMap[key]);
            let schemaIdIsExist = await contract.isRegistered(shcemaId)
            console.log(`${key} id is :${shcemaId}, exist: ${schemaIdIsExist}`)
            if (!schemaIdIsExist) {
                console.log("start to createSchema! key=", key, schemaMap[key])
                //if not exists, start createSchema
                let createSchemaTransactionResponse = await contract.createSchema("commonSchema", "PADO_SCHEMA", "https://padolabs.org", schemaMap[key]);
                console.log("createSchemaTransactionResponse=", createSchemaTransactionResponse);
            }

        } catch (er) {
            console.log("er=", er);
            try {
             await contract.createSchema.staticCall("commonSchema", "PADO_SCHEMA", "https://padolabs.org", schemaMap[key]);
            } catch (ex) {
                console.log("ex=", ex);
            }
        }
    }*/

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
