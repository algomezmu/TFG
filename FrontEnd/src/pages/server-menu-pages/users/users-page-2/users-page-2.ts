import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'page-users-2',
  templateUrl: 'users-page-2.html'
})
export class UserCreatePage {

  public registerForm;

  constructor(public appCtrl: App, public nav: NavController, private formBuilder: FormBuilder,public shareDataService: ShareDataService,
     public runService: RunService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

      this.registerForm = this.formBuilder.group({
        username: ['admin', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        password: ['12345678', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        description: ['Prueba', Validators.compose([Validators.maxLength(50), Validators.required])],
        rol: ['Administrator', Validators.compose([Validators.maxLength(60), Validators.required])]
      });
  }

  saveEvent() {
    var loader = presentLoading(this.loadingCtrl);

    var event = {

    }
    
    this.runService.saveEvents(this.shareDataService.serverDomain, this.shareDataService.token, event).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        alertMessage(this.toastCtrl, "Saved", "green");       
        this.nav.pop();
      }
    },
    error => {
      loader.dismiss();
      alertMessage(this.toastCtrl, "Conexion Error", "red");
      this.appCtrl.getRootNav().setRoot(ListServersPage);
    });
  }
}
