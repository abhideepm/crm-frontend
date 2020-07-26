import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const AddOrEditRequests = ({ contactsData, match, history }) => {
	const token = localStorage.getItem('token')
	const { register, handleSubmit } = useForm()
	const id = match.params.id
	let val = ''
	id ? (val = 'Edit') : (val = 'Add')

	const onSubmit = async data => {
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
				if (res.data.message === 'Success')
					alert('Data Successfully Inserted, please refresh')
			} else {
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
				if (res.data.message === 'Success')
					alert('Data Successfully Edited, please refresh')
			}
			history.push('/dashboard/requests')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="mx-auto w-50">
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
							>
								{val}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddOrEditRequests
