import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { ActivityService } from "../services/activity-service";
import { TripService } from "../services/trip-service";
import { PingService } from "../services/ping.service";
import { WeatherProvider } from "../services/weather";
import { LoginService } from "../services/login.service";

import { MyApp } from "./app.component";

import { SettingsPage } from "../pages/settings/settings";
import { CheckoutTripPage } from "../pages/checkout-trip/checkout-trip";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { NotificationsPage } from "../pages/notifications/notifications";
import { RegisterServerPage } from "../pages/register-server/register-server";
import { SearchLocationPage } from "../pages/search-location/search-location";
import { TripDetailPage } from "../pages/trip-detail/trip-detail";
import { ListServersPage } from "../pages/list-servers/list-servers";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { SecureStorage } from '@ionic-native/secure-storage';
// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterServerPage,
    SearchLocationPage,
    TripDetailPage,
    ListServersPage
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
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterServerPage,
    SearchLocationPage,
    TripDetailPage,
    ListServersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    LoginService,
    PingService,
    SecureStorage
  ]
})

export class AppModule {
}
