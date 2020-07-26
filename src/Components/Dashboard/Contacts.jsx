import React from 'react'

const Contacts = ({ contactsData }) => {
	return (
		<div className="mx-auto w-75 mt-5">
			<div className="card shadow my-5">
				<div className="card-body text-center">
					<h3 className="card-title">Contacts</h3>
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
							</tr>
						</thead>
						<tbody>
							{contactsData.map(item => (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
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
