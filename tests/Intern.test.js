const Intern = require("../lib/Intern.js");

describe("Intern", () => {
    describe("getSchool", () => {
        it("should return the given paramter for school", () => {
            const int = new Intern("name", "id", "email@gmail.com", "school")

            const result = int.getSchool();

            expect(result).toEqual("school")
        })
    })

    describe("getRole", () => {
        it("should return Intern as role Type", () => {
            const int = new Intern("name", "id", "email.com", "school");
            
            const result = int.getRole()

            expect(result).toBeInstanceOf(Intern);
        })
    })
})