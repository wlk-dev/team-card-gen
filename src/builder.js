const inquirer = require("inquirer");


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

    console.log(ourData);

}

init();