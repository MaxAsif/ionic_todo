import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 @Component({
   selector: 'page-item-detail',
   templateUrl: 'item-detail.html',
 })
 export class ItemDetailPage {
   title;
   description;
   public items = [];
   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public dataService: DataProvider) {
   }

   ionViewDidLoad() {
     this.title = this.navParams.get('item').title;
     this.description = this.navParams.get('item').description;
     this.items = this.navParams.get('items');
   }
   edit()
   {  
     let addModal = this.modalCtrl.create(AddItemPage,{
       title : this.title,
       description: this.description,
     });
     addModal.onDidDismiss((item)=>{
       if(item)
       {
         this.saveItem(item);
       }
     });
     addModal.present();
   }
   saveItem(item)
   {
     this.dataService.editData(item,this.items);
     this.navCtrl.pop();
   }

 }
