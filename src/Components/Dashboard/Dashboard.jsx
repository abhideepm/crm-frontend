import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Home from './Home'
import Leads from './Leads'
import Requests from './Requests'
import Contacts from './Contacts'
import axios from 'axios'
import AddOrEditLeads from './AddOrEditLeads'

const Dashboard = ({ match, history }) => {
	const [leadsData, setLeadsData] = useState([])
	const [contactsData, setContactsData] = useState([])
	const [requestsData, setRequestsData] = useState([])
	const token = localStorage.getItem('token')

	const validateLogin = async () => {
		try {
			const { data } = await axios.get(
				`https://limitless-badlands-01612.herokuapp.com/auth`,
				{
					headers: {
						'Content-Type': 'application/json',
						authenticate: token,
					},
				}
			)
			if (data.message) {
				history.push('/login')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getLeadsData = () =>
		axios.get(`https://limitless-badlands-01612.herokuapp.com/leads`, {
			headers: { 'Content-Type': 'application/json', authenticate: token },
		})

	const getContactsData = () =>
		axios.get(`https://limitless-badlands-01612.herokuapp.com/contacts`, {
			headers: { 'Content-Type': 'application/json', authenticate: token },
		})
	const getRequestData = () =>
		axios.get(`https://limitless-badlands-01612.herokuapp.com/requests`, {
			headers: { 'Content-Type': 'application/json', authenticate: token },
		})
	const getAllData = () => {
		axios.all([getContactsData(), getLeadsData(), getRequestData()]).then(
			axios.spread((...fetchedData) => {
				setContactsData(fetchedData[0].data)
				setLeadsData(fetchedData[1].data)
				setRequestsData(fetchedData[2].data)
			})
		)
	}

	useEffect(() => {
		validateLogin()
		getAllData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const dataProps = {
		leadsData: leadsData,
		contactsData: contactsData,
		requestsData: requestsData,
		setLeadsData: setLeadsData,
		setContactsData: setContactsData,
		setRequestsData: setRequestsData,
	}

	return (
		<div>
			<ul className="d-flex justify-content-around bg-dark list-unstyled h4 py-3">
				<li>
					<Link to={`${match.url}/home`}>HOME</Link>
				</li>
				<li>
					<Link to={`${match.url}/leads`}>LEADS</Link>
				</li>
				<li>
					<Link to={`${match.url}/contacts`}>CONTACTS</Link>
				</li>
				<li>
					<Link to={`${match.url}/requests`}>SERVICE REQUESTS</Link>
				</li>
				<li>
					<Link to={`/login`} onClick={() => localStorage.clear()}>
						LOG OUT
					</Link>
				</li>
			</ul>
			<Switch>
				<Route
					path={`${match.url}/home`}
					render={props => <Home {...props} {...dataProps} />}
				/>
				<Route
					path={`${match.url}/leads`}
					render={props => <Leads {...props} {...dataProps} />}
				/>
				<Route
					path={`${match.url}/requests`}
					component={props => <Requests {...props} {...dataProps} />}
				/>
				<Route
					path={`${match.url}/contacts`}
					render={props => <Contacts {...props} {...dataProps} />}
				/>
				<Route
					path={`${match.url}/addleads/:id?`}
					render={props => <AddOrEditLeads {...props} {...dataProps} />}
				/>
				<Redirect from={`${match.url}/`} to={`${match.url}/home`} />
			</Switch>
		</div>
	)
}

export default Dashboard
