import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { Producto } from 'src/app/models/Product';
import { ClientService } from 'src/app/services/client.service';
import { ProductoService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList = new Array<Client>()
  productList = new Array<Producto>()

  constructor(private clientService: ClientService, private productService: ProductoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.clientService.getAll().subscribe(totalResponse => {
      this.clientList = totalResponse
    },
      error => {
        console.error(error)
        alert("Error:" + error.error)
      }
    )
    this.productService.getAll().subscribe(response => {
      this.productList = response
    })
  }

  delete(id: number) {
    this.clientService.delete(id).subscribe(() => {
      location.reload()
      alert("Se eliminó correctamente")
    },
      error => {
        console.error(error)
        if (error.status === 500) {
          alert("Error: No se puede eliminar ")
        }
      }
    )
  }

  add() {
    let c = new Client()
    c.nombre = (document.getElementById("nombre") as HTMLInputElement).value
    this.clientService.add(c).subscribe(() => {
      location.reload()
    })
  }

  ver(client: Client, view: any) {
    this.modalService.open(view).result.then(() => {
      let c = new Client()
      c.id_Cliente = client.id_Cliente
      c.nombre = client.nombre
      this.clientService.update(c).subscribe(() => {
        location.reload()
      })
    })
  }
}