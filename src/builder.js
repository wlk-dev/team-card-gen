const Manager = require("../lib/Manager")
const Engineer = require("../lib/Engineer")
const Intern = require("../lib/Intern")


const inquirer = require("inquirer");
const fs = require("fs");


const questions = {
    add : {message : "Add a team member : ", type : "list", name : "type", choices : ["Manager", "Engineer", "Intern", "None"]},
    general : [
        {message : "Enter your name : ", type : "input", name : "user_name"},
        {message : "Enter your email : ", type : "input", name : "email"},
    ],

    getId : {message : "Enter your ID : ", type : "input", name : "uid"},

    manager : {message : "Enter your office number : ", type : "input", name : "office_number"},
    engineer : {message : "Enter your GitHub name : ", type : "input", name : "github"},
    intern : {message : "Enter your school : ", type : "input", name : "school"}
}

function genCard(obj) {
    let template = `
    <div class="card">
        <div class="container">
            <h2><b>${obj.getName()}</b></h2>
            <h3>${obj.role}</h3>
            <h4>ID : ${obj.getId()}</h4>
    `
    
    if (obj.email) {
        template += `<p>Email : <a href="mailto:${obj.getEmail()}">${obj.getEmail()}</a></p>`
    }

    if (obj.github) {
        template += `<p>GitHub : <a rel="noopener" target="_blank" href="https://${obj.getGitHub()}">${obj.getGitHub()}</a></p>`        
    }

    if (obj.school) {
        template += `<p>School : ${obj.getSchool()}</p>`
    }

    template += "</div></div>"

    return template;
    
}


function genHTML (cards) {
    let html = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css" />
        <title>Document</title>
    </head>
    <body>
        <header>
            <h1>My Team</h1>
        </header>

        <main>
            <div class="card-holder">
                ${[...cards].join("\n")}
            </div>
        </main>
        
    </body>
    </html>
`
    return html
}


function constructObjs ( objData ) {
    let objs = [];
    let c_obj;
    for ( const key in objData ) {
        let data = objData[key];
        switch (data.type) {
            case "m": 
                c_obj = new Manager(data.user_name, data.id, data.email, data.office_number)
                break
            case "e":
                c_obj = new Engineer(data.user_name, data.id, data.email, data.github)
                break;
            case "i":
                c_obj = new Intern(data.user_name, data.id, data.email, data.school)
                break;
            default:
                console.warn("Invalid type detected :", data.type)
            
        }
        objs.push(c_obj);
    }

    return objs
    
}


async function init () {
    let [cond, ourData, id] = [true, {}, 1]; 
    while (cond) {
        const promise = await inquirer.prompt(questions.add)
        if (promise.type !== "None") {
            const empId = await inquirer.prompt(questions.getId);
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
                id : empId.uid,
                ...gen,
                ...man,
                ...eng,
                ...int,
            }
            id++;
            
        } else {
            break;
        }
    }

    let objs = constructObjs(ourData)
    let cards = objs.map((data) => genCard(data))

    fs.writeFileSync("index.html", genHTML(cards))

}

init()