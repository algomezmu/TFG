import { Component, ViewChild } from "@angular/core";
import { NavController, App, ToastController, LoadingController, ActionSheetController, AlertController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { ScriptsCreatePage } from "../../../../pages/server-menu-pages/scripts/scripts-page-2/scripts-page-2";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { ScriptsLaunchPage } from "../scripts-page-3/scripts-page-3";

@Component({
  selector: 'page-scripts-1',
  templateUrl: 'scripts-page-1.html'
})
export class ScriptsListPage {
  //List Events
  scriptList: any;

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public runService: RunService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, 
     public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.reloadScript(null);
  }

  ionViewWillEnter() {
    this.reloadScript(null);
  }

  viewDetail(id, command, perm){
    this.nav.push(ScriptsLaunchPage, {
      command: command,
      perm: perm
    });
  }

  reloadScript(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.runService.getScripts(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.scriptList = res.message;
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

  addScript(){
    this.nav.push(ScriptsCreatePage);
  }

  editScript(id, description, command, perm){
    this.nav.push(ScriptsCreatePage, {id, description, command, perm});
  }
 
  presentActionSheet(id, description, command, perm) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Event Options',
      buttons: [
        {
          text: 'Edit ',
          handler: () => {
            this.editScript(id, description, command, perm);
          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.removeScript(id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm(id) {
    const confirm = this.alertCtrl.create({
      title: 'Remove the server',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeScript(id)
          }
        }
      ]
    });
    confirm.present();
  }

  removeScript(id){
    var loader = presentLoading(this.loadingCtrl);
    this.runService.deleteScript(this.shareDataService.serverDomain, this.shareDataService.token, id).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.reloadScript(null);
      } else {
        if(res.code == "401"){
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        }
        alertMessage(this.toastCtrl,res.message, "red");
      }
    },
    error => {
      loader.dismiss();
      alertMessage(this.toastCtrl, "Conexion Error", "red");
      this.appCtrl.getRootNav().setRoot(ListServersPage);
    });
  }
}
