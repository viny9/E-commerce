import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore, private snackBar: MatSnackBar) { }

  productId: string = ''

  // Metodos de Produto
  createProduct(product: Object) {
    return this.firebase.collection('products').add(product)
  }

  getProducts() {
    return this.firebase.collection('products').get()
  }

  getProductById(id: any) {
    return this.firebase.collection('products').doc(id).get()
  }

  editProduct(productId: any, newProduct: any) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
  }

  deleteProduct(productId: any) {
    return this.firebase.collection('products').doc(productId).delete()
  }

  getProductId(product: any) {
    this.getProducts().subscribe((res: any) => {
      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      this.productId = ids[index].id
    })
  }

  // Metodos da lista
  getFavoriteList() {
    return this.firebase.collection('list').get()
  }

  addProductInList(product: any) {
    return this.firebase.collection('list').add(product)
  }

  deleteFromList(productId: string) {
    return this.firebase.collection('list').doc(productId).delete()
  }

  getListProductId(product: any) {
    this.getFavoriteList().subscribe((res: any) => {
      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      this.productId = ids[index].id
    })
  }

  // Metodos do carrinho

  getCart() {
    return this.firebase.collection('cart').get()
  }

  addInCart(product: any) {
    return this.firebase.collection('cart').add(product)
  }

  deleteCartProduct(productId: any) {
    return this.firebase.collection('cart').doc(productId).delete()
  }

  getCartProductId(product: any) {
    this.getCart().subscribe((res: any) => {
      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      this.productId = ids[index].id
    })
  }

  // Metodo de Mensagens  
  userMessages(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snackBar'
    })
  }

}
