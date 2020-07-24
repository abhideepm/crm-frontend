import React from 'react'
import './Register.css'

const Register = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin flex-row my-5">
						<div className="card-body">
							<h5 className="card-title text-center">Register</h5>
							<form className="form-signin">
								<div className="form-label-group">
									<input
										type="text"
										id="inputUserame"
										className="form-control"
										placeholder="Username"
										required
										autoFocus
									/>
									<label for="inputUserame">Username</label>
								</div>

								<div className="form-label-group">
									<input
										type="email"
										id="inputEmail"
										className="form-control"
										placeholder="Email address"
										required
									/>
									<label for="inputEmail">Email address</label>
								</div>

								<hr />

								<div className="form-label-group">
									<input
										type="password"
										id="inputPassword"
										className="form-control"
										placeholder="Password"
										required
									/>
									<label for="inputPassword">Password</label>
								</div>

								<div className="form-label-group">
									<input
										type="password"
										id="inputConfirmPassword"
										className="form-control"
										placeholder="Password"
										required
									/>
									<label for="inputConfirmPassword">Confirm password</label>
								</div>

								<button
									className="btn btn-lg btn-primary btn-block text-uppercase"
									type="submit"
								>
									Register
								</button>
								<a className="d-block text-center mt-2 small" href="#">
									Sign In
								</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
