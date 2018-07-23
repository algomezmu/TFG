export function converToMB(bytes: number): number{
    return Number((bytes/1048576).toFixed(2));
}

export function alertMessage(toastCtrl, message, type) {
    var css = "alert_red";
    if (type === "green") {
      css = "alert_green";
    }
    let alert = toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: css,
      closeButtonText: 'Ok',
      showCloseButton: true
    });

    alert.present();
  }

  export function presentLoading(loadingCtrl) {
    let loader = loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }