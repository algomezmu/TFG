import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { converToMB } from "../../../../utils/lib";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
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
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.lookService.mem(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.doughnutChartData = [ converToMB(res.message.memFree), converToMB(res.message.memTotal  - res.message.memFree) ];

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
        alertMessage(this.toastCtrl, res.message, "red");

        if (refresher) {
          refresher.complete();
        }
      }
    });
  }
}
