import type {
  ApiResponse,
  AuthResponse,
  DemoBookingData,
  DemoBookingRequest,
  Event,
  LoginRequest,
  RegisterRequest,
  TicketType,
  UserPublic,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error(`Failed to fetch events (Status ${response.status})`);
  }
  const result: ApiResponse<Event[]> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to retrieve events");
  }
  return result.data;
}

export async function getEventById(id: number): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Event not found.");
    }
    throw new Error(`Failed to fetch event details (Status ${response.status})`);
  }
  const result: ApiResponse<Event> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to retrieve event details");
  }
  return result.data;
}

export async function getEventTickets(eventId: number): Promise<TicketType[]> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Event not found.");
    }
    throw new Error(`Failed to fetch ticket categories (Status ${response.status})`);
  }
  const result: ApiResponse<TicketType[]> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to retrieve ticket categories");
  }
  return result.data;
}

export async function createDemoBooking(payload: DemoBookingRequest): Promise<DemoBookingData> {
  const response = await fetch(`${API_BASE_URL}/bookings/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Payment failed. Please try again.");
  }

  const result: ApiResponse<DemoBookingData> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Demo booking payment failed.");
  }
  return result.data;
}

export function getDemoTicketPdfUrl(bookingId: string): string {
  return `${API_BASE_URL}/bookings/demo/${bookingId}/ticket.pdf`;
}

export async function registerUser(payload: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Registration failed. Please check your details.");
  }

  const result: ApiResponse<AuthResponse> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Registration failed.");
  }
  return result.data;
}

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Invalid email or password.");
  }

  const result: ApiResponse<AuthResponse> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Login failed.");
  }
  return result.data;
}

export async function getCurrentUser(token: string): Promise<UserPublic> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Session expired or invalid.");
  }

  const result: ApiResponse<UserPublic> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to load user profile.");
  }
  return result.data;
}

