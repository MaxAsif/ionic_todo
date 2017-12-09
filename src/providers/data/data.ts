import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  
  constructor(public storage: Storage) {
    
  }
  getData()
  {
  	return this.storage.get('todos');
  }
  save(data)
  {
  	this.storage.set('todos',data);
  }
  deleteData(data,allData)
  {
    console.log(allData.length);
    for(var i=0; i<allData.length; i++)
    {
      if((allData[i].title == data.title)&& (allData[i].description == data.description))
      {
        allData.splice(i,1);
        break;
      }
    }
    this.storage.set('todos',allData);
  }
  editData(data,allData)
  {
    for(var i=0; i<allData.length; i++)
    {
      if(allData[i].title == data.title)
      {
        allData[i] = data;
        break;
      }
    }
    this.storage.set('todos',allData);
  }
}
