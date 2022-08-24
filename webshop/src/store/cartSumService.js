import { Subject } from "rxjs";

const cartSumSubject = new Subject();

export const cartSumService = {
  sendCartSum: (newCartSum) => cartSumSubject.next(newCartSum),
  getCartSum: () => cartSumSubject.asObservable()
}

// Subject on selline asi, et nii kui .next() käivitub, siis läheb käima .subscribe()

// nii kui toimub ostukorvi lisamine
// koheselt arvutatakse ostukorvi kogusumma

// kui toimub ostukorvist kustutamine
// arvutatakse jälle ostukorvi kogusumma