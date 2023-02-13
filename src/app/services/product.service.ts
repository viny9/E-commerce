import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore) { }

  productId: string = ''

  createProduct(product: Object) {
    return this.firebase.collection('products').add(product)
  }

  getProducts() {
    return this.firebase.collection('products').get()
  }

  getProductById(id:any) {
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
}
