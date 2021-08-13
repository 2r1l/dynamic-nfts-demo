const { expect } = require("chai");

describe("ERC721", function () {
  it("Should return the name", async function () {
    const ERC721 = await ethers.getContractFactory("ERC721");
    const erc721 = await ERC721.deploy("Name", "Symbol");
    await erc721.deployed();

    expect(await erc721.name()).to.equal("Name");
  });
});
