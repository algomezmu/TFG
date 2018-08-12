import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-event-2',
  templateUrl: 'event-page-2.html'
})
export class EventsCreatePage {

  launchType: any;
  dateProgrammed: any;
  description:any;

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public runService: RunService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      this.launchType = "date";
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
