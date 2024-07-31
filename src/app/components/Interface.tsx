export interface Respond {
  status: string;
  message: string;
  reward: number;
  cart: Item[];
}

export interface MenuItem {
  id: number;
  name: string;
  image: string;
  price: string;
  count: number;
  category: string;
}

export interface OrderItem {
  username: string;
  item_ordered: Item[];
  price: number;
}

export interface Item {
  name: string;
  quantity: number;
}
