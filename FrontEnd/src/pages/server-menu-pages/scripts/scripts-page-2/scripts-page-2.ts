import { Component, ViewChild } from "@angular/core";
import { App, NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'page-scripts-2',
  templateUrl: 'scripts-page-2.html'
})
export class ScriptsCreatePage {

  public registerForm;
  public id;

  constructor(public appCtrl: App, public nav: NavController, private navParams: NavParams,  public shareDataService: ShareDataService,
    public runService: RunService, private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.id = navParams.get('id');
    this.registerForm = this.formBuilder.group({
      command: [navParams.get('command'), Validators.compose([Validators.required])],
      description: [navParams.get('description'), Validators.compose([Validators.maxLength(100)])],
    });
  }

  saveScript() {
    var next = true;

    var loader = presentLoading(this.loadingCtrl);

    var command = this.registerForm.controls['command'].value;
    var description = this.registerForm.controls['description'].value;

    var script = {
      id: this.id,
      command,
      description
    }

    this.runService.saveScript(this.shareDataService.serverDomain, this.shareDataService.token, script).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        alertMessage(this.toastCtrl, "Saved", "green");
        this.nav.pop();
      }
    },
      error => {
        loader.dismiss();
        alertMessage(this.toastCtrl, "Conexion Error", "red");
        this.appCtrl.getRootNav().setRoot(ListServersPage);
      });
  }
}
