import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	email : any;
 	password : any;
 	authEmail: any;
 	authPassword: any;
 	constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider,
 		public alertCtrl : AlertController, public modalCtrl : ModalController) {
 		
 	}
 	getAuthdata()
 	{
 		console.log('Getting user details from storage......');
 		this.userService.getUser().then((user)=>{
 			console.log('user after fetching',user.name,user.email,user.password);
 			if(user)
 			{
 				this.email = user.email;
 				this.password = user.password;
 			}
 		}).catch((error)=>{
 			console.log('Cannot get user details',error.message);
 		});
 		console.log('....Got user details from storage as',this.email,this.password);
 	}

 	login()
 	{	
 		
 		this.getAuthdata();
 		
 		if(this.authEmail && this.authPassword)
 		{
 			this.authenticate();
 		}
 		else
 		{
 			let message = 'Please enter email and password!';
 			this.showalert(message);
 		}
 	}
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad LoginPage');	
 		this.getAuthdata();

 	}
 	authenticate()
 	{
 		console.log('Email entered',this.authEmail,this.authPassword);
 		console.log('Fetched email',this.email,this.password);
 		if((this.email == this.authEmail ) && (this.password == this.password))
 		{
 			console.log('Authenticated');
 			this.navCtrl.setRoot(HomePage);
 		}
 		else{
 			console.log('Not authenticated');
 		}
 	}
 	showalert(message)
 	{
 		let alert = this.alertCtrl.create({
 			title: 'Alert!',
 			subTitle: message,
 			buttons: ['OK']
 		});
 		alert.present();
 	}
 	register()
 	{
 		let addModal = this.modalCtrl.create(RegisterPage);
 		addModal.onDidDismiss((user)=>{
 			if(user)
 			{
 				this.userService.saveUser(user);
 			}
 		});
 		addModal.present();

 	}
 	getallstoragedata()
 	{
 		this.userService.getAll();
 	}
 	
 }
