import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
import Loader from 'react-loader-spinner'

const ForgotPassword = () => {
	const { register, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [userExists, setUserExists] = useState(true)
	const btnRef = useRef()

	const onSubmit = async data => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled')
		}
		setLoading(true)
		setError(false)
		setUserExists(true)
		setSuccess(false)
		try {
			const res = await axios.post(
				`https://limitless-badlands-01612.herokuapp.com/password/forgotpassword`,
				data
			)
			if (res.data.message === 'Success') setSuccess(true)
			else if (res.data.message === 'User not found') setUserExists(false)
			else setError(true)
			setLoading(false)
			if (btnRef.current) btnRef.current.removeAttribute('disabled')
		} catch (err) {
			setError(true)
		}
	}
	return (
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
												Forgot Your Password?
											</h1>
											<p className="mb-4">
												Enter your email address below and we'll send you a link
												to reset your password!
											</p>
										</div>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="form-signin"
										>
											<div className="form-label-group">
												<input
													type="email"
													className="form-control form-control-user"
													id="email"
													name="email"
													placeholder="Enter Email Address"
													autoFocus
													ref={register}
												/>
												<label htmlFor="email">Email</label>
											</div>
											<button
												className="btn btn-primary btn-user btn-block"
												ref={btnRef}
											>
												Reset Password
											</button>
										</form>
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
												Error, please try again
											</p>
										) : null}
										{success ? (
											<p className="text-center text-primary">
												Please check your mail to reset password
											</p>
										) : null}
										{!userExists ? (
											<p className="text-center text-danger">
												User doesn't exists
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
	)
}

export default ForgotPassword
