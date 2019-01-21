import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from "../pages/login/login";
import { ListServersPage } from "../pages/list-servers/list-servers";

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

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Server List', component: ListServersPage, icon: 'home'},
      {title: 'Local Weather', component: ListServersPage, icon: 'partly-sunny'}
    ];      
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
  this.nav.setRoot(page.component);
}

logout() {
  this.nav.setRoot(LoginPage);
}

}
