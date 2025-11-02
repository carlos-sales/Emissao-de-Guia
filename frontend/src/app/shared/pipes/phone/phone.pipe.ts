import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform
{

  transform(text: string)
  {
    if(text)
    {
      const value = text.toString().replace(/\D/g, '');
      let textFormatted = '';
      if(value.length > 12) textFormatted = value.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4');
      else if(value.length > 11) textFormatted = value.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');
      else if(value.length > 10) textFormatted = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
      else if (value.length > 9) textFormatted = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
      else if (value.length > 5) textFormatted = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
      else if (value.length > 1) textFormatted = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
      else
      {
        if (text !== '') textFormatted = value.replace(/^(\d*)/, '($1');
      }
      return textFormatted;
    }
    return text;
  }

}
