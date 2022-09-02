import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AppareilService{

  constructor(private httpClient: HttpClient) {
  }

  appareilSubject=new Subject<any[]>();
  private appareils = [
    {
      id:0,
      name: '',
      status: ''
    }
  ];

  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }
  switchOnAll(){
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll(){
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index:number){
    this.appareils[index].status='allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index:number){
    this.appareils[index].status='éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id:number){
    const appareil=this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    if (appareil == undefined){
      return this.appareils[0];
    }
    return appareil;
  }

  addAppareil(name:string,status:string){
    const appareilObject={
      id:0,
      name:'',
      status:''
    };
    appareilObject.name=name;
    appareilObject.status=status;
    appareilObject.id=this.appareils[(this.appareils.length-1)].id +1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer(){
    this.httpClient
      .put('https://httpclientdemo-35ddc-default-rtdb.firebaseio.com/appareils.json',this.appareils)
      .subscribe(
        ()=>{
          console.log("Enregistrement terminé");
        },
        (error)=>{
          console.log("Erreur de sauvegarde !"+ error);
        }
      );
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any[]>('https://httpclientdemo-35ddc-default-rtdb.firebaseio.com/appareils.json')
      .subscribe(
        (response)=>{
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error)=>{
          console.log("Erreur de chargement !"+error);
        }
      );
  }
}
