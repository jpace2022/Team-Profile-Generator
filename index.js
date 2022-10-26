const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const { start } = require("repl");

const empployee = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.createPromptModule([{
        message: "Enter your team members name.",
        name: "name"
    },
    {
        type: "list",
        message: "Please select member's role on team.",
        choices: [
            "Engineer",
            "Manager",
            "Intern"
        ],
        name: "role"
    },
    {
        message: "Please enter team members ID.",
        name: "ID"
    },
    {
        message: "Please enter you team members email address.",
        name: "email"
    }])

    .then(function({name, role, id, email}){
        let roleinfo = "";
        if (role === "Engineer") {
            roleinfo = "GitHub username?";
            } else if (role === "Intern") {
                roleinfo = "School name?";
            } else {
                roleinfo = "Office phone number?"
            }
            inquirer.prompt([{
                message: `Please enter team member's ${roleinfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "Yes",
                    "No"
                ],
                name: "moreMembers"
            }])
            .then(function({roleinfo, moreMembers}){
                let newMember;
                if (role === "Engineer") {
                    newMember = new Engineer(name, id, email, roleinfo);
                } else if (role === "Intern") {
                    newMember = new Intern(name, id, email, roleinfo);
                } else if (role === "Manager") {
                    newMember = new Manager(name, id, email, roleinfo)
                }
                employees.push(newMember);
                addHtml(newMember)
                .then(function() {
                    if (moreMembers === "Yes") {
                        addMember();
                    } else {
                        finishHtml();
                    }
                });
            });
    });

}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
            fs.writeFile("./dist/team.html", html, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log("Start");
}


initApp