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
import AlertContainer from 'react-alert';

export default class LoginForm extends React.Component {
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
					this.handleSubmit = this.handleSubmit.bind(this)
					this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e , value){
    console.log(e.target.name, value);
    var tempObj ={};
    tempObj[e.target.name] = value;
    this.setState(tempObj)
  }
	componentDidMount(){
		$('#loginFormElement').submit(function () {
		return false;
		});
		if(this.props.location.query.query == "emailverified")
		{
			this.msg.show(<div > <p>You email has been Successfully Verified</p><br/><p>Now you can login using your emailid</p></div>, {
					time: 10000,
					type: 'success',
					icon: <Touch />
				});
		} else if(this.props.location.query.query == "forgotPassword")
			{
				this.msg.show(<div ><p>Password reset link has been mailed to your email</p></div>, {
						time: 10000,
						type: 'success',
						icon: <Touch />
					});
			}  else if(this.props.location.query.query == "emailallreadyverified")
				{
					this.msg.show(<div ><p>You email has allready been Successfully Verified</p><br/><p>You can login using your emailid</p></div>, {
							time: 10000,
							type: 'success',
							icon: <Touch />
						});
				}   else if(this.props.location.query.query == "emailnotverified")
					{
						this.msg.show(<div ><p>Please check the link </p></div>, {
								time: 10000,
								type: 'success',
								icon: <Touch />
							});
					}
	}
	handleSubmit (e,data){
		console.log("submited",this.state);
		$.ajax({
				url: '/login',
				type: 'POST',
				data: this.state,
				success:function (data) {
					console.log(data);

				}.bind(this),
				error : function (err){
					console.log(err.name);

					this.msg.show(<div dangerouslySetInnerHTML={{__html: err.responseText}} />, {
							time: 10000,
							type: 'success',
							icon: <Touch />
						});

				}.bind(this)
			});

	}
	render () {

return (
  <div id = 'loginform' >
	<form  id = 'loginFormElement' onSubmit={this.handleSubmit}>
    <TextField floatingLabelText="Enter your mail id" name='email' required onChange = {this.handleChange} /><br />
    <TextField hintText="Password Field" floatingLabelText="Password" name='password' type="password" required onChange = {this.handleChange} /><br />
    <div  id = "loginformbuttons">
    <RaisedButton className = "login_buttons" fullWidth label="Login " labelPosition="before"  primary={true} icon={<Touch />} type="submit" />
		<Link to = '/signupForm'>
  <RaisedButton className = "login_buttons" fullWidth label="SignUp " labelPosition="before"  primary={true} icon={<ActionAndroid />}  />
	</Link>
    </div>
<Link to = '/forgotPassword'>
		<div id = "forgotpassword">
		       Forgot Password
    </div>
		</Link>
		</form>
		<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
  </div>
)

  }}
