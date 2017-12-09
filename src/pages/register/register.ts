import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-register',
 	templateUrl: 'register.html',
 })
 export class RegisterPage {
 	name : string;
 	email : string;
 	password : string;
 	confirm_password : string;
 	flag : boolean;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public alertCtrl : AlertController) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad RegisterPage');
 	}
 	ionViewWillLeave() {
 		console.log('Regster page closed');
 		if(this.flag)
 		{
 			let title = 'Congratulations!!';
 			let  message = 'Your registration was successfull.';
 			this.showAlert(message,title);

 		}
 	}
 	register()
 	{
 		if(this.name && this.email && this.password && this.confirm_password)
 		{
 			if(this.password === this.confirm_password )
 			{
 				let newUser = {
 					name : this.name,
 					email : this.email,
 					password : this.password
 				}
 				this.flag = true;
 				this.view.dismiss(newUser);
 				console.log('newUser',newUser.name,newUser.email,newUser.password);
 			}
 			else
 			{	
 				let message = 'Your password doesnot match. Please re-enter password.';
 				let title = 'Alert!!';
 				this.password = '';
 				this.confirm_password = '';
 				this.showAlert(message,title);
 			}
 		}
 		else
 		{
 			let message = 'Please enter  all the fields properly';
 			let title = 'Alert!!';
 			this.showAlert(message,title);
 		}
 	}
 	showAlert(message,title)
 	{
 		let alert = this.alertCtrl.create({
 			title: title,
 			subTitle: message,
 			buttons: ['OK']
 		});
 		alert.present();
 	}
 	close()
 	{
 		this.flag = false;
 		this.view.dismiss();
 	}
 }
