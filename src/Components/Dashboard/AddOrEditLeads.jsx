import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'

const AddOrEditLeads = ({ match, history, leadsData, setLeadsData }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const btnRef = useRef()

	const token = localStorage.getItem('token')
	const id = match.params.id
	let val = ''
	id ? (val = 'Edit') : (val = 'Add')

	let editValue = {}
	if (val === 'Edit') editValue = leadsData.filter(item => item._id === id)[0]
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
					`https://limitless-badlands-01612.herokuapp.com/leads`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				setLeadsData(leadsData.concat(res.data))
			} else {
				delete data._id
				const res = await axios.put(
					`https://limitless-badlands-01612.herokuapp.com/leads/${id}`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				if (res.data.message === 'Error modifying leads')
					throw new Error('Edit Error')
				setLeadsData(
					leadsData.map(item => {
						if (item._id === id) {
							item = res.data
						}
						return item
					})
				)
			}
			history.push('/dashboard/leads')
		} catch (err) {
			setError('true')
		}
	}

	return (
		<div className="mx-auto w-lg-50 w-md-50 w-sm-75">
			<div className="card shadow my-5">
				<div className="card-body">
					<h3 className="card-title text-center">{val} Lead</h3>
					<div className="card-text">
						<form onSubmit={handleSubmit(onSubmit)} className="form-signin">
							<div className="form-label-group">
								<input
									type="text"
									id="name"
									name="name"
									className="form-control"
									placeholder="Name"
									ref={register}
									required
								/>
								<label htmlFor="name">Name</label>
							</div>

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
									type="number"
									id="phone"
									name="phone"
									className="form-control"
									placeholder="Phone"
									ref={register}
									required
								/>
								<label htmlFor="phone">Phone</label>
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
									<option value="New">New</option>
									<option value="Contacted">Contacted</option>
									<option value="Qualified">Qualified</option>
									<option value="Lost">Lost</option>
									<option value="Cancelled">Cancelled</option>
									<option value="Confirmed">Confirmed</option>
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

export default AddOrEditLeads
