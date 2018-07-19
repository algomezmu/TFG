import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'page-memory-actual',
  templateUrl: 'memoryActual.html'
})
export class MemoryActualPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // list of process
  public processList: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['Used (Mb)', 'Free (Mb)'];
  public doughnutChartData:number[] = [100, 0];
  public doughnutChartType:string = 'doughnut';
  //
  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController) {
    this.reloadChart(null);
  }

  converToMB(bytes: number): number{
    return Number((bytes/1048576).toFixed(2));
  }

  reloadChart(refresher) {
    this.lookService.mem(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      if (res.status != "error") {
        this.doughnutChartData = [ this.converToMB(res.message.memFree), this.converToMB(res.message.memTotal  - res.message.memFree) ];

        this.lookService.process(this.shareDataService.serverDomain, this.shareDataService.token, "m", 5).subscribe(res => {
          res.message.forEach((process, index) => {
            res.message[index].pmem = Math.round(process.pmem * 100) / 100;
          });
          this.processList = res.message;

          if (refresher) {
            refresher.complete();
          }
        });
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
