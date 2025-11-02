import { trigger, transition, style, animate, keyframes } from "@angular/animations";

export const shakeAnimation = trigger('shakeAnimation', [
  transition('* => shake', [
    animate('0.5s', keyframes([
      style({ transform: 'translate(1px, 1px) rotate(0deg)', offset: 0 }),
      style({ transform: 'translate(-1px, -2px) rotate(-1deg)', offset: 0.1 }),
      style({ transform: 'translate(-3px, 0px) rotate(1deg)', offset: 0.2 }),
      style({ transform: 'translate(3px, 2px) rotate(0deg)', offset: 0.3 }),
      style({ transform: 'translate(1px, -1px) rotate(1deg)', offset: 0.4 }),
      style({ transform: 'translate(-1px, 2px) rotate(-1deg)', offset: 0.5 }),
      style({ transform: 'translate(-3px, 1px) rotate(0deg)', offset: 0.6 }),
      style({ transform: 'translate(3px, 1px) rotate(-1deg)', offset: 0.7 }),
      style({ transform: 'translate(-1px, -1px) rotate(1deg)', offset: 0.8 }),
      style({ transform: 'translate(1px, 2px) rotate(0deg)', offset: 0.9 }),
      style({ transform: 'translate(1px, -2px) rotate(-1deg)', offset: 1 })
    ]))
  ])
])



