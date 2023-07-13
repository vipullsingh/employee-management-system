const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Route: POST /api/employees
router.post('/', employeeController.createEmployee);

// Route: GET /api/employees
router.get('/', employeeController.getAllEmployees);

// Route: GET /api/employees/:id
router.get('/:id', employeeController.getEmployeeById);

// Route: PUT /api/employees/:id
router.put('/:id', employeeController.updateEmployee);

// Route: DELETE /api/employees/:id
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
