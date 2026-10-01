from pydantic import BaseModel


class BookingData(BaseModel):
    booking_id: str
    venue: str
    event_date: str
    quantity: int
    ticket_price: float
    total_amount: float
    payment_method: str
    payment_status: str


class BookingResponse(BaseModel):
    success: bool = True
    message: str = "Booking retrieved successfully."
    data: BookingData