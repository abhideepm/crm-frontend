import React from 'react'
import './ForgotPassword.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
	const { register, handleSubmit } = useForm()
	const onSubmit = data => {
		console.log(data)
	}
	return (
		<div>
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
													Enter your email address below and we'll send you a
													link to reset your password!
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
		</div>
	)
}

export default ForgotPassword
