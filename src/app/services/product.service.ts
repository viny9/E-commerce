import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore) { }

  createProduct(product:any) {
   return this.firebase.collection('products').add(product)
      .then(() => window.location.reload())
  }

  readProducts() {
   return this.firebase.collection('products').get()
  }

  updateProduct(productId:any, newProduct:any) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
      .then(() => window.location.reload())
  }

  deleteProduct(product:any) {
    return this.firebase.collection('products').doc(product).delete()
      .then(() => window.location.reload())
  }
}
