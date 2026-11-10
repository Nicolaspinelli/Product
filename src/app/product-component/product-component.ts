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
  isEditing: boolean = false;



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
  delete(product: Product) {
    this.service.delete(product).subscribe(
      {
        next: () => {
          this.products.update(products => products.filter(p => p.id !== product.id));
        }
      }
    )
  }
     onClickUpdate(product: Product) {
      this.formGroupProduct.setValue(product);
      this.isEditing = true;
  }
     update() {
     this.service.update(this.formGroupProduct.value).subscribe(
        {
          next: json => {
            this.products.update(products => products.map(p => p.id === json.id ? json : p));
            this.isEditing = false;
            this.formGroupProduct.reset();
          }
        }
      )
  }
}
