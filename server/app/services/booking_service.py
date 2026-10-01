from decimal import Decimal
from typing import Any, Dict, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking


def _booking_to_dict(booking: Booking) -> Dict[str, Any]:
    """
    Convert a Booking ORM row into a plain dictionary.

    Business values such as event name, venue, date, ticket price,
    payment method, and payment status come from the persisted
    booking record rather than being hardcoded in this service.
    """
    return {
        "booking_id": booking.booking_id,
        "venue": booking.venue,
        "event_date": booking.event_date,
        "quantity": booking.quantity,
        "ticket_price": float(booking.ticket_price)
        if isinstance(booking.ticket_price, Decimal)
        else booking.ticket_price,
        "total_amount": float(booking.total_amount)
        if isinstance(booking.total_amount, Decimal)
        else booking.total_amount,
        "payment_method": booking.payment_method,
        "payment_status": booking.payment_status,
    }


def get_booking_by_id(db: Session, booking_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a booking by its booking ID.

    Returns None when the booking does not exist.
    """
    stmt = select(Booking).where(Booking.booking_id == booking_id)
    booking = db.scalar(stmt)

    if not booking:
        return None

    return _booking_to_dict(booking)