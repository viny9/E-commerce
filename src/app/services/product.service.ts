import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  addToList(product:any) {
    return this.firebase.collection('list').add(product)
      .then(() => window.location.reload())
  }

  readList() {
    return this.firebase.collection('list').get()
  }

  deleteFromTheList(productId:any) {
    return this.firebase.collection('list').doc(productId).delete()
      .then(() => window.location.reload())
  }
  
  //Carrinho
  addToCart(product:any) {
    return this.firebase.collection('cart').add(product)
    .then(() => window.location.reload())
  }

  readCart() {
    return this.firebase.collection('cart').get()
  }

  deleteFromTheCart(productId:any) {
    return this.firebase.collection('cart').doc(productId).delete()
      .then(() => window.location.reload())
  }

  addQuestions(productId:any, question:any) {
    return this.firebase.collection('products').doc(productId).collection('questions').add(question)
      .then(() => window.location.reload())
  }

  readQuestions(productId:any) {
    return this.firebase.collection('products').doc(productId).collection('questions').get()
  }

  messages(message:any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
