import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, AlertController, LoadingController } from "ionic-angular";
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from "../pages/login/login";
import { ListServersPage } from "../pages/list-servers/list-servers";
import { ShareDataService } from "../utils/shareData";
import { LoginService } from "../services/login.service";
import { presentLoading } from '../utils/lib';
import { alertMessage } from '../utils/lib';
import { ServerMenuPage } from "../pages/server-menu/server-menu";
import { Storage } from '@ionic/storage';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListServersPage;

  appMenuItems: Array<any>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public toastCtrl: ToastController,
    public storage: Storage,
    public shareData: ShareDataService,
    public alertCtrl: AlertController,
    public loginService: LoginService,
    public loadingCtrl: LoadingController,
  ) {
    this.initializeApp();

    this.appMenuItems = [
      { title: 'Server List', component: ListServersPage, icon: 'home' },
    ];
    this.storage.forEach((value, key, index) => {
      this.appMenuItems.push({ title: key, icon: 'partly-sunny' });
    });      
}

initializeApp() {
  this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    //*** Control Splash Screen
    //this.splashScreen.show();
    //this.splashScreen.hide();

    //*** Control Status Bar
    //this.statusBar.styleDefault();
    //this.statusBar.overlaysWebView(false);

    //*** Control Keyboard
    this.keyboard.disableScroll(true);
  });
}

openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  console.log(page.title );
  if(page.title === "Server List"){
    this.nav.setRoot(ListServersPage);
  }else{
    this.storage.get(page.title).then((server) => {
      server = JSON.parse(server);
      var loader = presentLoading(this.loadingCtrl);
      this.loginService.login(server.serverDomain, server.username, server.password.toString()).subscribe(
        data => {
          loader.dismiss();
          if (data.status == "error" || data.error == "errorConexion") {
            if (data.error == "errorConexion")
              data.message = "Connexion error"
              alertMessage(this.toastCtrl, data.message, "red");
          } else {
            this.shareData.token = data.token;
            this.shareData.serverName = page.title;
            this.shareData.serverDomain = server.serverDomain;
            this.nav.push(ServerMenuPage);
          }
        },
        error => {
          alertMessage(this.toastCtrl, "Connexion error", "red");
          loader.dismiss();
        }
      );
    });
  }
}

logout() {
  this.nav.setRoot(LoginPage);
}

}
