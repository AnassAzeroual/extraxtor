import { Component, OnInit } from '@angular/core';
import { GetByUrlService } from 'src/app/services/get-by-url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-get-by-text',
  templateUrl: './get-by-text.component.html',
  styleUrls: ['./get-by-text.component.scss']
})
export class GetByTextComponent implements OnInit {
  emails:any = [];
  fileUrl;
  dataHTML: any;
  url: string;
  showSpeener:boolean = false
  downloadable:boolean = false
  constructor(private getByUrlService:GetByUrlService,private sanitizer: DomSanitizer,private messageService: MessageService) { }

  ngOnInit() {}
/* -------------------------------- notifay --------------------------------- */

  notifay(email: string, status: string, message: string) {
    this.messageService.add({
      severity: status,
      summary: message,
      detail: email
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

/* ---------------------------- checkEmailsFormat --------------------------- */

  checkEmailsFormat(data:any): boolean {
    if (data.length > 0) {
      this.emails = data
    }
    //* check if input of email empty
    if (this.emails.length <= 0) {
      return false;
    }

    //* declare new container of emails and init input
    let emails: any = this.emails;
    this.emails = [];

    //* regx split
    emails = emails.split(/[,/+*'`$%!><^:;=&~|\\" "\n\t]/);

    //* declare regx to check emails
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //* check emails format and deplicated emails
    emails.forEach(e => {
      if (re.test(String(e).toLowerCase())) {
        if (this.checkEmailsDeplicat(e)) {
          this.emails += e.toLowerCase() + ",";
        }
      }
    });
    //* hide BTN Download File
    (this.emails.length > 0) ? this.downloadable = true : this.downloadable = false;
    //* hide speener
    this.showSpeener = false
  }

/* -------------------------------- getByTEXT -------------------------------- */

  getByTEXT()
{
  this.showSpeener = true
  this.checkEmailsFormat(this.emails)
}

/* --------------------------------- downlad -------------------------------- */

downlad(){
  if (this.emails.length > 0) {
    const blob = new Blob([this.emails], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}

}
