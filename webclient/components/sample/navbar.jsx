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
import LoginForm from './loginform.jsx'
import Snackbar from 'material-ui/Snackbar';

export default class Navbar extends React.Component {
	constructor () {
		super();
		this.state = {

		}
		this.alertOptions = {
						offset: 14,
						position: 'top left',
						theme: 'dark',
						time: 5000,
						transition: 'scale'
					};
	}


	render () {
	const	{ display } = this.state;
console.log(this.props)


		return (
			<div id = 'loginwrapper' style = {{"left" : "calc(50% - 350px)" , 'width' : '700px' }}>
				<div id = 'logo'>
					<img src = "http://demo.beyable.com/themes/ap_decorative_store/logo_beyable.png" />
					</div>
					  {this.props.children}

			</div>
		);
	}
}//end of class
