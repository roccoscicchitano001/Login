import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { FileService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account = this.accountService.accountValue;
    files: any[];
    i: number;
    accounts : any[];

    constructor(private accountService: AccountService, private fileService:FileService) { }

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
}