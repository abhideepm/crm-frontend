import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = ({ history, match }) => {
	const { register, handleSubmit } = useForm()
	const token = match.params.token
	const onSubmit = async data => {
		const { password, confirmpassword } = data
		if (password !== confirmpassword) alert(`Passwords don't match`)
		else {
			try {
				const res = await axios.post(
					`https://limitless-badlands-01612.herokuapp.com/password/resetpassword`,
					{ password: password, token: token }
				)
				if (res.data.message === 'Token expired') {
					alert('Token Expired')
					history.push('/forgotpassword')
				} else if (res.data.message === 'Success') {
					alert('Password successfully updated')
					history.push('/login')
				} else alert('Error')
			} catch (err) {
				alert(err)
			}
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
											<h1 className="h4 text-gray-900 mb-2">Reset Password</h1>
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
											<button className="btn btn-primary btn-user btn-block">
												Reset Password
											</button>
										</form>
										<hr />
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

export default ResetPassword
