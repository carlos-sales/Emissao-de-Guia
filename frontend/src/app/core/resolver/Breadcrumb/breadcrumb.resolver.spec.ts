import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { breadcrumbResolver } from './breadcrumb.resolver';

describe('breadcrumbResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => breadcrumbResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
