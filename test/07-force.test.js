const { assert } = require("chai")
const { deployments, ethers, waffle } = require("hardhat")

describe("07-Force", async function () {
    let deployer, attacker, force, forceAttack
    beforeEach(async function () {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        attacker = accounts[1]
        await deployments.fixture(["07"])
        force = await ethers.getContract("Force")
        forceAttack = await ethers.getContract("ForceAttack")
    })
    it("should send ether to the contract", async function () {
        const amountToSend = ethers.utils.parseEther("1")
        await forceAttack.attack({ value: amountToSend })

        const forceBalance = await ethers.provider.getBalance(force.address)
        assert(forceBalance.gt(0))
    })
})
