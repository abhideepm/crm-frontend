import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const AddOrEditRequests = ({
	contactsData,
	match,
	history,
	requestsData,
	setRequestsData,
}) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const btnRef = useRef()

	const token = localStorage.getItem('token')
	const id = match.params.id
	let val = ''
	id ? (val = 'Edit') : (val = 'Add')

	let editValue = {}
	if (val === 'Edit')
		editValue = requestsData.filter(item => item._id === id)[0]
	const { register, handleSubmit } = useForm({ defaultValues: editValue })

	const onSubmit = async data => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled')
		}
		setLoading(true)
		setError(false)
		try {
			if (val === 'Add') {
				const res = await axios.post(
					`https://limitless-badlands-01612.herokuapp.com/requests`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				setRequestsData(requestsData.concat(res.data))
			} else {
				delete data._id
				const res = await axios.put(
					`https://limitless-badlands-01612.herokuapp.com/requests/${id}`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				setRequestsData(
					requestsData.map(item => {
						if (item._id === id) {
							item = res.data
						}
						return item
					})
				)
			}
			history.push('/dashboard/requests')
		} catch (err) {
			setError(true)
		}
	}

	return (
		<div className="mx-auto w-75">
			<div className="card shadow my-5">
				<div className="card-body">
					<h3 className="card-title text-center">{val} Request</h3>
					<div className="card-text">
						<form onSubmit={handleSubmit(onSubmit)} className="form-signin">
							<div className="form-label-group">
								<input
									type="text"
									id="title"
									name="title"
									className="form-control"
									placeholder="Title"
									ref={register}
									required
								/>
								<label htmlFor="title">Title</label>
							</div>

							<div className="form-label-group">
								<select
									id="contact"
									name="contact"
									className="form-control"
									ref={register}
									defaultValue="SEL"
									required
								>
									<option value="SEL" disabled>
										Contact
									</option>
									{contactsData.map(item => (
										<option value={item.name} key={item._id}>
											{item.name}
										</option>
									))}
								</select>
							</div>

							<div className="form-label-group">
								<select
									id="status"
									name="status"
									className="form-control"
									ref={register}
									defaultValue="SEL"
									required
								>
									<option value="SEL" disabled>
										Status
									</option>
									<option value="Created">Created</option>
									<option value="Released">Released</option>
									<option value="Open">Open</option>
									<option value="In Process">In Process</option>
									<option value="Cancelled">Cancelled</option>
									<option value="Completed">Completed</option>
								</select>
							</div>

							<button
								className="btn btn-lg btn-primary btn-block text-uppercase"
								type="submit"
								ref={btnRef}
							>
								{val}
							</button>
						</form>
						{loading ? (
							<div className="text-center mt-5">
								<Loader
									type="TailSpin"
									color="#00BFFF"
									height={50}
									width={50}
								/>
							</div>
						) : null}
						{error ? (
							<p className="text-center text-danger">Error {val}ing Data</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddOrEditRequests
