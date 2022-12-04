import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AccountService } from '@app/_services';
import { FileService } from '@app/_services';
import { UploadService } from '@app/_services';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit{
  account = this.accountService.accountValue;
  accounts : any[];

  fileToUpload: File | null = null;


  constructor(public modalRef: MdbModalRef<ModalComponent>,private accountService: AccountService, private fileService:FileService,private uploadService:UploadService) {}

  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(accounts => this.accounts = accounts);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  postFile() {
    let formData = new FormData();
    formData.append("file", this.fileToUpload);

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/file/upload")

    req.onload = function () {
        console.log(req.responseText);

        let response = req.responseText;

        if (response !== null) {
            let downloadUrl = "http://localhost:8080/file/download/" + response;
            console.log(downloadUrl);
        } else {
            alert("Error Occured! No file returned");
        }
    }

    req.send(formData);

    this.modalRef.close();
}

}
