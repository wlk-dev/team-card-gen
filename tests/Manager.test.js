const Manager = require("../lib/Manager.js");

describe("Manager", () => {
    describe("property.officeNumber", () => {
        it("should return the give office number", () => {
            const man = new Manager("name", "id", "email@gmail.com", 1)
    
            expect(man.officeNumber).toEqual(1)
        })
    })

    describe("getRole", () => {
        it("should return the Manager role Type", () => {
            const man = new Manager()

            const result = man.getRole()

            expect(result).toBeInstanceOf(Manager)
        })
    })
})