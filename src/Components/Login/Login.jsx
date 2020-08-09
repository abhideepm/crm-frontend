import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import './Login.css'
import Loader from 'react-loader-spinner'

const Login = ({ history }) => {
	const { register, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const btnRef = useRef()

	const validateLogin = async () => {
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.get(
				`https://limitless-badlands-01612.herokuapp.com/auth`,
				{
					headers: {
						'Content-Type': 'application/json',
						authenticate: token,
					},
				}
			)
			if (data.id) {
				history.push('/dashboard')
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		validateLogin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = async data => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled')
		}
		setLoading(true)
		setError(false)
		const res = await axios.post(
			`https://limitless-badlands-01612.herokuapp.com/login`,
			data
		)
		if (res.data.message === 'Success') {
			localStorage.setItem('token', res.data.token)
			history.push('/dashboard')
		} else setError(true)
		setLoading(false)
		if (btnRef.current) btnRef.current.removeAttribute('disabled')
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
									ref={btnRef}
									type="submit"
								>
									Sign in
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
									<p className="text-center text-danger">Error Signing In</p>
								) : null}
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
