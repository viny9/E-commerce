import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore, private snackBar: MatSnackBar, private router: Router) { }

  productId: string = ''
  admin: any
  logged:any = false


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

  signUp(userInfos: any) {
    return this.firebase.collection('user').add(userInfos)
  }

  singIn(userInfos: any) {
    this.firebase.collection('user').get().subscribe((res: any) => {

      const users = res.docs.map((user: any) => {
        return user.data()
      })

      const filter = users.filter((user: any) => {
        return user.email === userInfos.email && user.password == userInfos.password
      })

      if (filter.length >= 1) {
        this.admin = filter[0].admin
        this.logged = true
        this.router.navigate([''])
        // .then(() => this.admin = filter[0].admin)
      } else {
        this.userMessages('Email ou senha incorretos')
      }

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

  navegate(path:string) {
    return this.router.navigate([path])
  }

}
