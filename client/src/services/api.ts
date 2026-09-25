import type { ApiResponse, Event, TicketType } from "../types";

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
