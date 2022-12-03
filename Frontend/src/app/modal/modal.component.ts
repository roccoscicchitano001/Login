import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AccountService } from '@app/_services';
import { FileService } from '@app/_services';
import { UploadService } from '@app/_services';
import { Upload } from '@app/_models';
import { File } from '@app/_models';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit{
  form: FormGroup;
  formFile: FormGroup;
  account = this.accountService.accountValue;
  accounts : any[];
  upload: Upload;
  file: File;


  constructor(public modalRef: MdbModalRef<ModalComponent>,private accountService: AccountService, private fileService:FileService,private uploadService:UploadService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(accounts => this.accounts = accounts);
    
    this.form = this.formBuilder.group({
      emailPaziente: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  save(){
    if (this.form.controls.emailPaziente.value==null&&this.form.controls.file.value==null){
      return alert("Inserire elementi necessari!");
    }

    if (this.form.controls.emailPaziente.value==null){
      return alert("E' necessario inserire l'utente di riferimento!");
    }

    if (this.form.controls.file.value==null){
      return alert("E' necessario inserire il file da caricare!");
    }

    this.uploadFile();
    
    return this.modalRef.close();
  }

  uploadFile(){
    this.file=new File(this.form.controls.emailPaziente.value,this.account.email,"12222jjj",this.form.controls.file.value.name);
    this.fileService.create(this.file).pipe(first());
  }



}
