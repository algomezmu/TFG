import { Component, ViewChild } from "@angular/core";
import { App, NavController, ToastController, LoadingController, NavParams } from "ionic-angular";
import { ShareDataService } from "../../../../utils/shareData";
import { RunService } from "../../../../services/run.service";
import { ListServersPage } from "../../../../pages/list-servers/list-servers";
import { alertMessage } from "../../../../utils/lib";
import { presentLoading } from "../../../../utils/lib";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";

@Component({
  selector: 'page-event-2',
  templateUrl: 'event-page-2.html'
})
export class EventsCreatePage {

  public registerForm;
  public id;

  constructor(public appCtrl: App, public nav: NavController, private navParams: NavParams, public shareDataService: ShareDataService,
    public runService: RunService, private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    this.id = navParams.get('id');
    let lT = navParams.get('launchType');
    let statusSymbol;
    if (!lT) {
      lT = "date";
    } else if (lT.slice(-1) == ">" || lT.slice(-1) == ">") {
      statusSymbol = lT.slice(-1);
      lT = lT.slice(0, lT.length - 1);
    }

    let notify = this.checkFCM(this.navParams.get('fcm'));

    this.registerForm = this.formBuilder.group({
      command: [navParams.get('command')],
      launchType: [lT, Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      dateProgrammed: [navParams.get('launchTime'), Validators.compose([Validators.required])],
      interfaceNet: [navParams.get('interfaceNet')],
      description: [navParams.get('description'), Validators.compose([Validators.maxLength(100)])],
      statusSymbol: [statusSymbol, Validators.pattern('[><]')],
      interInOut:  [navParams.get('interInOut')],
      notify: [notify]
    });
  }

  checkFCM(fcmString){
    if (fcmString) {
      let aux = fcmString.split(",");
      let res = aux.indexOf(this.shareDataService.tokenFCM);
      if(res != -1){
        return true;
      }
      else{
        return false;
      }
    } else {
      return false;
    }
  }

  saveEvent() {
    var next = true;

    var loader = presentLoading(this.loadingCtrl);

    var command = this.registerForm.controls['command'].value;
    var launchType = this.registerForm.controls['launchType'].value;
    var launchTime = this.registerForm.controls['dateProgrammed'].value;
    var description = this.registerForm.controls['description'].value;
    var statusSymbol = this.registerForm.controls['statusSymbol'].value;
    var notify = this.registerForm.controls['notify'].value;
    var fcmString = this.navParams.get('fcm');
    var interfaceNet = this.registerForm.controls['interfaceNet'].value;
    var interInOut =this.registerForm.controls['interInOut'].value;

    var message;


    if (launchType == "cpu" || launchType == "mem" || (launchType == "net" && interfaceNet)) {
      if (!isNaN(Number(launchTime)) && (statusSymbol == ">" || statusSymbol == "<")) {
        launchType = launchType + statusSymbol;
      } else {
        next = false;
        message = "GHz/Mb is not a Number or Check Options input";
      }
    }

    if (!command && !notify) {
      next = false;
      message = "Command needed";
    }

    if (next) {
      let fcm;
      if(notify){
        fcm = this.shareDataService.tokenFCM;
      }

      let event = {
        id: this.id,
        command,
        launchType,
        launchTime,
        description,
        fcm,
        notify,
        interfaceNet,
        interInOut
      }
      this.runService.saveEvents(this.shareDataService.serverDomain, this.shareDataService.token, event).subscribe(res => {
        loader.dismiss();
        if (res.status != "error") {
          alertMessage(this.toastCtrl, "Saved", "green");
          this.nav.pop();
        }else{
          alertMessage(this.toastCtrl, "Error", res.message);
        }
      },
        error => {
          loader.dismiss();
          alertMessage(this.toastCtrl, "Conexion Error", "red");
          this.appCtrl.getRootNav().setRoot(ListServersPage);
        });
    } else {
      loader.dismiss();
      alertMessage(this.toastCtrl, message, "red");
    }

  }
}
