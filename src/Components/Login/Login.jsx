import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = ({ history }) => {
	const { register, handleSubmit } = useForm()

	// useEffect(() => {
	// 	const token = localStorage.getItem('token')
	// }, [])
	const onSubmit = async data => {
		const res = await axios.post(
			`https://limitless-badlands-01612.herokuapp.com/login`,
			data
		)
		if (res.data.message === 'Success') alert('Sign In successful, Redirecting')
		else alert('Error')
		localStorage.setItem('token', res.data.token)
		history.push('/dashboard')
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin my-5">
						<div className="card-body">
							<h5 className="card-title text-center">Sign In</h5>
							<form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
								<div className="form-label-group">
									<input
										type="email"
										id="email"
										name="email"
										className="form-control"
										placeholder="Email address"
										ref={register}
										required
										autoFocus
									/>
									<label htmlFor="email">Email address</label>
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
									Sign in
								</button>
								<hr />
								<Link
									to="/forgotpassword"
									className="d-block text-center mt-2 big"
								>
									Forgot Password?
								</Link>
								<Link to="/register" className="d-block text-center mt-2 big">
									Don't have an account? Register
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
