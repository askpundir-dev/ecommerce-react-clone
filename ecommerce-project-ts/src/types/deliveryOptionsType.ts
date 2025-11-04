import type { Dispatch, SetStateAction } from "react";
import type { CartItem } from "./cartType";

export interface DeliveryOption {
  createdAt: string;
  deliveryDays: number;
  estimatedDeliveryTimeMs: number;
  id: string;
  priceCents: number;
  updatedAt: string;
}

export interface DeliveryOptionsProps {
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  cartItem: CartItem;
  deliveryOptions: DeliveryOption[];
}
