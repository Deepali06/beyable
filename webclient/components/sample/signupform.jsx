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
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
var validator = require('validator');
import Snackbar from 'material-ui/Snackbar';
let {hashHistory} = require('react-router');
import AlertContainer from 'react-alert';

export default class SignupForm extends React.Component {
	constructor () {
		super();
        this.state = {
					snackbar : false
        };
				this.alertOptions = {
					      offset: 14,
					      position: 'top left',
					      theme: 'dark',
					      time: 5000,
					      transition: 'scale'
					    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
				this.handleOnFocusOut = this.handleOnFocusOut.bind(this)
      }
			componentDidMount(){

				$('#contactForm').submit(function () {
				return false;
				});
			}
  handleChange(e , value){
    console.log(e.target.id, value);
    var tempObj ={};
    tempObj[e.target.id] = value;
    this.setState(tempObj)
    if(this.state.emailError)
      {
          if(validator.isEmail(this.state.email) == false)
            this.setState({emailError : "enter a valid email address "})
          else
            this.setState({emailError : ""})
      }
  }
  handleDateChange(e , value){
    this.setState({date : value})

  }
  handleSubmit(e){
		var context =this;

		// e.preventDefault()
    console.log("Asdas");
    console.log(validator.isEmail(this.state.email) , "val");
    if(validator.isEmail(this.state.email) == false)
      this.setState({emailError : "enter a valid email address "})
    else if(!(/\d/.test(this.state.password)))
    {
          this.setState({emailError : "" ,passwordError : "include number"})
    }
    else if(this.state.password.length < 8)
      {
        this.setState({emailError : "" ,passwordError : "must have atleast 8 digits "})
      }
    else if(this.state.password != this.state.passwordReenter)
    {
      this.setState({emailError : "",passwordError : "" ,passwordReenterError : "reentered password dosen't match" })
    }
    else {
      this.setState({emailError : "",passwordError : "" ,passwordReenterError : "",disabled :true })
			console.log(this.state);
			$.ajax({
					url: '/signup',
					type: 'POST',
					data: this.state,
					success:function (data) {
						console.log(data);
						this.msg.show(<div ><p>Registered Successfully.</p></div>, {
								 time: 10000,
								 type: 'success',
								 icon: <Touch />
							 });
							 this.msg.show(<div ><p>Verification link has been mailed to email. Plaese verify.</p></div>, {
	 								 time: 10000,
	 								 type: 'success',
	 								 icon: <Touch />
	 							 });
								 this.msg.show(<div > <p>You will be shortly redirected to login page</p></div>, {
		 								 time: 10000,
		 								 type: 'success',
		 								 icon: <Touch />
		 							 });

						setTimeout(function(){  hashHistory.push('/'); }.bind(this), 4000);

					}.bind(this),
					error : function (err){
						console.log(err);

					}
				});
    }
return false;
  }
	handleRequestClose = () => {
	this.setState({
		snackbar: false,
	});
};

	handleOnFocusOut (){

		$.ajax({
				url: '/verifyEmail',
				type: 'POST',
				data: {email : this.state.email},
				success:function (data) {
					if(data == 'Email allready Exists')
					this.setState({ emailError : data ,disabled:true })
					else {
						console.log();
						this.setState({ emailError : "", disabled:false})
					}

				}.bind(this),
				error : function (err){
					console.log(err);

				}
			});
	}
	render () {
    const textfield = {'marginLeft': '30px' ,'marginTop' : '0px' }
    const emailfield = {'marginLeft': '30px' ,'marginTop' : '0px',width : '550px' }
    const {fname , lname , email , password , passwordReenter ,emailError,passwordError ,passwordReenterError ,disabled} = this.state

return (
  <div id = 'signupform' >
	<form  id = 'contactForm' onSubmit={this.handleSubmit}>

    <TextField id = "fname" floatingLabelText="First Name" required style = {textfield} onChange = {this.handleChange} value = {fname} />
    <TextField  id = "lname" floatingLabelText="Last Name"  required style = {textfield} onChange = {this.handleChange} value = {lname} />
    <TextField id = "email"
  floatingLabelText="Enter your mail id"  onBlur={this.handleOnFocusOut} required style = {emailfield} onChange = {this.handleChange} value = {email} errorText = {emailError}/><br/>
    <div style = {{position : 'relative' , float : 'left'}}>
    <TextField id = "password" hintText="Password" floatingLabelText = "include atleast 8 digits,one numeric"  errorText = {passwordError} floatingLabelFixed = {true} type="password"  required style = {textfield} onChange = {this.handleChange} value = {password}/>
    </div>
    <TextField  id = "passwordReenter" errorText = {passwordReenterError} floatingLabelText="Re-enter your Password" type="password" required style = {textfield} onChange = {this.handleChange} value = {passwordReenter} />
    <Checkbox   label="I accept the terms & conditions in the call for applications"  style = {{marginLeft : '15px' , marginTop : '20px'}} required />

    <div  id = "loginformbuttons">
    <RaisedButton disabled={disabled} className = "login_buttons" fullWidth label="Click to register " labelPosition="before"  primary={true} icon={<Touch />} type="submit"  />
    </div>
    <Link to = '/'>
		<div style = {{  'left': '200px'}} id = "forgotpassword">
		      <a> Allready have an account</a>
    </div>
		</Link>
		</form>
		<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
  </div>
)
  }}
