import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { UsersService } from "../../../../services/users.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";
import * as crypto from 'crypto-js/sha512';

@Component({
  selector: 'page-users-2',
  templateUrl: 'users-page-2.html'
})
export class UserCreatePage {

  public registerForm;

  constructor(public appCtrl: App, public nav: NavController, private formBuilder: FormBuilder, public shareDataService: ShareDataService,
     public usersService: UsersService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

      this.registerForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        description: ['', Validators.compose([Validators.maxLength(50)])],
        rol: ['Administrator', Validators.compose([Validators.required])]
      });
  }

  saveUser() {
    var loader = presentLoading(this.loadingCtrl);

    var username = this.registerForm.controls['username'].value;
    var password = crypto(this.registerForm.controls['password'].value).toString();
    var description = this.registerForm.controls['description'].value;
    var rol = this.registerForm.controls['rol'].value;

    var user = {
      username,
      password,
      description,
      rol
    }
    
    this.usersService.saveUser(this.shareDataService.serverDomain, this.shareDataService.token, user).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        alertMessage(this.toastCtrl, "Saved", "green");       
        this.nav.pop();
      }else{
        alertMessage(this.toastCtrl, res.message, "red");       
      }
    },
    error => {
      loader.dismiss();
      alertMessage(this.toastCtrl, "Conexion Error", "red");
      this.appCtrl.getRootNav().setRoot(ListServersPage);
    });
  }
}
