import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import img from '../photo.jpg'
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/account-box';
import Touch from 'material-ui/svg-icons/action/touch-app';
import Send from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import TextFieldIcon from 'material-ui-textfield-icon';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

export default class LoginForm extends React.Component {
	constructor () {
		super();
		this.state = {

		}
	}


	render () {

return (
  <div id = 'loginform' >
	<form >
    <TextField floatingLabelText="Enter your mail id" required /><br />
    <TextField hintText="Password Field" floatingLabelText="Password" type="password" required /><br />
    <div  id = "loginformbuttons">
    <RaisedButton className = "login_buttons" fullWidth label="Login " labelPosition="before"  primary={true} icon={<Touch />} type="submit" />
		<Link to = '/signupForm'>
  <RaisedButton className = "login_buttons" fullWidth label="SignUp " labelPosition="before"  primary={true} icon={<ActionAndroid />}  />
	</Link>
    </div>
<Link to = '/forgotPassword'>
		<div id = "forgotpassword">
		      <a> Forgot Password</a>
    </div>
		</Link>
		</form>
  </div>
)

  }}
