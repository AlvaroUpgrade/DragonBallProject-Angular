import { CharactersService } from './../../services/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {

  id: any;
  myCharacter: any;

  constructor(private characterService: CharactersService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.characterService.getOneCharacter(this.id).subscribe((data: any) => {
        //Informacion que recibimos segun la id
        console.log(data);
        this.myCharacter = { ...data }

      })
    })
  }

  ngOnInit(): void {
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.id).subscribe()
    this.router.navigate(['/characters'])
  }

}
