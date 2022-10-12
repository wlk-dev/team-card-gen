const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
        this.role = "Engineer"
    }

    getGitHub() {
        return `github.com/${this.github}`
    }

    getRole() {
        return this
    }
}

module.exports = Engineer;