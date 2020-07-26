import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Dashboard from './Components/Dashboard/Dashboard'

const App = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/forgotpassword" component={ForgotPassword} />
					<Route path="/resetpassword/:token" component={ResetPassword} />
					<Route path="/dashboard" component={Dashboard} />
					<Redirect from="/" to="/login" />
				</Switch>
			</Router>
		</div>
	)
}

export default App
