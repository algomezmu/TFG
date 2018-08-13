import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'page-event-2',
  templateUrl: 'event-page-2.html'
})
export class EventsCreatePage {

  public registerForm;

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public runService: RunService, private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      this.registerForm = this.formBuilder.group({
        launchType: ['date', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        dateProgrammed: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.maxLength(100)])]
      });
  }

  saveEvent() {
    console.log(this.registerForm.get('launchType'));
    /*
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
    */
  }
}
