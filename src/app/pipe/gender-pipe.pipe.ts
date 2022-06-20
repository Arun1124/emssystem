import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {

  transform(gender: boolean): string {
    if(gender == true){
      return 'Male';
    }
    return 'Female';
  }

}
