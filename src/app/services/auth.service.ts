import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { switchMap, take } from 'rxjs/operators';
import { User, ProfileData } from '../models/user';
import { of } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  user: Observable<any>;
  uid:any;
  userRef:any;
  public userID;

  public userName:string ='';
  public userEmail:string ='';
  public userProfileImageURL:string='';

  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore,
          
    ) {
   
   this.userProfileImageURL = "";

   this.user = this.afAuth.authState.pipe(
            switchMap(user=>{
           //   console.log(user)
              if(user){
                return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
              }
              else{
              
              }
            })
          )
        


  }

  googleLogin(){
    const prov = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(prov);
  }

  private oAuthLogin(prov){
    return this.afAuth.auth.signInWithPopup(prov)
    .then((credential) => {
      this.updateUserData(credential.user)
    })
  }


  getUserRole(userID){
      


  }

  private updateUserData(user){
     this.userID=user.uid;
     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
     const data: User = {
        uid:user.uid,
        email:user.email,
        roles: {
          user: true,
          clubs: false,
          scorer:false,
          admin: false
        }
    }
    
    //store profileData
     const profileRef: AngularFirestoreDocument<ProfileData> = this.afs.doc(`profileData/${user.uid}`);
     const profileData : ProfileData = {
      uid: this.userID,
      profileName: this.userName,
      profileImageURL: this.userProfileImageURL,
      emailAddress: this.userEmail,
   

    }

     profileRef.set(profileData,{merge:true})



     return userRef.set(data,{merge:true})

  }

  signOut(){this.afAuth.auth.signOut()}


  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getAuthState(){
    return this.afAuth.authState;

  }


  async signupUser(name: string,phoneNumber:string, email: string, password: string): Promise<firebase.User> {
    try {
      this.userName = name;
      this.userEmail = email;
      const newUser: any = await firebase.auth()
        .createUserWithEmailAndPassword(email, password).then()

      await this.updateUserData(newUser)
    
      /*  let usee= {
         email: email,
         roles: {
           club:true
         }
          
       } */ 
    /*   await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}`)
        .set(usee); */
   //   await this.reguser(email);
       
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser():Promise<any>
  {
    return this.user.pipe(take(1)).toPromise();
  }


  reguser(email:string): Promise<void> {
    const id = this.afs.createId();
  
    return this.afs.doc(`users/${id}`).set({
      id,
      email,
      roles: {
        user: true,
        clubs: true,
        admin: true
      },
      profileData: {
        profileName: this.userName,
        profileImageURL: this.userProfileImageURL,
        emailAddress: this.userEmail,
      }


    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  checkAuthorization(userr:User,allowedRules:string[]):boolean{
    if(!userr) return false
    for(const role of allowedRules)
    {
      if(userr.roles[role])
      {
        return true;
      }
    }
    return false;
  }

  canRead(userr:User):boolean{
    const allowed =['admin','user','clubs']
    return this.checkAuthorization(userr,allowed);
  }
  canEdit(userr:User):boolean{
    const allowed =['admin','clubs']
    return this.checkAuthorization(userr,allowed);
  }

  canDelete(userr:User):boolean{
    const allowed =['admin']
    return this.checkAuthorization(userr,allowed);
  }
}