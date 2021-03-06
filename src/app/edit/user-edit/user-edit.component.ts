import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string
    alerta: any;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == "") {
      this.router.navigate(["/entrar"])
    }
    this.idUser = this.route.snapshot.params["id"]
    this.findByUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }


  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger("As senhas estão diferentes")

    } else {
      console.log(this.usuario) //testando possiveis erros 
      this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertInfo("Usuário atualizado com sucesso. Faça o login novamente.")
        environment.token = ""
        environment.nome = ""
        environment.foto = ""
        environment.id = 0
        this.router.navigate(["/entrar"])

      })
    }

  }

  findByUser(id: number) {
    this.authService.getUserById(id).subscribe((resp: Usuario) => {
      this.usuario = resp

    })
  }
}
