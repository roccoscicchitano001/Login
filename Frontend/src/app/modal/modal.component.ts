import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AccountService, AlertService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '@app/_services';
import { UploadService } from '@app/_services';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit{

  account = this.accountService.accountValue;
  accounts : any[];

  fileToUpload: File | null = null;
  fileName:string | null = null;
  form: FormGroup;
  loading = false;
  response: any;


  constructor(public modalRef: MdbModalRef<ModalComponent>,private accountService: AccountService, private fileService:FileService,private uploadService:UploadService, private formBuilder: FormBuilder,private alertService: AlertService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(accounts => this.accounts = accounts);
    
    this.form = this.formBuilder.group({
      emailMedico: this.account.email,
      emailPaziente:[null],
      ifFile:[''],
      nomeFile:this.fileName
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileName = files.item(0).name;
  }

  postFile() {

    if (this.form.controls.emailPaziente.value==null&&this.fileToUpload==null)
      return alert ("É necessario inserire i dati richiesti!");

    if (this.form.controls.emailPaziente.value==null)
      return alert ("É necessario indicare l'indirizzo email dell'utente di riferimento!")

    if (this.fileToUpload==null)
      return alert("É necessario inserire il file!")

    let formData = new FormData();
    formData.append("file", this.fileToUpload);

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/file/upload",false)

    req.send(formData);

    if (req.responseText!==""&&req.status==200){
      this.valorizzaUtente(req.responseText);
    }
    else{
      return alert("Errore nel caricamento del file: "+req.statusText);
    }
    
  }

  valorizzaUtente(id){
    
    this.form.controls.ifFile.setValue(id);
    this.form.controls.nomeFile.setValue(this.fileName);

    this.fileService.create(this.form.value).pipe(first()).subscribe({next: () => {
      this.alertService.success('Caricamento del file avvenuto con successo!', { keepAfterRouteChange: true });
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/modal']);
    }); 
    },error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
    this.modalRef.close();
  }

  
}
