//import db.js
const db = require('../services/db')

//logic for getting all employees from database
const getAllEmployees = () => {
    return db.employee.find().then((result) => {
        if (result) {
            return {
                statusCode: 200,
                employees: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Employee not found'
            }
        }
    })
}

//logic for adding an employee to the database
const addEmployee = (id, name, age, designation, salary) => {
    return db.employee.findOne({ id })
        .then((result) => {
            if(result) {
                return {
                    statusCode: 404,
                    message: "Employee already exist"
                }
            }
        else{
            //save all the data into db
            const newEmployee = new db.employee({ id, name, age, designation, salary })
            newEmployee.save()
            return{
                    statusCode: 200,
                    message: "Employee added successfully"
                }
            }
        })
}

const dltEmployee = (id)=>{
    return db.employee.deleteOne({id})
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                message: "Employee deleted successfully"
            }
        }
        else{
            return{
                statusCode:401,
                message: "Employee does not exist"
            }
        }
    })
}

const viewEmployee = (id)=>{
    return db.employee.findOne({id})
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                employee:result
            }
        }
        else{
            return{
                statusCode:402,
                message: "Employee details not found!"
            }
        }
    })
}

//logic for update an employee
const updateEmployee=(id, name, age, designation, salary)=>{
    return db.employee.findOne({id}).then((result) => {
        if (result) {
            //assign updated details from frontend to mongodb object
            result.id=id;
            result.name=name;
            result.age=age;
            result.designation=designation;
            result.salary=salary;
            //save the emplyee details to mongodb
            result.save();
            return {
                statusCode: 200,
                message: "Employee details updated successfully"
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Employee not found'
            }
        }
    })
}
module.exports = {
    getAllEmployees,addEmployee,dltEmployee,viewEmployee, updateEmployee
}