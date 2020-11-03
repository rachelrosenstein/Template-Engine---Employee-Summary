const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const util = require("util");
const Employee = require("./lib/Employee");
const writeFileAsync = util.promisify(fs.writeFile);
// var Employee = require("./lib/Employee");
// var Engineer = require("./lib/Engineer");
// var Intern = require("./lib/Intern");
// var Manager = require("./lib/Manager");

const collectInputs = async (inputs = []) => {
    const prompts = [
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is the employee's id number?",
            name: "idNumber"
        },
        {
            type: "list",
            message: "What is the employee's job title?",
            name: "jobTitle",
            choices: [
                "Employee",
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter the manager's office number:",
            when: (answers) => answers.jobTitle === 'Manager'
        },
        {
            type: "input",
            message: "What school does/did the intern attend?",
            name: "school",
            when: (answers) => answers.jobTitle === 'Intern'
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "githubUsername",
            when: (answers) => answers.jobTitle === 'Engineer'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another employee?',
            default: true
        }
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
};

const writeHTML = async () => {
    const inputs = await collectInputs();
    let new_emp_array = [];
    for (i = 0; i < inputs.length; i++) {
        console.log(inputs[i]);
        if (inputs[i].jobTitle === "Employee") {
            console.log(inputs[i])
            new_emp_array.push(new Employee(inputs[i].employeeName, inputs[i].idNumber, "test@test.com"))
        }
    }

    let out = render(new_emp_array)

    fs.writeFile("team.html", out, "utf-8", () => {
        console.log("File written")
    })
};

writeHTML();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
