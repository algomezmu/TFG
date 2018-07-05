import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { TripService } from "../../services/trip-service";
import { PingService } from "../../services/ping.service";
import { TripDetailPage } from "../trip-detail/trip-detail";
import { RegisterServerPage } from "../register-server/register-server";
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Component({
  selector: 'page-list-server',
  templateUrl: 'list-servers.html'
})
export class ListServersPage {
  // list of trips
  public serverList: any;

  constructor(public nav: NavController, public tripService: TripService, private secureStorage: SecureStorage,
     public toastCtrl: ToastController, public ping: PingService) {
    // set sample data
    //this.trips = tripService.getAll();
    this.refreshServers();
  }

  refreshServers(){
    this.serverList = [];
    this.secureStorage.create('server_list')
    .then((storage: SecureStorageObject) => {
        storage.keys()
        .then(
          data => this.loadServerList(data),
          error => this.alertMessage(error, "red")
      );
    });
  }

  loadServerList(listKeys){
    listKeys.forEach(element => {
      this.secureStorage.create('server_list')
      .then((storage: SecureStorageObject) => {
          storage.get(element)
          .then(
            data => {
              //"assets/img/trip/thumb/trip_5.jpg"
              this.ping.getPing(JSON.parse(data).serverDomain).subscribe(
                data => {
                  this.serverList.push({ serverName: element, img: "assets/img/server-list/server.png", ping: data});
                },
                error => {
                  this.serverList.push({ serverName: element, img: "assets/img/server-list/server.png", ping: -1});
                }
              );
            },
            error => this.alertMessage(error, "red")
        );
      });
    });
  }

  alertMessage(message, type){
    var css = "alert_red";
    if(type === "green"){
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

  // view trip detail
  viewDetail(id) {
    console.log(id);
    this.nav.push(TripDetailPage, { id: id });
  }

  addServer() {
    this.nav.push(RegisterServerPage);
  }
}
