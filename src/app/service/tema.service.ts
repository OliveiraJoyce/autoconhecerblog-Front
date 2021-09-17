import { getLocaleTimeFormat } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token =  {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }
   // [] tras um conjunto de temas

  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>("https://autoconhecerblog.herokuapp.com/tema", this.token)
  }

//   Template literals `` 
// passar uma rota com string e variavel ao mesmo tempo

getByIdTema(id: number): Observable<Tema>{
  return this.http.get<Tema>(`https://autoconhecerblog.herokuapp.com/tema/${id}`, this.token)
}

getByNomeTema(nome: string): Observable<Tema[]>{
  return this.http.get<Tema[]>(`https://autoconhecerblog.herokuapp.com/postagens/nome/${nome}`, this.token)

}
  postTema( temaCadastro: Tema): Observable<Tema>{
    return this.http.post<Tema>("https://autoconhecerblog.herokuapp.com/tema", temaCadastro, this.token)

  }
  putTema( temaCadastro: Tema): Observable<Tema>{
  return this.http.put<Tema>("https://autoconhecerblog.herokuapp.com/tema", temaCadastro, this.token)
}
  deleteTema(id: number){
    return this.http.delete(`https://autoconhecerblog.herokuapp.com/tema/${id}`, this.token)
  }
  
}
