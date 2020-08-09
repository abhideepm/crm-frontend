import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const AddOrEditContacts = ({
	match,
	history,
	contactsData,
	setContactsData,
}) => {
	const token = localStorage.getItem('token')
	const { register, handleSubmit } = useForm()
	const id = match.params.id
	let val = ''
	id ? (val = 'Edit') : (val = 'Add')

	const onSubmit = async data => {
		try {
			if (val === 'Add') {
				const res = await axios.post(
					`https://limitless-badlands-01612.herokuapp.com/contacts`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				setContactsData(contactsData.concat(res.data))
			} else {
				const res = await axios.put(
					`https://limitless-badlands-01612.herokuapp.com/contacts/${id}`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							authenticate: token,
						},
					}
				)
				setContactsData(contactsData.concat(res.data))
			}
			history.push('/dashboard/contacts')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="mx-auto w-50">
			<div className="card shadow my-5">
				<div className="card-body">
					<h3 className="card-title text-center">{val} Contact</h3>
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

export default AddOrEditContacts
