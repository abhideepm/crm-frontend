import React from 'react'

const Home = ({ leadsData, contactsData, requestsData }) => {
	const title = ['Leads', 'Contacts', 'Requests']
	const data = [leadsData, contactsData, requestsData]
	return (
		<div className="mx-auto w-50">
			<div className="card shadow my-5">
				<div className="card-body">
					{title.map((item, idx) => (
						<div
							key={item}
							className="card shadow my-5 w-75 mx-auto animate__bounceIn"
						>
							<div className="card-body text-center">
								<h3 className="card-title">{item}</h3>
								<h1 className="card-text">{data[idx].length}</h1>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
