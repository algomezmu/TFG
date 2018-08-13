import { Component, ViewChild } from "@angular/core";
import { NavController, App, ToastController, LoadingController, ActionSheetController, AlertController } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { UsersService } from "../../../../services/users.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { UserCreatePage } from "../../../../pages/server-menu-pages/users/users-page-2/users-page-2";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";

@Component({
  selector: 'page-user-1',
  templateUrl: 'users-page-1.html'
})
export class UsersListPage {
  //List Events
  userList: any;

  constructor(public appCtrl: App, public nav: NavController, public shareDataService: ShareDataService,
     public usersService: UsersService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, 
     public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.reloadUsers(null);
  }

  ionViewWillEnter() {
    this.reloadUsers(null);
  }

  reloadUsers(refresher) {
    var loader = presentLoading(this.loadingCtrl);
    this.usersService.getUsers(this.shareDataService.serverDomain, this.shareDataService.token).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.userList = res.message;
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

  addUser(){
    this.nav.push(UserCreatePage);
  }
 
  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'User Options',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.showConfirm(id);
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
      title: 'Remove the user',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeUser(id)
          }
        }
      ]
    });
    confirm.present();
  }

  removeUser(id){
    var loader = presentLoading(this.loadingCtrl);
    this.usersService.deleteUser(this.shareDataService.serverDomain, this.shareDataService.token, id).subscribe(res => {
      loader.dismiss();
      if (res.status != "error") {
        this.reloadUsers(null);
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
