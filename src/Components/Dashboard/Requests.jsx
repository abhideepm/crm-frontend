import React from 'react'

const Requests = ({ requestsData }) => {
	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5">
				<div className="card-body text-center">
					<h3 className="card-title">Service Requests</h3>
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Requested By</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{requestsData.map(item => (
								<tr key={item._id}>
									<td>{item.title}</td>
									<td>{item.contact}</td>
									<td>{item.status}</td>
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
