const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

//Initiate the app
function initApp() {
    startHtml();
    addMember();
}

// Add a new team member
function addMember() {
    inquirer.prompt([{
        message: "Please enter the team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }])
    // Defining role parameter's based on role chosen above, ability to add multiple team members
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
    {
        type: "list",
        message: "Would you like to add more team members?"
        choices: [
            "yes",
            "no"
        ],
        name: "moreMembers"
    }])
    // If more members are added
    .then(function({roleInfo, moreMembers}) {
        let newMember;
        if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
        } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
        } else {
            newMember = new Manager(name, id, email, roleInfo);
        }
        employees.push(newMember);
        addHtml(newMember);
        .then(function() {
            if (moreMembers === "yes") {
                addMember();
            } else {
                finishHtml();
            }
        });
    });
    });
}