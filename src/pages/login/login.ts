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

 
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	
 	email : any;
 	password : any;
 	name : any;
 	authEmail: any;
 	authPassword: any;
 	public users = [];
 	
 	constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider,
 		public alertCtrl : AlertController, public modalCtrl : ModalController) {
 		
 	}
 	
 	getAuthdata(email)
 	{
 		console.log('Getting user details from storage......');
 		this.userService.getUser().then((users)=>{
 			
 			if(users)
 			{
 				console.log('Email being searched for',email);
 				for(var i=0; i<users.length; i++)
 				{
 					console.log("user["+i+"]"+users[i].email+users[i].password);

 					if(users[i].email == email )
 					{
 						this.email = users[i].email;
 						this.password = users[i].password;
 						this.name = users[i].name;
 						break;
 					}
 				}
 				
 				
 			}
 		}).catch((error)=>{
 			console.log('Cannot get user details',error.message);
 		});
 		console.log('....Got user details from storage as',this.email,this.password);
 	}

 	login()
 	{	
 		
 		this.getAuthdata(this.authEmail);
 		
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
 		

 	}
 	authenticate()
 	{
 		console.log('Email entered',this.authEmail,this.authPassword);
 		console.log('Fetched email',this.email,this.password);
 		if(this.email){
 			if((this.email == this.authEmail ) && (this.password == this.password))
 			{
 				console.log('Authenticated');
 				this.navCtrl.setRoot(HomePage,{
 					name : this.name,
 				});
 			}
 			else{
 				console.log('Not authenticated');
 			}
 		}
 		else{
 			this.showalert('Cannot find you in database :-(');
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
 				this.users.push(user);
 				this.userService.saveUser(this.users);
 			}
 		});
 		addModal.present();

 	}
 	getallstoragedata()
 	{
 		this.userService.getAll();
 	}
 	
 }
