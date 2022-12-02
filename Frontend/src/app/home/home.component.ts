import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { FileService } from '@app/_services';
import { ModalComponent } from '@app/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account = this.accountService.accountValue;
    files: any[];
    i: number;
    accounts : any[];

    modalRef: MdbModalRef<ModalComponent> | null = null;


    constructor(private accountService: AccountService, private fileService:FileService, private modalService: MdbModalService) { }

    ngOnInit() {
        this.fileService.getAll()
            .pipe(first())
            .subscribe(files => this.files = files);

        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    deleteFile(id: string) {
        const account = this.files.find(x => x.id === id);
        this.fileService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.files = this.files.filter(x => x.id !== id) 
            });
    }

    getPaziente(emailPaziente:string){
        this.i=0;
        for (; this.i<Object.keys(this.accounts).length;this.i++){
            if (this.accounts[this.i].email===emailPaziente){
                return this.accounts[this.i].firstName + " " + this.accounts[this.i].lastName
            }
        }
    }

    getMedico(emailMedico:string){
        this.i=0;
        for (; this.i<Object.keys(this.accounts).length;this.i++){
            if (this.accounts[this.i].email===emailMedico){
                return this.accounts[this.i].firstName + " " + this.accounts[this.i].lastName
            }
        }
    }

    openModal() {
        this.modalRef = this.modalService.open(ModalComponent)
    }
}