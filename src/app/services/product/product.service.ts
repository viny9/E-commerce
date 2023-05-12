import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadService } from '../load/load.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  id: string = ''
  admin: any
  userId: any = localStorage['userId']
  private component: any = new BehaviorSubject<any>('products')

  constructor(private firebase: AngularFirestore, private storage: AngularFireStorage, private snackBar: MatSnackBar, private router: Router, private loadService: LoadService, private http: HttpClient) { }


  // Metodos de Produto
  getProducts() {
    this.loadService.loadingCount++
    return this.firebase.collection('products').get()
  }

  getProductById(id: any) {
    this.loadService.loadingCount++
    return this.firebase.collection('products').doc(id).get()
  }

  getProductId(product: any) {
    return new Promise((resolve, rejects) => {
      this.getProducts().subscribe((res: any) => {
        const ids = res.docs

        const products = res.docs.map((res: any) => {
          return res.data().name
        })

        const index = products.indexOf(product.name)
        resolve(ids[index].id)
      })
    })
  }

  createProduct(product: Object) {
    return this.firebase.collection('products').add(product)
  }

  editProduct(productId: any, newProduct: any) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
  }

  deleteProduct(productId: any) {
    return this.firebase.collection('products').doc(productId).delete()
  }

  // Metodos da lista
  getFavoriteList() {
    this.loadService.loadingCount++
    return this.firebase.collection('users').doc(this.userId).collection('list').get()
  }

  getListProductId(product: any) {
    this.loadService.loadingCount++
    this.getFavoriteList().subscribe((res: any) => {
      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      this.id = ids[index].id
    })
  }

  addProductInList(product: any) {
    return this.firebase.collection('users').doc(this.userId).collection('list').add(product)
  }

  deleteFromList(productId: string) {
    return this.firebase.collection('users').doc(this.userId).collection('list').doc(productId).delete()
  }

  // Metodos do carrinho
  getCart() {
    this.loadService.loadingCount++
    return this.firebase.collection('users').doc(this.userId).collection('cart').get()
  }

  getCartProductId(product: any) {
    this.getCart().subscribe((res: any) => {
      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      this.id = ids[index].id
    })
  }

  addInCart(product: any) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').add(product)
  }

  deleteCartProduct(productId: any) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').doc(productId).delete()
  }

  emptyCart() {
    this.getCart().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        this.deleteCartProduct(element.id)
      });

    })
  }

  // Categorias 
  getCategorys() {
    this.loadService.loadingCount++
    return this.firebase.collection('productsCategorys').get()
  }

  getCategoryId(category: any) {
    this.getCategorys().subscribe((res: any) => {
      const ids = res.docs

      const categorys = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = categorys.indexOf(category)
      this.id = ids[index].id
    })
  }

  addCategory(category: any) {
    return this.firebase.collection('productsCategorys').add(category)
  }

  updateCategory(categoryId: any, updatedCategory: any) {
    return this.firebase.collection('productsCategorys').doc(categoryId).update(updatedCategory)
  }

  removeCategory(categoryId: any) {
    return this.firebase.collection('productsCategorys').doc(categoryId).delete()
  }

  // Imgs
  sendProductImg(path: any, file: any) {
    const uploadTask = this.storage.upload(path, file)

    uploadTask.percentageChanges().subscribe((percentage: any) => {
      if (percentage === 100) {
        this.loadService.hideLoading()
      } else if (percentage < 100) {
        this.loadService.showLoading()
      }
    })

    return uploadTask
  }

  deleteProductImg(url: any) {
    return this.storage.refFromURL(url).delete()
  }

  // Promotions
  getPromotions() {
    return this.firebase.collection('promotions').get()
  }

  getPromotionById(id: any) {
    return this.firebase.collection('promotions').doc(id).get()
  }

  // COPY this to every method that is getting a firestore document id
  getPromotionId(selectedPromotion: any) {
    return new Promise((resolve, reject) => {

      this.getPromotions().subscribe((res: any) => {
        const ids = res.docs

        const promotions = res.docs.map((res: any) => {
          return res.data().name
        })

        const index = promotions.indexOf(selectedPromotion.name)
        resolve(ids[index].id)
      })
    })
  }

  newPromotion(promotion: any) {
    return this.firebase.collection('promotions').add(promotion)
  }

  updatePromotion(id: any, updatedPromotion: any) {
    return this.firebase.collection('promotions').doc(id).update(updatedPromotion)
  }

  deletePromotion(id: any) {
    return this.firebase.collection('promotions').doc(id).delete()
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

  //Notificações
  getNotifications() {
    this.loadService.loadingCount++
    return this.firebase.collection('notifications').get()
  }

  getNotificationId(notification: any) {
    this.getNotifications().subscribe((res: any) => {
      const ids = res.docs

      const notifications = res.docs.map((res: any) => {
        return res.data().id
      })

      const index = notifications.indexOf(notification.id)
      this.id = ids[index].id
    })
  }

  updateNotificationStatus(notification: any, id: any) {
    return this.firebase.collection('notifications').doc(id).update(notification)
  }

  deleteNotification(notificationId: any) {
    return this.firebase.collection('notifications').doc(notificationId).delete()
  }

  // Notificações arquivadas
  getArchivedNotification() {
    this.loadService.loadingCount++
    return this.firebase.collection('archivedNotifications').get()
  }

  getArchivedNotificationId(notification: any) {
    this.getArchivedNotification().subscribe((res: any) => {
      const ids = res.docs

      const notifications = res.docs.map((res: any) => {
        return res.data().date
      })

      const index = notifications.indexOf(notification.date)
      this.id = ids[index].id
    })
  }

  archiveNotification(notification: any) {
    return this.firebase.collection('archivedNotifications').add(notification)
  }

  unachiveNotification(notification: any, id: any) {
    return this.firebase.collection('archivedNotifications').doc(id).delete()
      .then(() => {
        this.firebase.collection('notifications').add(notification)
      })
  }

  // Todos os pedidos
  getOrders() {
    this.loadService.loadingCount++
    return this.firebase.collection('allOrders').get()
  }

  sendAdminOrder(order: any) {
    return this.firebase.collection('allOrders').add(order)
  }

  //Atualizar o componente selecionado na área do admin
  get selectComponent() {
    return this.component.value
  }

  set selectComponent(component: any) {
    this.component.next(component)
  }

  get updatedComponent() {
    return this.component.asObservable()
  }


}
