const { ethers } = require("hardhat");

async function main() {
  await hre.run("compile");

  const [owner] = await ethers.getSigners();
  const ERC721 = await ethers.getContractFactory("ERC721");
  const erc721 = await ERC721.deploy("Test ERC721", "TEST721");
  await erc721.deployed();

  console.log("Registry deployed to:", erc721.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
