import React from 'react'
import axios from 'axios'

const Contacts = ({ contactsData, history }) => {
	const token = localStorage.getItem('token')
	const deleteData = async id => {
		try {
			const res = await axios.delete(
				`https://limitless-badlands-01612.herokuapp.com/contacts/${id}`,
				{
					headers: { 'Content-Type': 'application/json', authenticate: token },
				}
			)
			if (res.data === 'Forbidden') alert('Access Denied')
			alert('Data successfully deleted, please refresh')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5 animate__bounceIn">
				<div className="card-body text-center">
					<div className="text-right">
						<button
							className="btn btn-success"
							onClick={() => history.push(`/dashboard/addcontacts`)}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>
					<h3 className="card-title">Contacts</h3>
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
												if (window.confirm('Are you sure you want to delete?'))
													deleteData(item._id)
											}}
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
	)
}

export default Contacts
