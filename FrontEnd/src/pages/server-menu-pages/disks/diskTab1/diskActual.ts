import { Component, ViewChild } from "@angular/core";
import { App, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ListServersPage } from "../../../list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { converToMB } from "../../../../utils/lib";

@Component({
  selector: 'page-disk-actual',
  templateUrl: 'diskActual.html'
})
export class DiskActualPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // list of process
  public processList: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['Used', 'Free'];
  public doughnutChartData = [];
  public doughnutChartType:string = 'doughnut';
  //
  constructor(public appCtrl: App, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.lookService.disk(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        console.log(res.message);
        this.doughnutChartData = [];
        res.message.forEach(element => {
          this.doughnutChartData.push({fs:element.fs, mount:element.mount, type: element.type, data:[converToMB(element.used), converToMB(element.size - element.used)]});
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
    },
    error => {
      loader.dismiss();
      alertMessage(this.toastCtrl, "Conexion Error", "red");
      this.appCtrl.getRootNav().setRoot(ListServersPage);
    });
  }
}
