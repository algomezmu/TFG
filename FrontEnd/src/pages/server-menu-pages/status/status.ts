import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../utils/shareData";
import { LookService } from "../../../services/look.service";
import { converToMB } from '../../../utils/lib';
import { alertMessage } from '../../../utils/lib';
import { presentLoading } from '../../../utils/lib';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  system : any;
  cpu : any;
  mem : any;
  uptime : any;
  loader: any;

  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      this.loadPage(null);
  }

  loadPage(refresher) {
    this.loader = presentLoading(this.loadingCtrl);
    this.lookService.status(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      this.loader.dismiss();
      if (res.status != "error") {
        this.system = res.message[0];
        this.uptime = res.message[1];
        this.cpu = res.message[2];
        this.mem = res.message[3];

        //Prepare the date
        var date = new Date(this.uptime.current);
        this.uptime.current = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        //Prepare the uptime
        var seconds = Number(this.uptime.uptime);
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        this.uptime.uptime = days+" d, "+hrs+" H, "+mnts+" M, "+seconds+" S";

        //Prepare Memory
        this.mem.used = converToMB(this.mem.used);
        this.mem.free = converToMB(this.mem.free);

          if (refresher) {
            refresher.complete();
          }
      } else {
        if(res.code == "401"){
          this.nav.popToRoot();
        }
        alertMessage(this.toastCtrl, res.message, "red");

        if (refresher) {
          refresher.complete();
        }
      }
    });
  }
}
