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
export default class ForgotPassword extends React.Component {
	constructor () {
		super();
		this.state = {

		}
	}


	render () {

return (
  <div id = 'loginform' >
    <TextField floatingLabelText="Enter your mail id" /><br />
    <div  id = "loginformbuttons">
    <Link to = {{ pathname: '/', query: { query: 'forgotPassword' } }} >
    <RaisedButton className = "login_buttons" fullWidth label="Request password" labelPosition="before"  primary={true} icon={<Touch />}  />
    </Link>
    </div>
  </div>
)

  }}
