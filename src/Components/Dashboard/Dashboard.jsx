import React, { useEffect } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Home from './Home'
import Leads from './Leads'
import Requests from './Requests'
import Contacts from './Contacts'
import axios from 'axios'

const Dashboard = ({ match, history }) => {
	const validateLogin = async () => {
		try {
			const token = localStorage.getItem('token')
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

	useEffect(() => {
		validateLogin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
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
				<Route path={`${match.url}/home`} component={Home} />
				<Route path={`${match.url}/leads`} component={Leads} />
				<Route path={`${match.url}/requests`} component={Requests} />
				<Route path={`${match.url}/contacts`} component={Contacts} />
				<Redirect from={`${match.url}/`} to={`${match.url}/home`} />
			</Switch>
		</div>
	)
}

export default Dashboard
