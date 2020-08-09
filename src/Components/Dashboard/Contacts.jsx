import React, { useState, useRef } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const Contacts = ({ contactsData, history, setContactsData }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const btnRef = useRef()

	const token = localStorage.getItem('token')
	const deleteData = async id => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled')
		}
		setLoading(true)
		setError(false)
		try {
			await axios.delete(
				`https://limitless-badlands-01612.herokuapp.com/contacts/${id}`,
				{
					headers: { 'Content-Type': 'application/json', authenticate: token },
				}
			)
			if (btnRef.current) btnRef.current.removeAttribute('disabled')
			setLoading(false)
			setContactsData(contactsData.filter(item => item._id !== id))
		} catch (err) {
			setError(true)
		}
	}

	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5 animate__bounceIn">
				<div className="card-body text-center">
					<div className="text-right d-flex justify-content-between">
						<button
							className="btn btn-success"
							onClick={() => history.push(`/dashboard/addcontacts`)}
						>
							<i className="fas fa-plus"></i>
						</button>
						{loading ? (
							<Loader type="Puff" color="#00BFFF" height={25} width={25} />
						) : null}
						{error ? <p className="text-danger">Error with Deletion</p> : null}
					</div>
					<h3 className="card-title">Contacts</h3>
					<div className="table-responsive-sm">
						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Phone</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{contactsData.map(item => (
									<tr key={item._id}>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>{item.phone}</td>
										<td className="d-flex justify-content-around">
											<button
												className="btn btn-primary"
												onClick={() =>
													history.push(`/dashboard/addcontacts/${item._id}`)
												}
											>
												<i className="fas fa-edit"></i>
											</button>
											<button
												className="btn btn-danger"
												onClick={() => {
													if (
														window.confirm('Are you sure you want to delete?')
													)
														deleteData(item._id)
												}}
												ref={btnRef}
											>
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contacts
