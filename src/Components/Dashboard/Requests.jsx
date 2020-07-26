import React from 'react'

const Requests = ({ requestsData }) => {
	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5 animate__bounceIn">
				<div className="card-body text-center">
					<div className="text-right">
						<button className="btn btn-success">
							<i class="fas fa-plus"></i>
						</button>
					</div>
					<h3 className="card-title">Service Requests</h3>
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Requested By</th>
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
										<button className="btn btn-primary">
											<i class="fas fa-edit"></i>
										</button>
										<button className="btn btn-danger">
											<i class="fas fa-trash"></i>
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
