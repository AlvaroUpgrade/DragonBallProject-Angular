import { CharactersService } from './../../services/characters.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {

  newCharacter: any = {
    name: '',
    race: '',
    genre: '',
    img: '',
    universe: '',
    transform: '',
  };

  characterForm!: FormGroup;

  constructor(private characterService: CharactersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.characterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      race: ['', [Validators.required]],
      genre: ['',[Validators.required]],
      img: ['', [Validators.required, Validators.minLength(3)]],
      universe: ['', [Validators.max(12)]],
      transform: ['', [Validators.required]],
    })

    this.characterForm.valueChanges.subscribe((changes) => {
      this.newCharacter = changes
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log("File: ", file);
    this.characterForm.patchValue({
      img: file
    })

  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.characterForm.get('name')?.value);
    formData.append('race', this.characterForm.get('race')?.value);
    formData.append('genre', this.characterForm.get('genre')?.value);
    formData.append('img', this.characterForm.get('img')?.value);
    formData.append('universe', this.characterForm.get('universe')?.value);
    formData.append('transform', this.characterForm.get('transform')?.value);
    console.log( formData);
    this.characterService.postCharacter(formData).subscribe(() => this.router.navigate(['/characters']))

  }

}
