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
  selector: 'page-memory-history',
  templateUrl: 'memoryHistory.html'
})
export class MemoryHistoryPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  //Data
  private initDate: any;
  private endDate: any;

  //Line Chart Optipons
  public lineChartData: Array<any> = [{ data: [0], label: 'No Data' }, { data: [0], label: 'No Data' }, { data: [0], label: 'No Data' }];
  public lineChartLabels: Array<any> = ['No Data'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, array) {
              return null;
            }
          }
        }
      ]
    }
  };
  //

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public lookService: LookService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.initDate = new Date();
    this.initDate.setDate(this.initDate.getDate() - 3);
    this.initDate = this.initDate.toISOString();
    this.endDate = new Date().toISOString();
    this.reloadChart(null);
  }

  reloadChart(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.lookService.mem(this.shareDataService.serverDomain, this.shareDataService.token, this.initDate, this.endDate, false).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        var free = [];
        var used = [];
        var swapfree = [];
        var swapused = [];
        var date = [];
        res.message.forEach(element => {
          free.push(converToMB(element.memFree));
          used.push(converToMB(element.memTotal  - element.memFree));
          swapfree.push(converToMB(element.memSwapfree));
          swapused.push(converToMB(element.memSwaptotal - element.memSwapfree));
          date.push(element.created_at);
        });
        this.lineChartLabels = date;
        this.lineChartData = [
          { data: free, label: 'free' },
          { data: used, label: 'used' },
          { data: swapfree, label: 'swapfree' },
          { data: swapused, label: 'swapused' }
        ];

        // The next code is for updating the chart DONT TOUCH
        if (
          this.chart !== undefined &&
          this.chart.chart !== undefined
        ) {
          this.chart.chart.destroy();
          this.chart.chart = 0;

          this.chart.chartType = this.lineChartType;
          this.chart.datasets = this.lineChartData;
          this.chart.labels = this.lineChartLabels;
          this.chart.ngOnInit();
        }

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
  }
}
