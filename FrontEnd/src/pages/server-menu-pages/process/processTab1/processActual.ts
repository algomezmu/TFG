import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController, AlertController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { converToMB } from "../../../../utils/lib";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ListServersPage } from "../../../../pages/list-servers/list-servers";

@Component({
  selector: 'page-process-actual',
  templateUrl: 'processActual.html'
})
export class ProcessActualPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // list of process
  public processList: any;

  // Doughnut
  public doughnutChartLabels: string[] = ['Used (Mb)', 'Free (Mb)'];
  public doughnutChartData: number[] = [100, 0];
  public doughnutChartType: string = 'doughnut';
  //
  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
    public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    var loader = presentLoading(this.loadingCtrl);

    this.lookService.process(this.shareDataService.serverDomain, this.shareDataService.token, "c", -1).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.processList = res.message;
      } else {
        if (res.code == "401") {
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        }
        alertMessage(this.toastCtrl, res.message, "red");

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

  processKiller(pid){
    let alert = this.alertCtrl.create({
      title: 'Confirm Kill',
      message: 'Do you want kill the process?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Kill',
          handler: () => {
            var loader = presentLoading(this.loadingCtrl);
            this.lookService.processKiller(this.shareDataService.serverDomain, this.shareDataService.token,pid).subscribe(res => {
              loader.dismiss();
              if (res.status != "error") {
                alertMessage(this.toastCtrl, "Conexion Error", "red");
              } else {
                if (res.code == "401") {
                  this.appCtrl.getRootNav().setRoot(ListServersPage);
                }
                alertMessage(this.toastCtrl, res.message, "red");
              }
            },
              error => {
                loader.dismiss();
                alertMessage(this.toastCtrl, "Conexion Error", "red");
                this.appCtrl.getRootNav().setRoot(ListServersPage);
              });
          }
        }
      ]
    });
    alert.present();
  }
}
