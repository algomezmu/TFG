import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { ShareDataService } from "../utils/shareData";

import { PingService } from "../services/ping.service";
import { LoginService } from "../services/login.service";
import { LookService } from "../services/look.service";
import { ConfigService } from "../services/config.service";
import { RunService } from "../services/run.service";
import { UsersService } from "../services/users.service";

import { MyApp } from "./app.component";

import { SettingsPage } from "../pages/settings/settings";
import { LoginPage } from "../pages/login/login";
import { NotificationsPage } from "../pages/notifications/notifications";
import { RegisterServerPage } from "../pages/register-server/register-server";
import { ServerMenuPage } from "../pages/server-menu/server-menu";
import { SearchLocationPage } from "../pages/search-location/search-location";
import { ListServersPage } from "../pages/list-servers/list-servers";
import { StatusPage } from "../pages/server-menu-pages/status/status";
import { CPUPage } from "../pages/server-menu-pages/cpu/cpuMain";
import { CpuActualPage } from "../pages/server-menu-pages/cpu/cpuTab1/cpuActual";
import { CpuHistoryPage } from "../pages/server-menu-pages/cpu/cpuTab2/cpuHistory";
import { MemoryPage } from "../pages/server-menu-pages/memory/memoryMain";
import { MemoryActualPage } from "../pages/server-menu-pages/memory/memoryTab1/memoryActual";
import { MemoryHistoryPage } from "../pages/server-menu-pages/memory/memoryTab2/memoryHistory";
import { NetworkingPage } from "../pages/server-menu-pages/networking/networkingMain";
import { NetworkingActualPage } from "../pages/server-menu-pages/networking/networkingTab1/networkingActual";
import { NetworkingHistoryPage } from "../pages/server-menu-pages/networking/networkingTab2/networkingHistory";
import { DiscsPage } from "../pages/server-menu-pages/discs/discsMain";
import { DiscsActualPage } from "../pages/server-menu-pages/discs/discsTab1/discsActual";
import { EventsListPage } from "../pages/server-menu-pages/events/event-page-1/event-page-1";
import { EventsCreatePage } from "../pages/server-menu-pages/events/event-page-2/event-page-2";
import { ScriptsListPage } from "../pages/server-menu-pages/scripts/scripts-page-1/scripts-page-1";
import { ScriptsCreatePage } from "../pages/server-menu-pages/scripts/scripts-page-2/scripts-page-2";
import { ScriptsLaunchPage } from "../pages/server-menu-pages/scripts/scripts-page-3/scripts-page-3";
import { ConfigPage } from "../pages/server-menu-pages/config/config";
import { UsersListPage } from "../pages/server-menu-pages/users/users-page-1/users-page-1";
import { UserCreatePage } from "../pages/server-menu-pages/users/users-page-2/users-page-2";

import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmProvider } from '../providers/fcm/fcm';


const firebase = {
  // your firebase web config
    apiKey: "AIzaSyCRp-C6RiMH_1r9cquHZMc0gSEnzIJQQYE",
    authDomain: "tfg-uni.firebaseapp.com",
    databaseURL: "https://tfg-uni.firebaseio.com",
    projectId: "tfg-uni",
    storageBucket: "tfg-uni.appspot.com",
    messagingSenderId: "795676300412"
 }

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    LoginPage,
    NotificationsPage,
    RegisterServerPage,
    SearchLocationPage,
    ServerMenuPage,
    ListServersPage,
    CPUPage,
    CpuActualPage,
    CpuHistoryPage,
    MemoryPage,
    MemoryActualPage,
    MemoryHistoryPage,
    NetworkingPage,
    NetworkingActualPage,
    NetworkingHistoryPage,
    DiscsPage,
    DiscsActualPage,
    StatusPage,
    ConfigPage,
    EventsListPage,
    EventsCreatePage,
    UsersListPage,
    UserCreatePage,
    ScriptsListPage,
    ScriptsCreatePage,
    ScriptsLaunchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ChartsModule,
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    LoginPage,
    NotificationsPage,
    RegisterServerPage,
    ServerMenuPage,
    SearchLocationPage,
    ListServersPage,
    CPUPage,
    CpuActualPage,
    CpuHistoryPage,
    MemoryPage,
    MemoryActualPage,
    MemoryHistoryPage,
    NetworkingPage,
    NetworkingActualPage,
    NetworkingHistoryPage,
    DiscsPage,
    DiscsActualPage,
    StatusPage,
    ConfigPage,
    EventsListPage,
    EventsCreatePage,
    UsersListPage,
    UserCreatePage,
    ScriptsListPage,
    ScriptsCreatePage,
    ScriptsLaunchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    LoginService,
    PingService,
    HTTP,
    ShareDataService,
    LookService,
    ConfigService,
    RunService,
    UsersService,
    Firebase,
    FcmProvider
  ]
})

export class AppModule {
}
