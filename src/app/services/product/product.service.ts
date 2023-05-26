import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadService } from '../load/load.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Notification } from 'src/app/models/notification';
import { Product } from 'src/app/models/product';
import { Promotion } from 'src/app/models/promotion';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  userId = localStorage['userId']
  private component: any = new BehaviorSubject<string>('products')
  path = {
    products: 'products',
    list: `users/${this.userId}/list`,
    cart: `users/${this.userId}/cart`,
    categorys: 'productsCategorys',
    promotions: 'promotions'
  }

  constructor(private firebase: AngularFirestore, private storage: AngularFireStorage, private snackBar: MatSnackBar, private router: Router, private loadService: LoadService) { }

  // Metodos de Produto
  getProducts() {
    return this.firebase.collection('products').get()
  }

  getProductById(id: string) {
    return this.firebase.collection('products').doc(id).get()
  }

  createProduct(product: Product) {
    return this.firebase.collection('products').add(product)
  }

  editProduct(productId: string, newProduct: Product) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
  }

  deleteProduct(productId: string) {
    return this.firebase.collection('products').doc(productId).delete()
  }

  // Metodos da lista
  getFavoriteList() {
    return this.firebase.collection('users').doc(this.userId).collection('list').get()
  }

  addProductInList(product: Product) {
    return this.firebase.collection('users').doc(this.userId).collection('list').add(product)
  }

  deleteFromList(productId: string) {
    return this.firebase.collection('users').doc(this.userId).collection('list').doc(productId).delete()
  }

  // Metodos do carrinho
  getCart() {
    return this.firebase.collection('users').doc(this.userId).collection('cart').get()
  }

  addInCart(product: Product) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').add(product)
  }

  deleteCartProduct(productId: string) {
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
    return this.firebase.collection('productsCategorys').get()
  }

  addCategory(category: Object) {
    return this.firebase.collection('productsCategorys').add(category)
  }

  updateCategory(categoryId: string, updatedCategory: Object) {
    return this.firebase.collection('productsCategorys').doc(categoryId).update(updatedCategory)
  }

  removeCategory(categoryId: string) {
    return this.firebase.collection('productsCategorys').doc(categoryId).delete()
  }

  // Imgs
  sendProductImg(path: string, file: File) {
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

  deleteProductImg(url: string) {
    return this.storage.refFromURL(url).delete()
  }

  // Promoções
  getPromotions() {
    return this.firebase.collection('promotions').get()
  }

  getPromotionById(id: string) {
    return this.firebase.collection('promotions').doc(id).get()
  }

  newPromotion(promotion: Promotion) {
    return this.firebase.collection('promotions').add(promotion)
  }

  updatePromotion(id: string, updatedPromotion: Promotion) {
    return this.firebase.collection('promotions').doc(id).update(updatedPromotion)
  }

  deletePromotion(id: string) {
    return this.firebase.collection('promotions').doc(id).delete()
  }

  //Notificações
  getNotifications() {
    return this.firebase.collection('notifications').get()
  }

  async getNotificationId(notification: Notification) {
    const res = await lastValueFrom(this.getNotifications())
    const ids = res.docs

    const notifications = res.docs.map((res: any) => {
      return res.data().id
    })

    const index = notifications.indexOf(notification.id)
    return ids[index].id
  }

  updateNotificationStatus(notification: Notification, id: string) {
    return this.firebase.collection('notifications').doc(id).update(notification)
  }

  deleteNotification(notificationId: string) {
    return this.firebase.collection('notifications').doc(notificationId).delete()
  }

  // Notificações arquivadas
  getArchivedNotification() {
    return this.firebase.collection('archivedNotifications').get()
  }

  async getArchivedNotificationId(notification: Notification) {
    const res = await lastValueFrom(this.getArchivedNotification())
    const ids = res.docs

    const notifications = res.docs.map((res: any) => {
      return res.data().date
    })

    const index = notifications.indexOf(notification.date)
    return ids[index].id
  }

  archiveNotification(notification: Notification) {
    return this.firebase.collection('archivedNotifications').add(notification)
  }

  unachiveNotification(notification: Notification, id: string) {
    return this.firebase.collection('archivedNotifications').doc(id).delete()
      .then(() => {
        this.firebase.collection('notifications').add(notification)
      })
  }

  // Todos os pedidos
  getOrders() {
    return this.firebase.collection('allOrders').get()
  }

  sendAdminOrder(order: Object) {
    return this.firebase.collection('allOrders').add(order)
  }

  //Atualizar o componente selecionado na área do admin
  get selectComponent() {
    return this.component.value
  }

  set selectComponent(component: string) {
    this.component.next(component)
  }

  get updatedComponent() {
    return this.component.asObservable()
  }

  // Mostra mensagens ao usuário
  userMessages(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snackBar'
    })
  }

  // Navega pela rotas escolhidas
  navegate(path: string) {
    return this.router.navigate([path])
  }

  // Pega o id de todos os metodos
  getId(path: string, item: any) {
    const query = this.firebase.collection(path, ref => ref.where('name', '==', item.name || item));

    return lastValueFrom<any>(query.get().pipe(
      map(res => {
        const doc = res.docs[0];
        return doc ? doc.id : null;
      })
    ))
  }

  // Máscaras dos inputs
  inputMasks() {
    const maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

    const masks = {
      phone: maskPhone,
      cep: maskCep,
    }

    return masks
  }
}
