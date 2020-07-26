import React from 'react'

const Contacts = ({ contactsData }) => {
	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5 animate__bounceIn">
				<div className="card-body text-center">
					<div className="text-right">
						<button className="btn btn-success">
							<i class="fas fa-plus"></i>
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

export default Contacts
