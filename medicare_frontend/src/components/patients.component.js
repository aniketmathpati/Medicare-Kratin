import React, { Component } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';

class Patients extends Component {
  constructor(props) {
    super(props);
    if (sessionStorage.getItem('token') === 'undefined' || sessionStorage.getItem('username') === 'undefined') {
      this.props.history.push('/')
    }
    this.state = {
      datatable: {
        columns: [
          {
            label: 'FirstName',
            field: 'fname',
            width: 150,
          },
          {
            label: 'LastName',
            field: 'lname',
            width: 270,
          },
          {
            label: 'Age',
            field: 'age',
            width: 200,
          },
          {
            label: 'Mobile',
            field: 'mobile',
            width: 200,
          },
          {
            label: 'Email',
            field: 'email',
            width: 200,
          },
          {
            label: 'Address',
            field: 'address',
            width: 150,
          },
          {
            label: 'Report',
            field: 'reports',
            width: 150,
          }
        ],
        rows: [],
      }
    }

  }

  handleClick(params)
  {
      window.location.href="http://127.0.0.1:8000"+params;

  }


  update_rows = (response) => {
    try {
      let columns = this.state.datatable.columns
      let rows = this.state.datatable.rows
      response.Data.forEach(element => {
          element.clickEvent=() => this.handleClick(element.reports)
          console.log(element)
          rows.push(element) })
      let datatable = { columns: columns, rows: rows }
      this.setState({ datatable: datatable })
    }
    catch (error) {
    }
  }
  
  componentDidMount = () => {
    const headers = {
      'Authorization': 'Token ' + sessionStorage.getItem('token')
    }
    axios.get(window.API_URL+'/patient/', {
      headers: headers
    })
      .then(response => {

        if (response.status == 200) {
            console.log(response)
            this.update_rows(response.data);
        }
      })
      .catch(error => {
      });


  }


  render() {
    return (
      <div>
        <div style={{ backgroundColor: "black", fontSize: "15px", color: "green" }}>
          <MDBDataTableV5 className="table-responsive" style={{ textAlign: "left", backgroundColor: "black", fontSize: "20px", color: "white" }} hover entriesOptions={[10, 20, 25]} entries={10} pagesAmount={4} data={this.state.datatable} searchTop searchBottom={false} />
        </div>
      </div>

    )

  }
}
export default Patients;