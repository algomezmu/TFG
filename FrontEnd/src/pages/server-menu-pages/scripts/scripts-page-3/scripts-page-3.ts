import { Component, ViewChild } from "@angular/core";
import { App, NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'page-scripts-3',
  templateUrl: 'scripts-page-3.html'
})
export class ScriptsLaunchPage {

  public command;

  public result;

  constructor(public appCtrl: App, public nav: NavController, private navParams: NavParams, public shareDataService: ShareDataService,
    public runService: RunService, private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.command = navParams.get('command');
    console.log(this.command);
  }

  launchScript() {
    var command = {
      command: this.command
    }
    var loader = presentLoading(this.loadingCtrl);

    console.log(command);

    this.runService.launchScript(this.shareDataService.serverDomain, this.shareDataService.token, command).subscribe(res => {
      console.log(res)
      loader.dismiss();
      if (res.status != "error") {
        this.result = res.message;
        alertMessage(this.toastCtrl, "Done", "green");
      }else{
        alertMessage(this.toastCtrl, "Conexion Error", "red");
      }
    },
      error => {
        loader.dismiss();
        alertMessage(this.toastCtrl, "Conexion Error", "red");
        this.appCtrl.getRootNav().setRoot(ListServersPage);
      });
  }
}
