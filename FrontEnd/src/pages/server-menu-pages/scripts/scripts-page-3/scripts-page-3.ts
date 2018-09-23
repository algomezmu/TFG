import { Component, ViewChild } from "@angular/core";
import { App, NavController, NavParams, ToastController, LoadingController, AlertController  } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder } from "@angular/forms";
import * as crypto from 'crypto-js/sha512';

@Component({
  selector: 'page-scripts-3',
  templateUrl: 'scripts-page-3.html'
})
export class ScriptsLaunchPage {

  public command;
  public perm;

  public result;

  constructor(public appCtrl: App, public nav: NavController, private navParams: NavParams, public shareDataService: ShareDataService,
    public runService: RunService, private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.command = navParams.get('command');
    this.perm = navParams.get('perm');
  }

  launchScript() {
    var command = {
      command: this.command
    }
    
    if(this.perm == true){
      this.showPrompt(command);
    }else{
      this.runWithout(command);
    }
  }

  runWithout(command){
    var loader = presentLoading(this.loadingCtrl);
    this.runService.launchScript(this.shareDataService.serverDomain, this.shareDataService.token, command).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.result = res.message;
        alertMessage(this.toastCtrl, "Done", "green");
      }else{
        alertMessage(this.toastCtrl, res.message, "red");
      }
    },
      error => {
        loader.dismiss();
        alertMessage(this.toastCtrl, "Conexion Error", "red");
        this.appCtrl.getRootNav().setRoot(ListServersPage);
      });
  }

  runWith(command, perm){
    var loader = presentLoading(this.loadingCtrl);
    
    var perm = crypto(perm).toString();
    this.runService.launchScriptWith(this.shareDataService.serverDomain, this.shareDataService.token, {command, perm}).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.result = res.message;
        alertMessage(this.toastCtrl, "Done", "green");
      }else{
        alertMessage(this.toastCtrl, res.message, "red");
      }
    },
      error => {
        loader.dismiss();
        alertMessage(this.toastCtrl, "Conexion Error", "red");
        this.appCtrl.getRootNav().setRoot(ListServersPage);
      });
  }

  
  showPrompt(command) {
    const prompt = this.alertCtrl.create({
      title: 'Password',
      message: "Required password configured in the app for root usage",
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Run',
          handler: data => {
            this.runWith(command, data.password);
          }
        }
      ]
    });
    prompt.present();
  }
}
