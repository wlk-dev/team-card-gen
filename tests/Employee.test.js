// const { describe } = require("node:test");
const Employee = require("../lib/Employee.js");

describe("Employee", () => {
    describe("getName", () => {
        it("should return the given name parameter",() => {
            const emp = new Employee("name", "id", "email@gmail.com") 
     
            const result = emp.getName();
            
            expect(result).toEqual("name")
        })

    })

    describe("getId", () => {
        it("should return the given Id paramter", () => {
            const emp = new Employee("name", "id", "email@gmail.com") 
    
            const result = emp.getId()
    
            expect(result).toEqual("id")
        })

    })

    describe("getEmail", () => {
        it("should return the given Email paramter", () => {
            
            const emp = new Employee("name", "id", "email@gmail.com") 
    
            const result = emp.getEmail()
    
            expect(result).toEqual("email@gmail.com") 
        })
    })

    describe("getRole", () => {
        it("should return the Employee role type", () => {
            const emp = new Employee("name", "id", "email@gmail.com") 
    
            const result = emp.getRole() 
        
            expect(result).toBeInstanceOf(Employee);
        })
        
    })
})