export class File {
    id: string;
    emailMedico: string;
    emailPaziente: string;
    ifFile: string;
    nomeFile: string;

    constructor(emailPaziente, emailMedico, ifFile, nomeFile) {
        {
            this.emailMedico=emailMedico;
            this.emailPaziente=emailPaziente
            this.ifFile=ifFile;
            this.nomeFile=nomeFile;
        }
    }
}