import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { ShareDataService } from "../../../utils/shareData";
import { LookService } from "../../../services/look.service";

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  system : any;
  cpu : any;
  mem : any;
  uptime : any;

  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController) {
    this.loadPage(null);
  }

  loadPage(refresher) {
    this.lookService.status(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      if (res.status != "error") {
        console.log(res);
        this.system = res.message[0];
        this.cpu = res.message[1];
        this.mem = res.message[2];
        this.uptime = res.message[3];

        //this.uptime.uptime = new Date(this.uptime.uptime * 1000).toISOString().substr(11, 8);
        this.uptime.current = new Date(this.uptime.current);
        var seconds = this.uptime.uptime;
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        this.uptime.uptime = days+" d, "+hrs+" H, "+mnts+" M, "+seconds+" S";

          if (refresher) {
            refresher.complete();
          }
      } else {
        if(res.code == "401"){
          this.nav.popToRoot();
        }
        this.alertMessage(res.message, "red");

        if (refresher) {
          refresher.complete();
        }
      }
    });
  }

  alertMessage(message, type) {
    var css = "alert_red";
    if (type === "green") {
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
}
