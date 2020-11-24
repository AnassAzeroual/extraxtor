import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { Observable, of } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { GetByUrlService } from 'src/app/services/get-by-url.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as copy from 'copy-text-to-clipboard';


@Component({
  selector: 'app-get-by-url',
  templateUrl: './get-by-url.component.html',
  styleUrls: ['./get-by-url.component.scss']
})
export class GetByUrlComponent implements OnInit {
  // emails:any = [];
  fileUrl;
  dataHTML: any;
  url: string;
  showSpeener: boolean = false
  urlForm: any;
  emailsContainer: any = ''
  downloadable: boolean = false
  disableZone: boolean = false
  tableEmails: any[];
  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private getByUrlService: GetByUrlService) {
    this.urlForm = new FormGroup({
      url: new FormControl('', Validators.required),
      emails: new FormControl('')
    });
  }

  ngOnInit() {
    this.getByUrl()
  }

  /* ---------------------------- checkEmailsFormat --------------------------- */

  checkEmailsFormat(data: any): boolean {
    console.log(data);

    //* hide BTN Download File
    (data.length > 0) ? this.downloadable = true : this.downloadable = false;
    //* check if data empty
    if (data.length <= 0) {
      return false;
    }
    this.emailsContainer = "";
    this.tableEmails = [];
    let emails: any = ""
    //* declare new container of data
    emails = data
    //* regex split data
    emails = emails.split(/[,/+*'`$%!><^:;=&~|\\" "\n\t]/);

    //* declare regex to check emails
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //* check emails format and deplicated emails
    emails.forEach(e => {
      if (re.test(String(e).toLowerCase())) {
        if (this.checkEmailsDeplicat(e)) {
          this.emailsContainer += e.toLowerCase() + ",";
          this.tableEmails.push({
            email: e
          })
        }
      }
    });
    //* show/hide zone emails
    this.disableZone = (this.emailsContainer.indexOf("@") >= 0) ? true : false

    this.urlForm.controls['emails'].setValue(this.emailsContainer)
    this.showSpeener = false
  }

  /* --------------------------- checkEmailsDeplicat -------------------------- */

  checkEmailsDeplicat(email: string): boolean {
    //* check if email deplicated
    if (this.emailsContainer.indexOf(email) >= 0) {
      this.notifay(email, "warn", "Email deplicated was removed");
      return false;
    }

    return true;
  }

  /* -------------------------------- notifay --------------------------------- */

  notifay(details: string, status: string, message: string) {
    this.messageService.add({
      severity: status,
      summary: message,
      detail: details
    });
  }



  //**********************************************/
  downlad() {
    //* check if empty result
    if (this.emailsContainer.length > 0) {
      const blob = new Blob([this.emailsContainer], { type: 'application/octet-stream' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    }
  }

  //*********************************************** */
  getByUrl() {
    if (this.urlForm.invalid) return
    this.showSpeener = true
    this.urlForm.controls['emails'].setValue('')

    let regxURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    if (regxURL.test(this.urlForm.get('url').value)) {
      this.getByUrlService.getByURL(this.urlForm.get('url').value)
        .subscribe(
          res => {
            this.checkEmailsFormat(res)
          }
        )
    }
    else {
      this.showSpeener = false
      this.urlForm.controls['url'].setValue('')
      this.notifay('Error invalid URL format', 'error', 'Error')
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                    Copy                                    */
  /* -------------------------------------------------------------------------- */
  copy(data) {
    console.log(data);
    copy(data)
  }
}
