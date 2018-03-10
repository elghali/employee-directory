import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import Select from 'react-select';

const departments = {
  'IT': [
    {value: 'Network Administrator', label: 'Network Administrator'},
    {value: 'IT Administrator', label: 'IT Administrator'}
  ],
  'Administration': [
    {value: 'Admin Manager', label: 'Admin Manager'},
    {value: 'HR', label: 'HR'},
    {value: 'Administrative Assistant', label: 'Administrative Assistant'}
  ],
  'Finance': [
    {value: 'Accountant', label: 'Accountant'},
    {value: 'Operations Coordinator', label: 'Operations Coordinator'},
  ],
  'QA': [
    {value: 'Quality Assurance', label: 'Quality Assurance'},
    {value: 'Technical Writer', label: 'Technical Writer'}
  ],
  'Public Health': [
    {value: 'Dietitian', label: 'Dietitian'},
    {value: 'Quality Control', label: 'Quality Control'}
  ]
}
class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeDepartment: '',
      employeePosition: '',
      departmentsOptions: [],
      positionsOptions: []
    }
  }

  saveDepartment = (value) => {
    if(value) {
      //filter positions in accordance to department chosen
      const positionsOptions = departments[value.label];
      this.setState({
        employeeDepartment: value,
        positionsOptions,
      })
    }else{
      this.setState({
        employeeDepartment: ''
      })
    }
  }

  savePosition = (value) => {
    if(value) {
      this.setState({
        employeePosition: value,
      })
    }else{
      this.setState({
        employeePosition: ''
      })
    }
  }

  handleAddEmployee = () => {
    //TODO: add alert message
    if(_.isEmpty(this.state.employeeDepartment)){
      return;
    }
    if(_.isEmpty(this.state.employeePosition)){
      return;
    }
    this.props.handleAddEmployee(this.state.employeeDepartment.value, this.state.employeePosition.value);
    this.setState({
      employeeDepartment: '',
      employeePosition: '',
    })
  }

  componentDidMount() {
    const departmentsOptions = [
      {value: 'IT', label: 'IT'},
      {value: 'Administration', label: 'Administration'},
      {value: 'Finance', label: 'Finance'},
      {value: 'QA', label: 'QA'},
      {value: 'Public Health', label: 'Public Health'}
    ]
    this.setState({
      departmentsOptions
    })
  }

  render () {
    return (
      <div>
        <span>Add an employee</span>
        <FormControl  
          type="text"
          placeholder= "First Name"
          value={this.props.employeeFirstName}
          onChange={(event => this.props.handleChange(event, "employeeFirstName"))}
          style={{margin:'5px'}}
          name="employeeFirstName"
        />
        <FormControl
          type="text"
          placeholder="Last Name"
          value={this.props.employeeLastName}
          onChange={event => this.props.handleChange(event, "employeeLastName")}
          style={{margin: '5px'}}
          name = "employeeLastName"
        />
        <Select 
          name="employee-department"
          value = {this.state.employeeDepartment}
          onChange={this.saveDepartment}
          options={this.state.departmentsOptions}
          placeholder = "Enter Department"
          style={{margin: '5px'}}
        />
        <Select 
          name="employee-position"
          value = {this.state.employeePosition}
          onChange={this.savePosition}
          options={this.state.positionsOptions}
          placeholder = "Enter Position"
          style={{margin: '5px'}}
          disabled={_.isEmpty(this.state.employeeDepartment)}
        />
        <Button 
          bsStyle="success"
          onClick={this.handleAddEmployee}
        >
          Add Employee
        </Button>
      </div>
    )
  }
}

export default AddEmployee;