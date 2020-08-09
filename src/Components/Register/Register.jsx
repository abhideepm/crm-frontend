import React, { useState, useRef } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const Register = ({ history }) => {
	const { register, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [userExists, setUserExists] = useState(false)
	const [validEmail, setValidEmail] = useState(true)
	const btnRef = useRef()

	function validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	const onSubmit = async data => {
		if (!validateEmail(data.email)) {
			setValidEmail(false)
			return
		}
		if (btnRef.current) btnRef.current.setAttribute('disabled', 'disabled')
		setLoading(true)
		setError(false)
		const res = await axios.post(
			`https://limitless-badlands-01612.herokuapp.com/register`,
			data
		)
		if (res.data.message === 'Success') history.push('/login')
		else if (res.data.message === 'User already exists') setUserExists(true)
		else setError(true)
		setLoading(false)
		if (btnRef.current) btnRef.current.removeAttribute('disabled')
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
										<option value="Employee">Employee</option>
										<option value="Manager">Manager</option>
										<option value="Admin">Admin</option>
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
									ref={btnRef}
									type="submit"
								>
									Register
								</button>
								<hr />
								{loading ? (
									<div className="text-center">
										<Loader
											type="TailSpin"
											color="#00BFFF"
											height={50}
											width={50}
										/>
									</div>
								) : null}
								{error ? (
									<p className="text-center text-danger">
										Error in Registration
									</p>
								) : null}
								{!validEmail ? (
									<p className="text-center text-danger">
										Email address invalid
									</p>
								) : null}
								{userExists ? (
									<p className="text-center text-danger">User already exists</p>
								) : null}
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
