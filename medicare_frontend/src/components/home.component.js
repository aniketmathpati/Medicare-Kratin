import React, { Component } from 'react';
import '../css/home.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Home extends Component {

    constructor(props) {
        super(props)
        let date = new Date();
        if (sessionStorage.getItem('token') === 'undefined' || sessionStorage.getItem('username') === 'undefined') {
            this.props.history.push('/')
        }
        this.state = {
            patientId: null,
            tests: [
            ],
            medicines:[

            ],
            patients:[

            ],
            noted_tests:[
                {
                    "name":null,
                    "result":null,
                    "comment":null,
                },
                {
                    "name":null,
                    "result":null,
                    "comment":null,
                },
                {
                    "name":null,
                    "result":null,
                    "comment":null,
                }
            ],
            noted_medicines:[
                {
                    "name":null,
                    "comment":null,
                },
                {
                    "name":null,
                    "comment":null,
                },
                {
                    "name":null,
                    "comment":null,
                }
            ],

            next_visit:null
        }
    
    const headers = { 'Authorization': 'Token ' + sessionStorage.getItem('token') }
    // alert(sessionStorage.getItem('token'))
    axios.get(window.API_URL+'/data/tests/', { headers: headers })
        .then(response => {
            if (response.status == 200) {
                this.setState({ tests: response.data.Data })
            }
            else{
                alert("error in fetching tests")
            }
        })
        .catch(error => {
            alert("exception in fetching tests")
        });


    axios.get(window.API_URL+'/data/medicines/', { headers: headers })
        .then(response => {
            if (response.status == 200) {
                    this.setState({ medicines: response.data.Data })
            }
            else {
                alert("error in fetching tests")

            }
        })
        .catch(error => {
            alert("exception in fetching tests")

        });

    axios.get(window.API_URL+'/patient/', {
            headers: headers
          })
            .then(response => {
      
              if (response.status == 200) {
                  console.log(response)
                  this.setState({ patients: response.data.Data })
                }
            })
            .catch(error => {
            });




    }





    handleSubmit = (e) => {

    const headers = {
        'Authorization': 'Token ' + sessionStorage.getItem('token')
    }
    
    if (this.state.next_visit != "") {
        this.state.next_visit = this.formatDate(this.state.next_visit)

    }
    axios.post(window.API_URL+'/patient/save/',this.state,  {
        headers: headers,
    })
        .then(response => {
            this.setState({loaded:false})
            
            if (response.status == 200) {
                alert("Report generated successfully")
            }
            else {
                alert("Some error occurred")

            }
        })
        .catch(error => {
             alert("Some error occurred")
        });
}




handleChange = (e) => {
        var data = e.target.value;
        this.setState({
            [e.target.name]: data
        })
}

