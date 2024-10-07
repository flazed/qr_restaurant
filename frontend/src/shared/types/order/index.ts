export type Order = {
  date: string
  id: number
  orderTable: null | number
  orderType: OrderType
  products: number[]
  status: Statuses
  tips: number
  totalPrice: number
  waiter_id: null | number
};

export enum OrderType {
  Hall = 1,
  Self = 2
}

export enum Statuses {
  Canceled = 400,
  Completed = 200,
  Created = 100
}
