import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadService } from '../load/load.service';
import { Notification } from 'src/app/models/notification';
import { Product } from 'src/app/models/product';
import { Promotion } from 'src/app/models/promotion';
import { ErrorsService } from '../errors/errors.service';


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
    promotions: 'promotions',
  }

  constructor(private snackBar: MatSnackBar, private router: Router, private loadService: LoadService, private errorService: ErrorsService) { }

  // Metodos de Produto
  getProducts() {
    return this.firebase.collection('products').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  getProductById(id: string) {
    return this.firebase.collection('products').doc(id).get()
      .pipe(
        map(doc => doc.data()),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  createProduct(product: Product) {
    return this.firebase.collection('products').add(product)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  editProduct(productId: string, newProduct: Product) {
    return this.firebase.collection('products').doc(productId).update(newProduct)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  deleteProduct(productId: string) {
    return this.firebase.collection('products').doc(productId).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  // Metodos da lista
  getFavoriteList() {
    return this.firebase.collection('users').doc(this.userId).collection('list').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  addProductInList(product: Product) {
    return this.firebase.collection('users').doc(this.userId).collection('list').add(product)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  deleteFromList(productId: string) {
    return this.firebase.collection('users').doc(this.userId).collection('list').doc(productId).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  // Metodos do carrinho
  getCart() {
    return this.firebase.collection('users').doc(this.userId).collection('cart').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  addProductInCart(product: Product) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').add(product)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  deleteCartProduct(productId: string) {
    return this.firebase.collection('users').doc(this.userId).collection('cart').doc(productId).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  emptyCart() {
    this.getCart().subscribe((res: any) => {

      res.forEach(async (element: any) => {
        const id = await this.getId(this.path.cart, element)
        this.deleteCartProduct(id)
      });
    })
  }

  // Metodos de Categorias
  getCategorys() {
    return this.firebase.collection('productsCategorys').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  createCategory(category: Object) {
    return this.firebase.collection('productsCategorys').add(category)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  updateCategory(categoryId: string, updatedCategory: Object) {
    return this.firebase.collection('productsCategorys').doc(categoryId).update(updatedCategory)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  removeCategory(categoryId: string) {
    return this.firebase.collection('productsCategorys').doc(categoryId).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  // Metodos de Imgs
  addProductImg(path: string, file: File) {
    const uploadTask = this.storage.upload(path, file)

    uploadTask.percentageChanges()
      .pipe(
        catchError((e: Error) => this.errorService.handleError(e))
      )
      .subscribe((percentage: any) => {
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

  // Metodos de Promoções
  getPromotions() {
    return this.firebase.collection('promotions').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  getPromotionById(id: string) {
    return this.firebase.collection('promotions').doc(id).get()
      .pipe(
        map(doc => doc.data()),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  createPromotion(promotion: Promotion) {
    return this.firebase.collection('promotions').add(promotion)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  updatePromotion(id: string, updatedPromotion: Promotion) {
    return this.firebase.collection('promotions').doc(id).update(updatedPromotion)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  deletePromotion(id: string) {
    return this.firebase.collection('promotions').doc(id).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  // Metodos de Notificações
  getNotifications() {
    return this.firebase.collection('notifications').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  async getNotificationId(notification: Notification) {
    const query = this.firebase.collection('notifications', ref => ref.where('id', '==', notification.id));

    const id = await lastValueFrom<any>(query.get().pipe(
      map(res => {
        const doc = res.docs[0];
        return doc ? doc.id : null;
      })
    ))

    return id
  }

  updateNotificationStatus(notification: Notification, id: string) {
    return this.firebase.collection('notifications').doc(id).update(notification)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  deleteNotification(notificationId: string) {
    return this.firebase.collection('notifications').doc(notificationId).delete()
      .catch((e: Error) => this.errorService.handleError(e))
  }

  // Metodos de Notificações arquivadas
  getArchivedNotification() {
    return this.firebase.collection('archivedNotifications').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  async getArchivedNotificationId(notification: Notification) {

    const query = this.firebase.collection('archivedNotifications', ref => ref.where('date', '==', notification.date));

    const id = await lastValueFrom<any>(query.get().pipe(
      map(res => {
        console.log(res)
        const doc = res.docs[0];
        return doc ? doc.id : null;
      })
    ))

    return id
  }

  archiveNotification(notification: Notification) {
    return this.firebase.collection('archivedNotifications').add(notification)
      .catch((e: Error) => this.errorService.handleError(e))
  }

  async unachiveNotification(notification: Notification, id: string) {
    try {
      await this.firebase.collection('archivedNotifications').doc(id).delete()
      await this.firebase.collection('notifications').add(notification)
    } catch (error) {
      this.errorService.handleError(error)
    }
  }

  // Metodos de Pedidos
  getOrders() {
    return this.firebase.collection('allOrders').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  sendOrderToAdmin(order: Object) {
    return this.firebase.collection('allOrders').add(order)
      .catch((e: Error) => this.errorService.handleError(e))
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
    )).catch((e: Error) => this.errorService.handleError(e))
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
