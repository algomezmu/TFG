import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'page-cpu-actual',
  templateUrl: 'cpuActual.html'
})
export class CpuActualPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // list of process
  public processList: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['Max Usage', 'Min Usage'];
  public doughnutChartData:number[] = [100, 0];
  public doughnutChartType:string = 'doughnut';
  //
  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController) {
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    this.lookService.cpu(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      if (res.status != "error") {
        this.doughnutChartData = [ res.message.cpuMax,res.message.cpuMin];

        this.lookService.process(this.shareDataService.serverDomain, this.shareDataService.token, "c", 5).subscribe(res => {
          res.message.forEach((process, index) => {
            res.message[index].pcpu = Math.round(process.pcpu * 100) / 100;
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
