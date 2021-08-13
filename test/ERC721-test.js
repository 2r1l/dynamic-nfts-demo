const { expect } = require("chai");

describe("ERC721", function () {
  it("Should return the name", async function () {
    const ERC721 = await ethers.getContractFactory("ERC721");
    const erc721 = await ERC721.deploy("Name", "Symbol");
    await erc721.deployed();

    expect(await erc721.name()).to.equal("Name");
  });

  it("Should mint an ERC721", async function () {
    const ERC721 = await ethers.getContractFactory("ERC721");
    const erc721 = await ERC721.deploy("Name", "Symbol");
    await erc721.deployed();

    const mintTx = await erc721['mint(address,uint256)']("0xB69dA234bf2DaDbb816B073A9e13eeba8B3DB6ff", 1);
    await mintTx.wait();

    // Check tokenURI returns JSON data URI
    const uri = await erc721.tokenURI(1);
    expect(uri).to.equal("data:application/json;base64,eyJkZXNjcmlwdGlvbiI6IlRoaXMgd2FzIG1pbnRlZCBmb3IgdGVzdGluZyBvbmx5LiIsIm5hbWUiOiAiNzIxLVRlc3QiLCJleHRlcm5hbF9saW5rIjogIiIsImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjJhV1YzUW05NFBTSXdJREFnTWpBd0lESXdNQ0lnYzNSNWJHVTlJbUpoWTJ0bmNtOTFibVF0WTI5c2IzSTZJekF3TUNJLUNpQWdQSFJsZUhRZ2VEMGlNVEF3SWlCNVBTSTRNQ0lnZEdWNGRDMWhibU5vYjNJOUltMXBaR1JzWlNJZ1ptbHNiRDBpSTJabVppSS1WRzlyWlc0Z0l6RThMM1JsZUhRLUNpQWdQSFJsZUhRZ2VEMGlNVEF3SWlCNVBTSXhNakFpSUhSbGVIUXRZVzVqYUc5eVBTSnRhV1JrYkdVaUlHWnBiR3c5SWlObVptWWlQa0pzYjJOcklDTXpQQzkwWlhoMFBnbzhMM04yWno0In0");

    // Decode metadata URI base64 JSON
    const { image } = JSON.parse(Buffer.from(uri.replace('data:application/json;base64,', ''), 'base64').toString('binary'));
    expect(image).to.equal("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IzAwMCI-CiAgPHRleHQgeD0iMTAwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiI-VG9rZW4gIzE8L3RleHQ-CiAgPHRleHQgeD0iMTAwIiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPkJsb2NrICMzPC90ZXh0Pgo8L3N2Zz4");

    // Decode image SVG bse64 string
    const svg = Buffer.from(image.replace('data:image/svg+xml;base64,', ''), 'base64').toString('binary');
    expect(svg).to.equal('<svg viewBox="0 0 200 200" style="background-color:#000">\n  <text x="100" y="80" text-anchor="middle" fill="#fff">Token #1</text>\n  <text x="100" y="120" text-anchor="middle" fill="#fff">Block #3</text>\n</svg>');
  });
});
