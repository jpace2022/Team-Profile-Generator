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
    }]);

}

initApp