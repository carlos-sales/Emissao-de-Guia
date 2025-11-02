import { trigger, transition, style, animate } from "@angular/animations";

export const slideFadeFromRightAnimation = trigger('slideFadeFromRightAnimation',
  [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-100%)' }),
      animate('400ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      animate('150ms ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
    ])
  ]
);
