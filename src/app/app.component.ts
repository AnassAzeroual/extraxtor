import { Component } from '@angular/core';
import { MessageService } from "primeng/api";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'extractor';
  emails:any = [];
constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

    /* ---------------------------- checkEmailsFormat --------------------------- */

    checkEmailsFormat(): boolean {
      //* check if input of email empty
      if (this.emails.length <= 0) {
        return false;
      }
  
      //* declare new container of emails and init input
      let emails: any = this.emails;
      this.emails = "";
      //* remove all spaces and create table
      //emails = emails.replace(/\s/g, "");
  
      emails = emails.split(/[,/+*'`$%!><^:;=&~|\\" "\n\t]/);
  
      //* declare regx to check emails
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      //* check emails format and deplicated emails
      emails.forEach(e => {
        if (re.test(String(e).toLowerCase())) {
          if (this.checkEmailsDeplicat(e)) {
            this.emails += e.toLowerCase() + ",";
          }
        } else {
          if (e.indexOf("@") >= 0) {
            this.notifay(e, "warn", "Email no valide format!");
          }
        }
      });
  
    }
  
    /* --------------------------- checkEmailsDeplicat -------------------------- */
  
    checkEmailsDeplicat(email: string): boolean {
      //* check if email deplicated
      if (this.emails.indexOf(email) >= 0) {
        this.notifay(email, "warn", "Email deplicated was removed");
        return false;
      }
  
      return true;
    }

    /* -------------------------------- notifay --------------------------------- */

  notifay(email: string, status: string, message: string) {
    // this.messageService.add({
    //   severity: status,
    //   summary: message,
    //   detail: email
    // });
  }



  //********************************************* */
  downlad(){
//* check if empty result
if (this.emails) {
  this.dynamicDownloadTxt()
}
  }
  fakeValidateUserData() {
    return of(this.emails);
  }

  //

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'extractor.ma_List_emails.txt',
        text: res
      });
    });

  }

  // dynamicDownloadJson() {
  //   this.fakeValidateUserData().subscribe((res) => {
  //     this.dyanmicDownloadByHtmlTag({
  //       fileName: 'My Report.json',
  //       text: JSON.stringify(res)
  //     });
  //   });
  // }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
