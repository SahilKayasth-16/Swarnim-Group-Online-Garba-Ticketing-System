from typing import Optional
from pydantic import BaseModel, Field


class DemoBookingCreate(BaseModel):
    quantity: int = Field(..., ge=1, le=10, description="Number of tickets between 1 and 10")
    event_date: str = Field(default="2026-10-11", description="Date of the event")
    payment_method: str = Field(..., description="Demo payment method (upi, card, netbanking)")
    event_id: Optional[int] = 1


class DemoBookingData(BaseModel):
    booking_id: str
    event_name: str
    venue: str
    event_date: str
    quantity: int
    ticket_price: float
    total_amount: float
    payment_method: str
    payment_status: str


class DemoBookingResponse(BaseModel):
    success: bool = True
    message: str = "Payment successful"
    data: DemoBookingData
