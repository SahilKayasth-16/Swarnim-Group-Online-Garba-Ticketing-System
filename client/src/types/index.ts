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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
