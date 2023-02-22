import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore, private snackBar: MatSnackBar, private router: Router, private auth: AngularFireAuth) { }

  productId: string = ''
  admin: any
  userId: any = localStorage['userId']


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
    return this.firebase.collection('users').doc(this.userId).collection('list').get()
  }

  addProductInList(product: any) {
    return this.firebase.collection('users').doc(this.userId).collection('list').add(product)
  }

  deleteFromList(productId: string) {
    return this.firebase.collection('users').doc(this.userId).collection('list').doc(productId).delete()
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
    return this.firebase.collection('users').doc(this.userId).collection('cart').get()
  }

  addInCart(product: any) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').add(product)
  }

  deleteCartProduct(productId: any) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').doc(productId).delete()
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

  // Login e cadastro
  signUp(user: any) {
    this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        delete user.password
        this.createUser(user)
      })

      .then(() => {
        getAuth().currentUser?.getIdToken()
          .then((token: any) => localStorage.setItem('token', token))
      })

      .then(() => this.userMessages('Usuário criado'))
      .then(() => this.navegate(''))
  }

  createUser(userInfos: any) {
    this.firebase.collection('users').add(userInfos)
  }

  getUser() {
    return this.firebase.collection('users').get()
  }

  signIn(user: any) {
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        getAuth().currentUser?.getIdToken()
          .then((token: any) => localStorage.setItem('token', token))
          .then(() => this.setAdmin(user))
          .then(() => this.setUserId(user))
      })
      .then(() => {
        setTimeout(() => {
          const admin = this.userStatus().admin

          if (admin === true) {
            this.navegate('admin/products')
          } else if (admin === false) {
            this.navegate('')
          }
        }, 500);
      })
      .catch((e: any) => {
        this.userMessages(e)
      })
  }

  logOut() {
    this.auth.signOut()
      .then(() => localStorage.clear())
      .then(() => this.navegate('signIn'))
      .then(() => window.location.reload())
  }

  updateUser(userId: any, updatedInfos: any) {
    return this.firebase.collection('users').doc(userId).update(updatedInfos)
  }

  deleteUser() {
    this.auth.onAuthStateChanged((user?: any) => {
      return getAuth().currentUser?.delete()
    })
  }

  setUserId(user: any) {
    this.getUser().subscribe((res: any) => {
      const ids = res.docs

      const users = res.docs.map((res: any) => {
        return res.data().email
      })

      const index = users.indexOf(user.email)
      localStorage.setItem('userId', ids[index].id)
    })
  }

  // User status
  setAdmin(userInfos?: any) {
    this.getUser().subscribe((res: any) => {
      const users = res.docs.map((users: any) => {
        return users.data()
      })

      const filter = users.filter((user: any) => {
        return user.email === userInfos.email
      })

      localStorage.setItem('admin', filter[0]?.admin)
    })
  }

  userStatus() {
    const status = {
      logged: this.isLogged(),
      admin: this.isAdmin(),
    }

    return status
  }

  isAdmin() {
    const admin = eval(localStorage['admin'])

    if (admin === true) {
      return true
    } else {
      return false
    }
  }

  isLogged() {
    const token = localStorage['token']

    if (token) {
      return true
    } else {
      return false
    }
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

  navegate(path: string) {
    return this.router.navigate([path])
  }

  inputMasks() {
    const maskPhone: any = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const maskCep: any = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

    const masks = {
      phone: maskPhone,
      cep: maskCep,
    }

    return masks
  }

}
