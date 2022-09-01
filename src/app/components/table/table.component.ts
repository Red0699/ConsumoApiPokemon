import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pokemons= [];

  constructor(
    private pokeService: PokemonService,
    private router: Router) { }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }  

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {

    let dataPokemon;

    for (let i = 1; i <= 900; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          dataPokemon = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          }

          this.data.push(dataPokemon);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          //console.log(res)
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getRow(row: any){
    //console.log(row);
    this.router.navigateByUrl(`/detalle/${row.position}`)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
