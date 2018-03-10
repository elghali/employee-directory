import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import Select from 'react-select';

class SearchEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
      <Row>
        <span>Search for Employees</span>
          <Select 
            name="employee-search"
            value = {this.props.existingEmployee}
            onChange={this.props.handleExistingEmployeeChange}
            options={this.props.employeesOptions}
            placeholder = "Search for Employee"
            style={{margin: '5px'}}
          />
      </Row>
      <Row>
        {
          !_.isEmpty(this.props.currentEmployee) &&
          <div>
            <div>
              <strong>Name: </strong>
              <span>{this.props.currentEmployee.name}</span>
            </div>
            <div>
              <strong>Department: </strong>
              <span>{this.props.currentEmployee.department}</span>
            </div>
            <div>
              <strong>Position: </strong>
              <span>{this.props.currentEmployee.position}</span>
            </div>
          </div>
        }
      </Row>
      </div>
    )
  }
}

export default SearchEmployee;