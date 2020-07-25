import React from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Register = () => {
	const { register, handleSubmit } = useForm()
	const onSubmit = data => {
		console.log(data)
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin flex-row my-5">
						<div className="card-body">
							<h5 className="card-title text-center">Register</h5>
							<form onSubmit={handleSubmit(onSubmit)} className="form-signin">
								<div className="form-label-group">
									<input
										type="email"
										id="email"
										name="email"
										className="form-control"
										placeholder="Email address"
										ref={register}
										required
									/>
									<label htmlFor="email">Email address</label>
								</div>

								<div className="form-label-group">
									<input
										type="text"
										id="firstname"
										name="firstname"
										className="form-control"
										placeholder="First Name"
										ref={register}
										required
									/>
									<label htmlFor="firstname">First Name</label>
								</div>

								<div className="form-label-group">
									<input
										type="text"
										id="lastname"
										name="lastname"
										className="form-control"
										placeholder="Last Name"
										ref={register}
										required
									/>
									<label htmlFor="lastname">Last Name</label>
								</div>

								<div className="form-label-group">
									<select
										id="type"
										name="type"
										className="form-control"
										ref={register}
										defaultValue="SEL"
										required
									>
										<option value="SEL" disabled>
											Select Type of Account
										</option>
										<option value="employee">Employee</option>
										<option value="manager">Manager</option>
										<option value="admin">Admin</option>
									</select>
								</div>

								<div className="form-label-group">
									<input
										type="password"
										id="password"
										name="password"
										className="form-control"
										placeholder="Password"
										ref={register}
										required
									/>
									<label htmlFor="password">Password</label>
								</div>

								<button
									className="btn btn-lg btn-primary btn-block text-uppercase"
									type="submit"
								>
									Register
								</button>
								<hr />
								<Link to="/login" className="d-block text-center mt-2 big">
									Sign In
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
