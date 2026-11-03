import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../models/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-component',
  standalone: false,
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
  export class ProductComponent implements OnInit {

  products = signal<Product[]>([]);
  formGroupProduct: FormGroup;



 constructor(private formBuilder: FormBuilder, private service: ProductService) {

    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price:   ['']
    });

  }
  ngOnInit(): void {
      this.service.getAllProducts().subscribe(
          {
              next: json => this.products.set(json)
          }
      );
  }

   save(){
    this.service.save(this.formGroupProduct.value).subscribe(
     {
       next: json => {
          this.products.update(products => [...products, json]);
          this.formGroupProduct.reset();
       }
     }
    );
 }
}
