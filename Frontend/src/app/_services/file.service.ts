import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { File } from '@app/_models';

const baseUrl = `${environment.apiUrl}/files`;


@Injectable({ providedIn: 'root' })
export class FileService {
    private fileSubject: BehaviorSubject<File>;
    public file: Observable<File>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.fileSubject = new BehaviorSubject<File>(null);
        this.file = this.fileSubject.asObservable();
    }

    public get fileValue(): File {
        return this.fileSubject.value;
    }

    getAll() {
        return this.http.get<File[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<File>(`${baseUrl}/${id}`);
    }

    create(params:File) {
        return this.http.post(baseUrl, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
