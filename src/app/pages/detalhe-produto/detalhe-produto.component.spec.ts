import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheProdutoComponent } from './detalhe-produto.component';

describe('DetalheProdutoComponent', () => {
  let component: DetalheProdutoComponent;
  let fixture: ComponentFixture<DetalheProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
