const Employee = require('../models/Employee');

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalEmployees = await Employee.countDocuments().exec();

    if (endIndex < totalEmployees) {
      results.next = {
        page: parseInt(page, 10) + 1,
        limit: parseInt(limit, 10)
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: parseInt(page, 10) - 1,
        limit: parseInt(limit, 10)
      };
    }

    results.results = await Employee.find().skip(startIndex).limit(limit).exec();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error getting employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
