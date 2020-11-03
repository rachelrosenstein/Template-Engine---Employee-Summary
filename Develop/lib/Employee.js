// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email, title) {
        this.name = name;
        this.id = id;
        this.title = title ? tile : "Employee";
        this.email = email
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email
    }
    getRole() {
        if (this.title === "Engineer") {
            return "Engineer"
        } else if (this.title === "Intern") {
            return "Intern"
        } else if (this.title === "Manager") {
            return "Manager"
        } else {
            return "Employee"
        }
    }

}
var employee1 = new Employee("Alex Bonner", 5, "Manager")
employee1.getEmail()
console.log(employee1.getRole())


module.exports = Employee