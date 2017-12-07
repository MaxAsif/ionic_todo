import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class UserProvider {

    constructor(public storage: Storage) {
      console.log('Hello UserProvider Provider');
    }
    getUser()
    {

      console.log('user credentials fetched');
      return this.storage.get('user');

    }
    saveUser(user)
    {

      this.storage.set('user',user);
      
    }
    getAll()
    {
      this.storage.forEach((index, key, value) => {
        console.log('All Data in storage : ',index,':', key, value);
      });
    }

  }