formatDate = (date) => {
    try {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    catch (error) {
        this.errorOccured(400, "error occurred", error.toString())

    }
}

onChange = (next_visit) => {
    console.log(next_visit)
        this.setState({ next_visit: next_visit },console.log(this.state));
}









update_item = (e) => {
    try {
        console.log(e.currentTarget)
        let value = e.currentTarget.value
        let key = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
        let name = e.currentTarget.getAttribute("name")
        let noted_tests=this.state.noted_tests;
        let noted_medicines=this.state.noted_medicines;

        if(name==='test_name')
        {
            noted_tests[parseInt(key)].name=value
        }
        if(name==='test_result')
        {
            noted_tests[parseInt(key)].result=value

        }
        if(name==='test_comment')
        {
            noted_tests[parseInt(key)].comment=value

        }
        if(name=='medicine_name')
        {
            noted_medicines[parseInt(key)].name=value

        }
        if(name=='medicine_comment')
        {
            noted_medicines[parseInt(key)].comment=value

        }
        this.setState({"noted_tests":noted_tests},()=>{console.log(this.state)})
    }
    catch (error) {
        this.errorOccured(400, "error occurred", error.toString())

    }

}

    render() {
        
console.log(this.state)
        const tests = this.state.tests.length ? (this.state.tests.map(option => {
            return (<option key={option.id}>{option.name}</option>)
        })) : ("");


        const medicines = this.state.medicines.length ? (this.state.medicines.map(option => {
            return (<option key={option.id}>{option.name}</option>)
        })) : ("");

        const patients = this.state.patients.length ? (this.state.patients.map(option => {
            return (<option key={option.id}>{option.fname+" "+option.lname}</option>)
        })) : ("");

        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div style={{ maxWidth: "800px" }} className="card float-left">
                        <div className="card-header">
                            <h3>{window.RECIEPT_MESSAGE}</h3>
                        </div>
                        <div className="col-sm-12 col-sm-offset-4 card-body">
                            <form  id="login_form">
                                <label style={{ color: "white" }} className="float-left" for="patientId"><b>Enter PatientId</b></label>

                                <div className="input-group form-group">
                                    <select onChange={this.handleChange} type="number" value={this.state.patientId} className="form-control input-sm" id="patientId" name="patientId" required ><option>None</option>{patients}</select>
                                </div>

                                <div id="items-cart">
                                    <div data-key="0" className="row">
                                        <div className="column">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_tests[0].name} className="form-control item" name="test_name" placeholder="test name" required><option>None</option>{tests}</select></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[0].result} className="form-control item "  name="test_result" placeholder="test result" required /></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[0].comment} className="form-control item "  name="test_comment" placeholder="test comment" required /></div>
                                        </div> 
                                    </div>    

                                    <div data-key="1" className="row">
                                        <div className="column">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_tests[1].name} className="form-control item" name="test_name" placeholder="test name" required><option>None</option>{tests}</select></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[1].result} className="form-control item "  name="test_result" placeholder="test result" required /></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[1].comment} className="form-control item "  name="test_comment" placeholder="test comment" required /></div>
                                        </div> 
                                    </div>

                                    <div data-key="2" className="row">
                                        <div className="column">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_tests[2].name} className="form-control item" name="test_name" placeholder="test name" required><option>None</option>{tests}</select></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[2].result} className="form-control item "  name="test_result" placeholder="test result" required /></div>
                                        </div>
                                        <div className="column">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_tests[2].comment} className="form-control item "  name="test_comment" placeholder="test comment" required /></div>
                                        </div> 
                                    </div>
                                      

                                        

                                

                                <div data-key="0" className="row">
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_medicines[0].name} className="form-control item" name="medicine_name" placeholder="medicine name" required><option>None</option>{medicines}</select></div>
                                        </div>
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_medicines[0].comment} className="form-control item "  name="medicine_comment" placeholder="test comment" required /></div>
                                        </div>          
                                    </div>
                                 <div data-key="1" className="row">
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_medicines[1].name} className="form-control item" name="medicine_name" placeholder="medicine name" required><option>None</option>{medicines}</select></div>
                                        </div>
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_medicines[1].comment} className="form-control item "  name="medicine_comment" placeholder="medicine_comment" required /></div>
                                        </div>          
                                    </div>
                                <div data-key="2" className="row">
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><select onChange={this.update_item} type="text" value={this.state.noted_medicines[2].name} className="form-control item" name="medicine_name" placeholder="medicine name" required><option>None</option>{medicines}</select></div>
                                        </div>
                                        <div className="column2">
                                            <div style={{ width: "100%" }}><input onChange={this.update_item} type="text" value={this.state.noted_medicines[2].comment} className="form-control item "  name="medicine_comment" placeholder="medicine_comment" required /></div>
                                        </div>          
                                </div>
                                </div>

                                <label style={{ color: "white" }} className="float-left" for="dob"><b>Date of Next Visit</b></label>
                                <div className="input-group form-group">
                                    <input type="date" value={this.state.next_visit} name="next_visit" onChange={this.handleChange}></input>
                                </div>

                                <div className="form-group">
                                    <input type="button" value="Submit" onClick={this.handleSubmit} className="btn-lg login_btn" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home