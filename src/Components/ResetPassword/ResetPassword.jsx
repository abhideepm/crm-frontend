import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const ResetPassword = ({ history, match }) => {
	const { register, handleSubmit } = useForm()
	const token = match.params.token
	const [loading, setLoading] = useState(true)
	const [resetLoading, setResetLoading] = useState(false)
	const [passwordSame, setPasswordSame] = useState(false)
	const [error, setError] = useState(false)
	const btnRef = useRef()

	const fetchTokenStatus = async () => {
		const res = await axios.get(
			`https://limitless-badlands-01612.herokuapp.com/password/tokenstatus/${token}`
		)
		if (res.data.message === 'Token expired') {
			alert('Token Expired, Redirecting')
			history.push('/forgotpassword')
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchTokenStatus()
	}, [])

	const onSubmit = async data => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled')
		}
		setResetLoading(true)
		setPasswordSame(false)
		setError(false)
		const { password, confirmpassword } = data
		if (password !== confirmpassword) {
			setResetLoading(false)
			setPasswordSame(true)
			return
		}
		try {
			const res = await axios.post(
				`https://limitless-badlands-01612.herokuapp.com/password/resetpassword`,
				{ password: password, token: token }
			)
			if (res.data.message === 'Success') {
				alert('Password successfully updated, Redirecting')
				history.push('/login')
			} else setError(true)
		} catch (err) {
			setError(true)
		}
		if (btnRef.current) btnRef.current.removeAttribute('disabled')
	}
	return (
		<div className="">
			{loading ? (
				<div className="text-center my-5">
					<Loader type="Puff" color="#FFF" height={500} width={150} />
					<h1 className="text-light">Verifying Token</h1>
				</div>
			) : (
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card o-hidden border-0 shadow-lg my-5 card-signin">
								<div className="card-body p-0">
									<div className="row">
										<div className="col-lg-12">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-2">
														Reset Password
													</h1>
													<p className="mb-4">Enter your new password below</p>
												</div>
												<form
													onSubmit={handleSubmit(onSubmit)}
													className="form-signin"
												>
													<div className="form-label-group">
														<input
															type="password"
															className="form-control form-control-user"
															id="password"
															name="password"
															placeholder="Enter Password"
															autoFocus
															ref={register}
														/>
														<label htmlFor="password">Password</label>
													</div>
													<div className="form-label-group">
														<input
															type="password"
															className="form-control form-control-user"
															id="confirmpassword"
															name="confirmpassword"
															placeholder="Confirm Password"
															ref={register}
														/>
														<label htmlFor="confirmpassword">
															Confirm Password
														</label>
													</div>
													<button
														className="btn btn-primary btn-user btn-block"
														ref={btnRef}
													>
														Reset Password
													</button>
												</form>
												<hr />
												{resetLoading ? (
													<div className="text-center">
														<Loader
															type="TailSpin"
															color="#00BFFF"
															height={50}
															width={50}
														/>
													</div>
												) : null}
												{passwordSame ? (
													<p className="text-center text-danger">
														Passwords don't match
													</p>
												) : null}
												{error ? (
													<p className="text-center text-danger">
														Error, please try again
													</p>
												) : null}
												<div className="text-center">
													<Link to="/register" className="big">
														Create an Account!
													</Link>
												</div>
												<div className="text-center">
													<Link to="/login" className="big">
														Already have an account? Login!
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ResetPassword
