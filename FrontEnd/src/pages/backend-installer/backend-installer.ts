import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController} from "ionic-angular";
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';


@Component({
  selector: 'page-backend-installer',
  templateUrl: 'backend-installer.html'
})
export class BackendInstallerPage {

  private term: Terminal;
  // this finds the #terminal element, after view init
  @ViewChild('terminal' ) terminal: ElementRef;

  constructor(public navCtrl:NavController) {
/*
      this.term = new Terminal({
          cursorBlink: true,
          //useStyle: true,
          scrollback: 60,
          rows: 10,
      });

      // this is just simple echo
      this.term.on('key', (key, ev) => {
          console.log(key.charCodeAt(0));
          if (key.charCodeAt(0) == 13)
              this.term.write('\n');
          this.term.write(key);
      });
*/
  }

  // getting the nativeElement only possible after view init
  ngAfterViewInit() {
      //SSH server detail to be connected
        var sshconfig2 = {
            host: '192.168.1.3',
            username: 'ubuntu',
            password: 'mysecret2'
        }
        //window.sshClient.sshVerifyHost(function(success){...},function(error){...},hostname,port,saveHostKey)
/*
      // this now finds the #terminal element
      this.term.open( this.terminal.nativeElement);

      // calling fit is not quite working
      // uses the obscure ion-textbox, which does not really exist, but changes the font size
      // the number of rows will determine the size of the terminal screen
      fit(this.term);
      this.term.writeln('Welcome to xterm.js');
  */
    }
}
