const Manager = require("../lib/Manager")
const Engineer = require("../lib/Engineer")
const Intern = require("../lib/Intern")


const inquirer = require("inquirer");
const { ObjectUnsubscribedError } = require("rxjs");


const questions = {
    add : {message : "Add a team member : ", type : "list", name : "type", choices : ["Manager", "Engineer", "Intern", "None"]},
    general : [
        {message : "Enter your name : ", type : "input", name : "user_name"},
        {message : "Enter your email : ", type : "input", name : "email"},
    ],

    manager : {message : "Enter your office number : ", type : "input", name : "office_number"},
    engineer : {message : "Enter your GitHub name : ", type : "input", name : "github"},
    intern : {message : "Enter your school : ", type : "input", name : "school"}
}

function constructObjs ( objData ) {
    let objs = [];
    let c_obj;
    for ( const key in objData ) {
        let data = objData[key];
        switch (data.type) {
            case "m": 
                delete data.type
                c_obj = new Manager(...Object.values(data))
                break
            case "e":
                delete data.type
                c_obj = new Engineer(...Object.values(data))
                break;
            case "i":
                delete data.type;
                c_obj = new Intern(...Object.values(data))
                break;
            default:
                console.warn("Invalid type detected :", data.type)
            
        }
        objs.push(c_obj);
    }
    
}


async function init () {
    let [cond, ourData, id] = [true, {}, 1]; 
    while (cond) {
        const promise = await inquirer.prompt(questions.add)
        if (promise.type !== "None") {
            let gen = await inquirer.prompt([...questions.general])
            let man, eng, int, t;
            switch ( promise.type ) {
                case "Manager":
                    man = await inquirer.prompt(questions.manager)
                    t = "m"
                    break;
                case "Engineer":
                    eng = await inquirer.prompt(questions.engineer)
                    t = "e"
                    break;
                case "Intern":
                    int = await inquirer.prompt(questions.intern)
                    t = "i"
                    break;
                default:
                    console.warn("Could not match promise.type with an available case.")
                    cond = false
            }

            ourData[id] = {
                type : t,
                id : id,
                ...gen,
                ...man,
                ...eng,
                ...int
            }
            id++;
            
        } else {
            break;
        }
    }

}

init()