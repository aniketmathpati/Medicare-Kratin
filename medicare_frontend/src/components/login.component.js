import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props)
		sessionStorage.clear()
		this.state = {
			username: null,
			password: null,
		}
    }
    handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
    }
    handleSubmit = (e) => {
		e.preventDefault();
		axios.post(window.API_URL+"/user/login_user/", { 'username': this.state.username, 'password': this.state.password })
			.then(response => {
				console.log(response)
				if (response.status == 200) {
						sessionStorage.setItem('username', this.state.username);
						sessionStorage.setItem('token', response.data.Data.token);
						this.props.history.push('/home');
				}
				else {
                    alert("error occurred")
				}
			})
			.catch(error => {
                alert("exception occurred")
			});

    }
    
    render()
    {
        return (
			<div className="container">
				<div className="d-flex justify-content-center h-100">
					<div className="card">
						<div className="card-header">
							<h3>LOGIN</h3>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} id="login_form">
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-user"></i></span>
									</div>
									<input onChange={this.handleChange} type="text" className="form-control" id="username" name="username" placeholder="username" required></input>

								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-key"></i></span>
									</div>
									<input onChange={this.handleChange} type="password" className="form-control" id="password" name="password" placeholder="password" required></input>
								</div>
								<div className="form-group">
									<input type="submit" value="Login" className="btn-lg float-right login_btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
    }
}
export default Login;