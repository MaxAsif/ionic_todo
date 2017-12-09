import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, Nav, MenuController , AlertController} from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { DataProvider } from '../../providers/data/data';
import { UserProvider } from '../../providers/user/user';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public items = [];

  name : any;
  pages: Array<{title: string, component: any}>;
  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public dataService: DataProvider, 
    public navParam : NavParams, 
    public userService : UserProvider, 
    public menu : MenuController,
    public alertCtrl: AlertController) {
  	this.dataService.getData().then((todos)=>{
      if(todos)
      {
        this.items = todos;
      }
    });
    this.pages = [
    { title: 'details', component: ItemDetailPage },
    { title: 'additem', component: AddItemPage },

    ];
  }
  ionViewDidLoad(){
    console.log("IonViewdidload");
    this.name = this.navParam.get('name');


  }

  addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);
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

    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage,{
      item: item,
      items : this.items,
    });
  }
  delete(item)
  {

      let alert = this.alertCtrl.create({
        title: 'Warning!',
        message: 'Are you sure you wanna delete it?',
        buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
            this.dataService.deleteData(item,this.items);
          }
        }
        ]
      });
      alert.present();
    
  }
  /*
  Enable it when other page is added
   openPage(p)
   {
     this.menu.close();
     this.navCtrl.setRoot(p.component);
   }*/

 }
