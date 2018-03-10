import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import SearchEmployee from './components/SearchEmployee';
import AddEmployee from './components/AddEmployee';
import { employeesRef } from './fire';
import _ from 'lodash';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      existingEmployee: '',
      employeeFirstName: '',
      employeeLastName: '',
      currentEmployee: {},
      employeesOptions: []
    }
  }

  handleExistingEmployeeChange = (value) => {
    if(value) {
      this.setState({
        existingEmployee: value
      }, () => {this.fetchExistingEmployeeData()})
    }else{
      this.setState({
        existingEmployee: '',
        currentEmployee: ''
      })
    }
  }

  fetchExistingEmployeeData = () => {
    if(!_.isEmpty(this.state.existingEmployee)){
      const existingEmployeeKey = this.state.existingEmployee.key
      employeesRef.on('value', snap => {
        const { name, department, position } = snap.val()[existingEmployeeKey];
        this.setState({
          currentEmployee: {
            name: name,
            department: department,
            position: position
          }
        })
      })
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  handleAddEmployee = (employeeDepartment, employeePosition) => {
    let employeeObj = {
      department: '',
      name: '',
      position: '',
    }
    //TODO: add alert message
    if (this.state.employeeFirstName === ''){
      return;
    }
    if(this.state.employeeLastName === ''){
      return;
    }

    employeeObj.department = employeeDepartment;
    employeeObj.name = this.state.employeeFirstName + ' ' + this.state.employeeLastName;
    employeeObj.position = employeePosition;

    employeesRef.push(employeeObj);
    this.setState({
      employeeFirstName: '',
      employeeLastName: '',
    })
  }

  componentDidMount () {
    employeesRef.on('value', snap => {
      let employeesList = [];
      snap.forEach(employee => {
        const { name } = employee.val();
        employeesList.push({
          value: name,
          label: name,
          key: employee.key
        })
      })
      this.setState({
        employeesOptions: employeesList
      })
    })
  }

  render() {
    return (
      <Grid>
        <Row style={{marginTop: '10px'}}>
          <Col xs={12} sm={6}>
            <SearchEmployee
              existingEmployee = {this.state.existingEmployee}
              handleExistingEmployeeChange = {this.handleExistingEmployeeChange}
              employeesOptions = {this.state.employeesOptions}
              currentEmployee={this.state.currentEmployee}
            />
          </Col>
          <Col xs={12} sm={6}>
            <AddEmployee 
              employeeFirstName = {this.state.employeeFirstName}
              employeeLastName = {this.state.employeeLastName}
              handleChange = {this.handleChange}
              handleAddEmployee = {this.handleAddEmployee}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
