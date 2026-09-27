export interface TicketType {
  id: number;
  event_id: number;
  name: string;
  description: string | null;
  price: string | number;
  capacity: number;
  available_quantity: number;
  created_at: string;
}

export interface Event {
  id: number;
  name: string;
  description: string | null;
  venue: string;
  event_date: string;
  start_time: string;
  end_time: string;
  image: string | null;
  status: string;
  created_at: string;
  ticket_types?: TicketType[];
}

export interface DemoBookingRequest {
  quantity: number;
  event_date: string;
  payment_method: string;
  event_id?: number;
}

export interface DemoBookingData {
  booking_id: string;
  event_name: string;
  venue: string;
  event_date: string;
  quantity: number;
  ticket_price: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title?: string;
  message: string;
}
