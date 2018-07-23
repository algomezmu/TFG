import { Component, ViewChild } from "@angular/core";
import { App, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-cpu-actual',
  templateUrl: 'cpuActual.html'
})
export class CpuActualPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // list of process
  public processList: any;
  private loader: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['Max Usage', 'Min Usage'];
  public doughnutChartData:number[] = [100, 0];
  public doughnutChartType:string = 'doughnut';
  //
  constructor(public appCtrl: App, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    this.loader = presentLoading(this.loadingCtrl);
    this.lookService.cpu(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      this.loader.dismiss();
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
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        }
        alertMessage(this.toastCtrl,res.message, "red");

        if (refresher) {
          refresher.complete();
        }
      }
    });
  }
}
