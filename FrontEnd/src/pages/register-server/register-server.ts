import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Validators, FormBuilder } from "@angular/forms";
import { LoginPage } from "../login/login";
import { LoginService } from "../../services/login.service";
//import { HomePage } from "../home/home";


@Component({
  selector: 'page-register',
  templateUrl: 'register-server.html'
})
export class RegisterServerPage {

  public registerForm;

  constructor(public nav: NavController, private formBuilder: FormBuilder, private loginService: LoginService, public toastCtrl: ToastController) {
    this.registerForm = this.formBuilder.group({
      serverName: ['Prueba', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z1-9]*'), Validators.required])],
      serverDomain: ['http://localhost:3000', Validators.compose([Validators.maxLength(60), Validators.required])],
      username: ['admin', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      password: ['12345678', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      port: ['3000', Validators.compose([Validators.pattern('0-9 ]*'), Validators.required])]
    });
  }

  // register and go to home page
  register() {
    console.log(this.registerForm.controls['serverName'].value);
    var serverDomain = this.registerForm.controls['serverDomain'].value;
    var username = this.registerForm.controls['username'].value;
    var password = this.registerForm.controls['password'].value;

    this.loginService.login(serverDomain, username, password).subscribe(
      data => {
        if (data.status == "error") {
          let alert = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'bottom',
            cssClass: 'alert',
            closeButtonText: 'Ok',
            showCloseButton: true
          });

          alert.present();
        } else {
          //Correct Login
          console.log(data);
        }
      },
      error => {
        let alert = this.toastCtrl.create({
          message: "Connexion error",
          duration: 3000,
          position: 'bottom',
          cssClass: 'alert',
          closeButtonText: 'Ok',
          showCloseButton: true
        });

        alert.present();
      }
    );
    //this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
