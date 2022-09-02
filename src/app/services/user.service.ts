import {User} from "../models/User.model";
import {Subject} from "rxjs/Subject";

export class UserService{
  private users:User[]=[
    {
      firstName:'Mamadou',
      lastName:'SOW',
      email:'ms@gmail.com',
      drinkPreference:'Ananas',
      hobbies:[
        'coder',
        'entreprendre'
      ]
    }
  ];
  userSubject=new Subject<User[]>();

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }
  addUser(user:User){
    this.users.push(user);
    this.emitUsers();
  }
}
