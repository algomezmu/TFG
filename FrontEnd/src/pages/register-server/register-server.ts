import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Validators, FormBuilder } from "@angular/forms";
import { LoginPage } from "../login/login";
import { LoginService } from "../../services/login.service";
//import { HomePage } from "../home/home";
import { Storage } from '@ionic/storage';
import { ListServersPage } from "../list-servers/list-servers"
import * as crypto from 'crypto-js/sha512';

@Component({
  selector: 'page-register',
  templateUrl: 'register-server.html'
})
export class RegisterServerPage {

  public registerForm;

  constructor(public nav: NavController, private formBuilder: FormBuilder,
    private loginService: LoginService, public toastCtrl: ToastController, private storage: Storage) {
    this.registerForm = this.formBuilder.group({
      serverName: ['Prueba', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      serverDomain: ['localhost', Validators.compose([Validators.maxLength(60), Validators.required])],
      username: ['admin', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      password: ['12345678', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      port: ['3000', Validators.compose([Validators.pattern('[0-9 ]*')])]
    });
  }

  // register and go to home page
  register() {
    var serverName = this.registerForm.controls['serverName'].value;
    var serverDomain = this.registerForm.controls['serverDomain'].value;
    var username = this.registerForm.controls['username'].value;
    var password = this.registerForm.controls['password'].value;
    var port = this.registerForm.controls['port'].value;

    if (!serverDomain.includes("http")) {
      serverDomain = "http://" + serverDomain
    }

    if (!port || port == "") {
      serverDomain = serverDomain + ":3000";
    } else {
      serverDomain = serverDomain + ":" + port;
    }
    this.storage.get(serverName).then((val) => {
      if(val){
        this.alertMessage("The server name already exist", "red")
      }else{
        this.tryConnectAndSave(serverName, serverDomain, username, password)
      }
    });
    /*
    this.secureStorage.create('server_list')
      .then((storage: SecureStorageObject) => {
          storage.get(serverName)
          .then(
            data => this.alertMessage("The server name already exist", "red"),
            error => this.tryConnectAndSave(serverName, serverDomain, username, password)
        );
      });*/
    //this.nav.setRoot(HomePage);
  }

  tryConnectAndSave(serverName, serverDomain, username, password){
    
    var hash = crypto(password).toString();
    this.loginService.login(serverDomain, username, hash).subscribe(
      data => {
        if (data.status == "error" || data.error == "errorConexion") {
          if(data.error == "errorConexion")
            data.message = "Connexion error"
          this.alertMessage(data.message, "red");
        } else {
          //Correct Login
          const result = {serverDomain: serverDomain, username: username, password: hash }
          
          this.storage.set(serverName, JSON.stringify(result));
          this.alertMessage("Server Created", "green");
          this.nav.setRoot(ListServersPage);
        }
      },
      error => {
        this.alertMessage("Connexion error", "red");
      }
    );
  }

  alertMessage(message, type){
    var css = "alert_red";
    if(type === "green"){
      css = "alert_green";
    }
    let alert = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: css,
      closeButtonText: 'Ok',
      showCloseButton: true
    });

    alert.present();
  }

  installBackend() {
    console.log("Aqui");
    this.storage.forEach((value, key, index) => {
      this.storage.remove(key);
    });
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
