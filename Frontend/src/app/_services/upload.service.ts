import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Upload } from '@app/_models';

const baseUrl = `${environment.fileUrl}/file`;


@Injectable({ providedIn: 'root' })
export class UploadService {
    private fileSubject: BehaviorSubject<Upload>;
    public file: Observable<Upload>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.fileSubject = new BehaviorSubject<Upload>(null);
        this.file = this.fileSubject.asObservable();
    }

    getById(id: string) {
        return this.http.get<File>(`${baseUrl}/download/${id}`);
    }

    create(params) {
        return this.http.post(`${baseUrl}/upload`, params);
    }

}