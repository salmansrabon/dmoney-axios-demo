const { expect } = require("chai");

before(()=>{
    it("Print hello",()=>{
        console.log("Hello JS")
    })
})
describe("calculation",()=>{
    it("do sum",()=>{
        let sum=7+5;
        expect(sum).equal(12)
    })
    it("do sub",()=>{
        let sub=7-5;
        expect(sub).equal(2)
    })
})
