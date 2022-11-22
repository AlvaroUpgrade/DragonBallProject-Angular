import { CharactersService } from '../../services/characters.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  allCharacters?: any[];

  constructor(private characterService: CharactersService) {
    this.characterService.getAllCharacters().subscribe((data: any) => {
      //Sacar por consola los datos que me recoge la funcion getAllCharacters
      console.log(data)

      //Mapear los datos nombrados anteriormente
      const characterData: any[] = data.map((character: any) => ({
        //Atributos de lo recogido de la API
        id: character._id,
        name: character.name,
        race: character.race,
        image: character.img,
        universe: character.universe,
        transform: character.transform,
        genre: character.genre
      }))

      this.allCharacters = [...characterData]
    })
  }

  ngOnInit(): void {
  }

}
