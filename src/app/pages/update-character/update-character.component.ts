import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharactersService } from './../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.scss']
})
export class UpdateCharacterComponent implements OnInit {

  characterForm!: FormGroup;
  updatedCharacter!: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private characterService: CharactersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id')
      this.characterService.getOneCharacter(this.id).subscribe(data => {
        console.log("Character info from UpdateCharacter", data);
        this.updatedCharacter = data;

        this.characterForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          race: ['', [Validators.required]],
          genre: ['', [Validators.required]],
          img: ['', [Validators.required, Validators.minLength(3)]],
          universe: ['', [Validators.max(12)]],
          transform: ['', [Validators.required]],
        })

      })
    })

    this.characterForm.valueChanges.subscribe((changes) => {
      this.updatedCharacter = changes;
    })

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.characterForm.patchValue({
      img: file
    })
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('img', this.characterForm.get('img')?.value);
    formData.append('name', this.characterForm.get('name')?.value);
    formData.append('race', this.characterForm.get('race')?.value);
    console.log(formData)
    this.characterService.putCharacter(this.id, formData).subscribe(() =>

      this.router.navigate(['/characters'])
    )
  }

}
