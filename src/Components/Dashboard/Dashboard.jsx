import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Home from './Home'
import Leads from './Leads'
import Requests from './Requests'
import Contacts from './Contacts'
import axios from 'axios'
import AddOrEditLeads from './AddOrEditLeads'
import AddOrEditContacts from './AddOrEditContacts'
import AddOrEditRequests from './AddOrEditRequests'
import Loader from 'react-loader-spinner'
import './style.css'

const Dashboard = ({ match, history }) => {
	const [leadsData, setLeadsData] = useState([])
	const [contactsData, setContactsData] = useState([])
	const [requestsData, setRequestsData] = useState([])
	const token = localStorage.getItem('token')
	const [loading, setLoading] = useState(true)

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
				if (fetchedData) setLoading(false)
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
		loading: loading,
	}

	return (
		<div>
			{loading ? (
				<div className="text-center my-5">
					<Loader type="Puff" color="#FFF" height={500} width={150} />
				</div>
			) : (
				<div className="">
					<nav className="navbar navbar-expand-lg navbar-dark bg-nav justify-content-between">
						<div>
							<Link to={`${match.url}/home`} className="nav-brand logo">
								<h3>Customer Relations Management System</h3>
							</Link>
						</div>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarsExample05"
							aria-controls="navbarsExample05"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarsExample05">
							<ul className="navbar-nav ml-auto h4 items">
								<li className="nav-item">
									<Link to={`${match.url}/home`} className="nav-link">
										Home
									</Link>
								</li>
								<li>
									<Link to={`${match.url}/leads`} className="nav-link">
										Leads
									</Link>
								</li>
								<li>
									<Link to={`${match.url}/contacts`} className="nav-link">
										Contacts
									</Link>
								</li>
								<li>
									<Link to={`${match.url}/requests`} className="nav-link">
										Service Requests
									</Link>
								</li>
								<li>
									<Link
										to={`/login`}
										onClick={() => localStorage.clear()}
										className="nav-link"
									>
										Log Out
									</Link>
								</li>
							</ul>
						</div>
					</nav>
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
						<Route
							path={`${match.url}/addcontacts/:id?`}
							render={props => <AddOrEditContacts {...props} {...dataProps} />}
						/>
						<Route
							path={`${match.url}/addrequests/:id?`}
							render={props => <AddOrEditRequests {...props} {...dataProps} />}
						/>
						<Redirect from={`${match.url}/`} to={`${match.url}/home`} />
					</Switch>
				</div>
			)}
		</div>
	)
}

export default Dashboard
