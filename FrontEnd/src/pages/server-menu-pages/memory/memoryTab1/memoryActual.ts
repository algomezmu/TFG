import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { converToMB } from "../../../../utils/lib";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ListServersPage } from "../../../../pages/list-servers/list-servers";

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
  private autoreload;
  private buttonColor;
  //
  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.reloadChart(null);
  }

  autoUpdate(){
    if(this.autoreload){
      clearTimeout(this.autoreload);
      this.autoreload = undefined;
      
      this.buttonColor = undefined;
    }else{
      
      var self = this;
      this.autoreload = setInterval(function(){ console.log("aqui");self.reloadChart(null); }, 60000);
      
      this.buttonColor = "#000";
    } 
  }

  reloadChart(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.lookService.mem(this.shareDataService.serverDomain, this.shareDataService.token, null, null, true).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.doughnutChartData = [ converToMB(res.message.memTotal  - res.message.memFree), converToMB(res.message.memFree) ];

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
}
