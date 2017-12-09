import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
 @Component({
 	selector: 'page-add-item',
 	templateUrl: 'add-item.html',
 })
 export class AddItemPage {
 	title : string;
 	description : string;
 	time: string;
 	titlePage = 'Add Item';
 	constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController,
 		public alertCtrl: AlertController) {
 		if(navParams.get('title'))
 		{
 			this.title = navParams.get('title');
 			this.description = navParams.get('description');
 			this.titlePage = 'Edit Item';
 			var att = document.createAttribute("disabled");      
 			att.value = "true";
 			//document.getElementById("input_title").setAttributeNode(att);
 		}

 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad AddItemPage');
 	}

 	saveItem()
 	{
 		if(this.title)
 		{

 			let newItem = {
 				title : this.title,
 				description : this.description,
 			};

 			this.view.dismiss(newItem);
 		}
 		else{
 			let alert = this.alertCtrl.create({
 				title: 'Alert!!',
 				subTitle: 'Your title is empty !',
 				buttons: ['OK']
 			});
 			alert.present();
 		}
 	}
 	close()
 	{
 		this.view.dismiss();
 	}

 }
