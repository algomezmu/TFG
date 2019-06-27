import { Component } from "@angular/core";
import { NavController, ToastController, ActionSheetController, AlertController, LoadingController, Platform } from "ionic-angular";
import { PingService } from "../../services/ping.service";
import { RegisterServerPage } from "../register-server/register-server";
import { ServerMenuPage } from "../server-menu/server-menu";
import { Storage } from '@ionic/storage';
import { LoginService } from "../../services/login.service";
import { ShareDataService } from "../../utils/shareData";
import { presentLoading } from '../../utils/lib';
import { FcmProvider } from '../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-list-server',
  templateUrl: 'list-servers.html'
})
export class ListServersPage {
  // list of trips
  public serverList: any;

  constructor(public nav: NavController, private storage: Storage,
    public toastCtrl: ToastController, public ping: PingService, public actionSheetCtrl: ActionSheetController,
    public loginService: LoginService, public loadingCtrl: LoadingController, 
    public shareData: ShareDataService, public alertCtrl: AlertController,
    public platform: Platform, public fcm: FcmProvider) {
    // set sample data
    //this.trips = tripService.getAll();
    this.refreshServers(null);
    this.connectFirebase();
  }

  connectFirebase(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      
        if( this.shareData.fcmListener){
          this.shareData.fcmListener.unsubscribe();
        }
        // Get a FCM token
        this.fcm.getToken();
  
        // Listen to incoming messages
        this.shareData.fcmListener = this.fcm.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = this.toastCtrl.create({
              message: msg["_body"].toString(),
              duration: 3000
            });
            toast.present();
          })
        )
          .subscribe()
    });
  }

  refreshServers(refresher) {
    this.serverList = [];
    this.storage.forEach((value, key, index) => {
      this.ping.getPing(JSON.parse(value).serverDomain).subscribe(
        data => {
          if(data >0){
            this.serverList.push({ serverName: key, img: "assets/img/server-list/server.png", ping: data });
          }else{
            this.serverList.push({ serverName: key, img: "assets/img/server-list/server.png", ping: 0 });
          }
          if(refresher){
            refresher.complete();
          }
        },
        error => {
          this.serverList.push({ serverName: key, img: "assets/img/server-list/server.png", ping: -1 });
        }
      );
    })
    /*
    this.secureStorage.create('server_list')
      .then((storage: SecureStorageObject) => {
        storage.keys()
          .then(
            data => this.loadServerList(data),
            error => this.alertMessage(error, "red")
          );
      });
      */
  }

  loadServerList(listKeys) {
    /*
    listKeys.forEach(element => {
      this.secureStorage.create('server_list')
        .then((storage: SecureStorageObject) => {
          storage.get(element)
            .then(
              data => {
                //"assets/img/trip/thumb/trip_5.jpg"
                console.log(data);
                this.ping.getPing(JSON.parse(data).serverDomain).subscribe(
                  data => {
                    this.serverList.push({ serverName: element, img: "assets/img/server-list/server.png", ping: data });
                  },
                  error => {
                    this.serverList.push({ serverName: element, img: "assets/img/server-list/server.png", ping: -1 });
                  }
                );
              },
              error => this.alertMessage(error, "red")
            );
        });
    });
    */
  }

  alertMessage(message, type) {
    var css = "alert_red";
    if (type === "green") {
      css = "alert_green";
    }
    let alert = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: css,
      closeButtonText: 'Ok',
      showCloseButton: true
    });

    alert.present();
  }

  removeServer(serverName) {
    this.serverList = [];
    this.storage.remove(serverName);
    this.refreshServers(null);
    /*
    this.secureStorage.create('server_list')
      .then((storage: SecureStorageObject) => {
        storage.remove(serverName)
          .then(
            data => this.refreshServers(),
            error => this.alertMessage(error, "red")
          );
      });
      */
  }

  presentActionSheet(serverName) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Server Options',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.showConfirm(serverName);
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

  showConfirm(serverName) {
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
            this.removeServer(serverName);
          }
        }
      ]
    });
    confirm.present();
  }

  // view trip detail
  viewDetail(id) {
    this.storage.get(id).then((server) => {
      server = JSON.parse(server);
      var loader = presentLoading(this.loadingCtrl);
      this.loginService.login(server.serverDomain, server.username, server.password.toString()).subscribe(
        data => {
          loader.dismiss();
          if (data.status == "error" || data.error == "errorConexion") {
            if(data.error == "errorConexion")
              data.message = "Connexion error"
            this.alertMessage(data.message, "red");
          } else {
            this.shareData.token = data.token;
            this.shareData.serverName = id;
            this.shareData.serverDomain = server.serverDomain;
            this.shareData.rol = data.rol;
            this.nav.push(ServerMenuPage);
          }
        },
        error => {
          this.alertMessage("Connexion error", "red");
          loader.dismiss();
        }
      );
    });
    
    //this.nav.push(ServerMenuPage, { id: id });
  }

  addServer() {
    this.nav.push(RegisterServerPage);
  }
}
