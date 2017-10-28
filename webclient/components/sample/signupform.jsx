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
export default class SignupForm extends React.Component {
	constructor () {
		super();
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 60);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() );
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
          minDate: minDate,
          maxDate: maxDate
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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
      this.setState({emailError : "",passwordError : "" ,passwordReenterError : "reentered password dosen't match with entered password" })
    }
    else {
      this.setState({emailError : "",passwordError : "" ,passwordReenterError : "" })
    }

  }
	render () {
    const textfield = {'marginLeft': '30px' ,'marginTop' : '0px' }
    const {fn , ln , date , email , password , passwordReenter ,emailError,passwordError ,passwordReenterError } = this.state
return (
  <div id = 'signupform' >
	<form onsubmit={this.handleSubmit}>
    <div style = {{position : "relative" , float : "left"}}>
    <TextField id = "fn" floatingLabelText="First Name" required style = {textfield} onChange = {this.handleChange} value = {fn} />
    <DatePicker id = "date" hintText="Enter Your Date Of Birth" openToYearSelection = {true}  onChange = {this.handleDateChange} value = {date}  minDate={this.state.minDate} maxDate={this.state.maxDate}  required style = {{'marginLeft': '30px','marginTop' : '25px'}}/>
    <TextField id = "password" hintText="Password" floatingLabelText = "include atleast 8 digits,one numeric"  errorText = {passwordError} floatingLabelFixed = {true} type="password"  required style = {textfield} onChange = {this.handleChange} value = {password}/>
    </div>
    <div>
    <TextField  id = "ln" floatingLabelText="Last Name"  required style = {textfield} onChange = {this.handleChange} value = {ln} />
    <TextField id = "email"  floatingLabelText="Enter your mail id" required style = {textfield} onChange = {this.handleChange} value = {email} errorText = {emailError}/>
    <TextField  id = "passwordReenter" errorText = {passwordReenterError} floatingLabelText="Re-enter your Password" type="password" required style = {textfield} onChange = {this.handleChange} value = {passwordReenter} />
    </div>
    <Checkbox   label="I accept the terms & conditions in the call for applications"  style = {{marginLeft : '15px' , marginTop : '20px'}} required />

    <div  id = "loginformbuttons">
    <RaisedButton className = "login_buttons" fullWidth label="Click to register " labelPosition="before"  primary={true} icon={<Touch />} type="submit"  onClick = {this.handleSubmit} />
    </div>
    <Link to = '/'>
		<div style = {{  'left': '200px'}} id = "forgotpassword">
		      <a> Allready have an account</a>
    </div>
		</Link>
		</form>
  </div>
)
  }}
