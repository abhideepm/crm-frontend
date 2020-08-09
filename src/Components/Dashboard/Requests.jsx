import React from 'react'
import axios from 'axios'

const Requests = ({ requestsData, history }) => {
	const token = localStorage.getItem('token')
	const deleteData = async id => {
		try {
			const res = await axios.delete(
				`https://limitless-badlands-01612.herokuapp.com/requests/${id}`,
				{
					headers: { 'Content-Type': 'application/json', authenticate: token },
				}
			)
			if (res.data === 'Forbidden') alert('Access Denied')
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
							onClick={() => history.push(`/dashboard/addrequests`)}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>
					<h3 className="card-title">Service Requests</h3>
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Contact</th>
								<th scope="col">Status</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{requestsData.map(item => (
								<tr key={item._id}>
									<td>{item.title}</td>
									<td>{item.contact}</td>
									<td>{item.status}</td>
									<td className="d-flex justify-content-around">
										<button
											className="btn btn-primary"
											onClick={() =>
												history.push(`/dashboard/addrequests/${item._id}`)
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

export default Requests
