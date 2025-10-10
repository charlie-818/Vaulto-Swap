import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying Vaulto Swap contracts...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy PoolFactory
  console.log("📦 Deploying PoolFactory...");
  const PoolFactory = await ethers.getContractFactory("PoolFactory");
  const poolFactory = await PoolFactory.deploy();
  await poolFactory.waitForDeployment();
  
  const factoryAddress = await poolFactory.getAddress();
  console.log("✅ PoolFactory deployed to:", factoryAddress);

  // Get network
  const network = await ethers.provider.getNetwork();
  console.log("\n📋 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());
  console.log("PoolFactory:", factoryAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  console.log("\n📝 Add to your .env.local:");
  console.log(`NEXT_PUBLIC_POOL_FACTORY_ADDRESS_${network.name.toUpperCase()}=${factoryAddress}`);

  console.log("\n⏳ Waiting for block confirmations...");
  await poolFactory.deploymentTransaction()?.wait(5);

  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

