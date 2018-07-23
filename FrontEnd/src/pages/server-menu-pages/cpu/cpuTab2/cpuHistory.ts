import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { LookService } from "../../../../services/look.service";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-cpu-history',
  templateUrl: 'cpuHistory.html'
})
export class CpuHistoryPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  //Data
  private initDate: any;
  private endDate: any;
  private loader: any;

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
    this.loader = presentLoading(this.loadingCtrl);
    this.lookService.cpu(this.shareDataService.serverDomain, this.shareDataService.token, this.initDate, this.endDate, false).subscribe(res => {
      this.loader.dismiss();
      if (res.status != "error") {
        var avg = [];
        var min = [];
        var max = [];
        var date = [];
        res.message.forEach(element => {
          avg.push(element.cpuAvg);
          min.push(element.cpuMin);
          max.push(element.cpuMax);
          date.push(element.created_at);
        });
        this.lineChartLabels = date;
        this.lineChartData = [
          { data: avg, label: 'avg' },
          { data: min, label: 'min' },
          { data: max, label: 'max' }
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
    });
  }
}
