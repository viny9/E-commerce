import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore, private snackBar: MatSnackBar) { }

  //Produtos
  createProduct(product:any) {
   return this.firebase.collection('products').add(product)
      .then(() => window.location.reload())
  }

  readProducts() {
   return this.firebase.collection('products').get()
  }
  
  readProduct(productId:any) {
    return this.firebase.collection('products').doc(productId).get()
  }

  updateProduct(productId:any, newProduct:any) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
      .then(() => window.location.reload())
  }

  deleteProduct(product:any) {
    return this.firebase.collection('products').doc(product).delete()
      .then(() => window.location.reload())
  }

  //Lista
  readList() {
    return this.firebase.collection('list').get()
  }

  addToList(product:any) {
    return this.firebase.collection('list').add(product)
      .then(() => window.location.reload())
  }

  deleteFromTheList(productId:any) {
    return this.firebase.collection('list').doc(productId).delete()
      .then(() => window.location.reload())
  }
  
  //Carrinho
  readCart() {
    return this.firebase.collection('cart').get()
  }
  
  addToCart(product:any) {
    return this.firebase.collection('cart').add(product)
    .then(() => window.location.reload())
  }

  deleteFromTheCart(productId:any) {
    return this.firebase.collection('cart').doc(productId).delete()
      .then(() => window.location.reload())
  }

  messages(message:any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
