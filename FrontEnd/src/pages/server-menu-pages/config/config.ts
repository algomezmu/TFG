import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../utils/shareData";
import { ConfigService } from "../../../services/config.service";
import { alertMessage } from '../../../utils/lib';
import { presentLoading } from '../../../utils/lib';

@Component({
  selector: 'page-status',
  templateUrl: 'config.html'
})
export class ConfigPage {

  config: any;
  rol:any;

  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService,
    public configService: ConfigService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.rol = this.shareDataService.rol;
    this.loadPage(null);
  }

  loadPage(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.configService.config(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.config = res.message;

        this.config['lCPU'] = this.config.lookCPUTimer.substr(this.config.lookCPUTimer.length - 1);
        this.config['lMem'] = this.config.lookMemoryTimer.substr(this.config.lookMemoryTimer.length - 1);
        this.config['lNetwork'] = this.config.lookNetworkTimer.substr(this.config.lookNetworkTimer.length - 1);

        this.config.lookCPUTimer = Number(this.config.lookCPUTimer.substr(0, this.config.lookCPUTimer.length - 2));
        this.config.lookCPUTimer = this.createDate(this.config.lookCPUTimer, this.config.lCPU);
        this.config.lookMemoryTimer = Number(this.config.lookMemoryTimer.substr(0, this.config.lookMemoryTimer.length - 2));
        this.config.lookMemoryTimer = this.createDate(this.config.lookMemoryTimer, this.config.lMem);
        this.config.lookNetworkTimer = Number(this.config.lookNetworkTimer.substr(0, this.config.lookNetworkTimer.length - 2));
        this.config.lookNetworkTimer = this.createDate(this.config.lookNetworkTimer, this.config.lNetwork);
        this.config.dLookROThan = this.createDate(this.config.dLookROThan, 'm');

        if (refresher) {
          refresher.complete();
        }
      } else {
        if (res.code == "401") {
          this.nav.popToRoot();
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
        this.nav.popToRoot();
      });
  }

  createDate(time, letter) {
    if (letter == 'h') {
      return new Date(Date.UTC(2000, 1, 1, time, 0, 0)).toISOString();
    } else if (letter == 'm') {
      return new Date(Date.UTC(2000, 1, 1, 0, time, 0)).toISOString();
    } else {
      return new Date(Date.UTC(2000, 1, 1, 0, 0, time)).toISOString();
    }
  }

  reduceDate(date: Date, letter) {
    date = new Date(date);
    if (letter == 'h') {
      if (date.getHours() == 0) {
        return 23;
      } else {
        return date.getHours() - 1;
      }
    } else if (letter == 'm') {
      return date.getMinutes();
    } else {
      return date.getSeconds();
    }
  }

  save() {
    var result = {
      lookCPU: this.config.lookCPU,
      lookCPUTimer: this.reduceDate(this.config.lookCPUTimer, this.config.lCPU) + " " + this.config.lCPU,
      lookMemory: this.config.lookMemory,
      lookMemoryTimer: this.reduceDate(this.config.lookMemoryTimer, this.config.lMem) + " " + this.config.lMem,
      lookNetwork: this.config.lookNetwork,
      lookNetworkTimer: this.reduceDate(this.config.lookNetworkTimer, this.config.lNetwork) + " " + this.config.lNetwork,
      dLookROThan: this.reduceDate(this.config.dLookROThan, 'm')
    };

    this.configService.saveConfig(this.shareDataService.serverDomain, this.shareDataService.token, result).subscribe(
      data => {
        if (data.status == "error" || data.error == "errorConexion") {
          if(data.error == "errorConexion")
            data.message = "Connexion error"
          alertMessage(this.toastCtrl, data.message, "red");
        } else {
          alertMessage(this.toastCtrl, "Saved", "green");          
        }
      },
      error => {
        alertMessage(this.toastCtrl, "Connexion error", "red");
      }
    );
  }
}
