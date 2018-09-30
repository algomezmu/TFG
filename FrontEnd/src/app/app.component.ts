import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from "../pages/login/login";
import { ListServersPage } from "../pages/list-servers/list-servers";
import { tap } from 'rxjs/operators';

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
    public fcm: FcmProvider,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    this.appMenuItems = [
      { title: 'Home', component: ListServersPage, icon: 'home' },
      { title: 'Local Weather', component: ListServersPage, icon: 'partly-sunny' }
    ];
    
    platform.ready().then(() => {

      // Get a FCM token
      fcm.getToken()

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg["_body"].toString(),
            duration: 3000
          });
          toast.present();
        })
      )
        .subscribe()
    });
      
}

initializeApp() {
  this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.

    //*** Control Splash Screen
    // this.splashScreen.show();
    // this.splashScreen.hide();

    //*** Control Status Bar
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);

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
