const Engineer = require("../lib/Engineer.js");

describe("Engineer", () => {
   describe("getGithub", () => {
        it("should return the give github paramter", () => {
            const eng = new Engineer("name", "id", "email@gmail.com", "github")

            const result = eng.getGitHub()

            expect(result).toEqual("github.com/github")
        })  
   }) 

   describe("getRole", () => {
        it("should return Engineer role Type", () => {
            const eng = new Engineer("name", "id", "email@gmail.com", "github")

            const result = eng.getRole()

            expect(result).toBeInstanceOf(Engineer)
        })
   })
})