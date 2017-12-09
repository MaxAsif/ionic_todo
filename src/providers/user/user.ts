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
      
    }
    getUser()
    {

      console.log('users credentials fetched');
      return this.storage.get('users');

    }
    saveUser(users)
    {

      this.storage.set('users',users);
      
    }
    getAll()
    {
      this.storage.forEach((index, key, value) => {
        console.log('All Data in storage : ',index,':', key, value);
      });
    }

  }
