import { Component, ViewChild } from "@angular/core";
import { NavController, App, ToastController, LoadingController, ActionSheetController, AlertController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { EventsCreatePage } from "../../../../pages/server-menu-pages/events/event-page-2/event-page-2";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-event-1',
  templateUrl: 'event-page-1.html'
})
export class EventsListPage {
  //List Events
  eventList: any;

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
    public runService: RunService, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    //this.reloadEvents(null);
  }

  ionViewWillEnter() {
    this.reloadEvents(null);
  }

  reloadEvents(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    let fcm = this.shareDataService.tokenFCM;
    let event = {
      fcm
    }
    this.runService.getEvents(this.shareDataService.serverDomain, this.shareDataService.token, event).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.eventList = res.message;
      } else {
        if (res.code == "401") {
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        }
        alertMessage(this.toastCtrl, res.message, "red");
        this.eventList = [];
      }
      
      if (refresher) {
        refresher.complete();
      }
    },
      error => {
        loader.dismiss();
        alertMessage(this.toastCtrl, "Conexion Error", "red");
        this.appCtrl.getRootNav().setRoot(ListServersPage);
      });
  }

  addEvent() {
    this.nav.push(EventsCreatePage);
  }

  editEvent(id, command, launchType, launchTime, description, fcm, interfaceNet, interInOut) {
    this.nav.push(EventsCreatePage, {id, command, launchType, launchTime, description, fcm, interfaceNet, interInOut});
  }

  presentActionSheet(id, command, launchType, launchTime, description, fcm, interfaceNet, interInOut) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Event Options',
      buttons: [
        {
          text: 'Edit ',
          handler: () => {
            this.editEvent(id, command, launchType, launchTime, description, fcm, interfaceNet, interInOut);
          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.removeEvent(id);
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
            this.removeEvent(id)
          }
        }
      ]
    });
    confirm.present();
  }

  removeEvent(id) {
    var loader = presentLoading(this.loadingCtrl);
    this.runService.deleteEvents(this.shareDataService.serverDomain, this.shareDataService.token, id).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.reloadEvents(null);
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
