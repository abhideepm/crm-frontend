import React from 'react'

const Leads = ({ leadsData }) => {
	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5">
				<div className="card-body text-center">
					<h3 className="card-title">Leads</h3>
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col">Source</th>
								<th scope="col">Status</th>
								<th scope="col">Owner</th>
							</tr>
						</thead>
						<tbody>
							{leadsData.map(item => (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
									<td>{item.source}</td>
									<td>{item.status}</td>
									<td>{item.owner}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Leads
