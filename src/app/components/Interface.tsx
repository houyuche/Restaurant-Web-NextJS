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

export interface TimeSlot {
  id: number;
  date: string;
  meal: string;
  capacity: number;
}

export interface PastOrder {
  id: number;
  username_id: number;
  time: string;
  items_ordered: Item[];
  reward_change: number;
  status: string;
}

export interface Booking {
  id: number;
  username__username: string;
  head_count: number;
  status: string;
  time_slot_id: number;
  time_slot_date: string;
  time_slot_meal: string;
}
