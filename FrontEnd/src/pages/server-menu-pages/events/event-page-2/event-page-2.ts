import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-event-2',
  templateUrl: 'event-page-2.html'
})
export class EventsCreatePage {


  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    this.reloadChart(null);
  }

  reloadChart(refresher) {
    /*
    var loader = presentLoading(this.loadingCtrl);
    
    this.lookService.cpu(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        var avg = [];
        var min = [];
        var max = [];
        var date = [];
        res.message.forEach(element => {
          avg.push(element.cpuAvg);
          min.push(element.cpuMin);
          max.push(element.cpuMax);
          date.push(element.created_at);
        });

        if (refresher) {
          refresher.complete();
        }
      } else {
        if(res.code == "401"){
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        }
        alertMessage(this.toastCtrl,res.message, "red");

        if (refresher) {
          refresher.complete();
        }
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
