import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const AddOrEditContacts = ({
	match,
	history,
	contactsData,
	setContactsData,
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
		editValue = contactsData.filter(item => item._id === id)[0]
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
				delete data._id
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
				setContactsData(
					contactsData.map(item => {
						if (item._id === id) {
							item = res.data
						}
						return item
					})
				)
			}
			history.push('/dashboard/contacts')
		} catch (err) {
			setError(true)
		}
	}

	return (
		<div className="mx-auto w-75">
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

export default AddOrEditContacts
