import { Component } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent {

  id: number
  nombre: String

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.id = 0
    this.nombre = ""
  }

  add() {
    let c = new Client()
    c.id_Cliente = this.id
    c.nombre = this.nombre
    this.clientService.add(c).subscribe(() => {
      this.id = 0
      this.nombre = ""
    })
  }
}