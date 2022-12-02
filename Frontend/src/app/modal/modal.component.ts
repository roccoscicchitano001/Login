import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AccountService } from '@app/_services';
import { FileService } from '@app/_services';
import { UploadService } from '@app/_services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

  account = this.accountService.accountValue;
  file: object;
  upload: object;
  accounts : any[];

  constructor(public modalRef: MdbModalRef<ModalComponent>,private accountService: AccountService, private fileService:FileService,private uploadService:UploadService) {}
}
