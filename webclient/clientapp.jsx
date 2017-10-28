import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory,IndexRoute} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sample from './components/sample/sample.jsx';
import LoginForm from './components/sample/loginform.jsx';
import ForgotPassword from './components/sample/forgotpassword.jsx';
import SignupForm from './components/sample/signupform.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={hashHistory}>
			<Route path="/" component = {Sample} >
				<IndexRoute component = {LoginForm}/>
				<Route path = '/forgotPassword' component = {ForgotPassword}/>
				<Route path = '/signupForm' component = {SignupForm}/>
			</Route>
		</Router>
	</MuiThemeProvider>,
  	document.getElementById('mountapp')
);
