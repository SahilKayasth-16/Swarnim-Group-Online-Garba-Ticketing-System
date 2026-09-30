import random
import string
from decimal import Decimal
from typing import Any, Dict, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking

TICKET_PRICE = Decimal("200.00")
DEFAULT_EVENT_DATE = "11 October 2026"
EVENT_NAME = "Swarnim Group Navratri Mahotsav 2026"
VENUE = "P.R.B Arts & P.G.R Commerce College Ground, Station Road, Bardoli, Surat"
ALLOWED_PAYMENT_METHODS = {"online", "cash"}


def _booking_to_dict(booking: Booking) -> Dict[str, Any]:
    """
    Converts a Booking ORM row into the plain dict shape expected by the
    API response schema and the PDF generator.
    """
    return {
        "booking_id": booking.booking_id,
        "event_name": EVENT_NAME,
        "venue": booking.venue,
        "event_date": booking.event_date,
        "quantity": booking.quantity,
        "ticket_price": float(booking.ticket_price),
        "total_amount": float(booking.total_amount),
        "payment_method": booking.payment_method,
        "payment_status": booking.payment_status,
    }


def create_demo_booking(
    db: Session, quantity: int, event_date: str, payment_method: str
) -> Dict[str, Any]:
    """
    Validates input, persists a demo booking record with a dynamically
    calculated total, and returns it as a plain dict.
    """
    if quantity < 1 or quantity > 10:
        raise ValueError("Quantity must be between 1 and 10 tickets.")

    if not payment_method or payment_method.strip().lower() not in ALLOWED_PAYMENT_METHODS:
        raise ValueError("Invalid payment method selected. Allowed methods: online, cash.")

    random_str = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    booking_id = f"SGNM-2026-{random_str}"

    total_amount = TICKET_PRICE * quantity

    booking = Booking(
        booking_id=booking_id,
        venue=VENUE,
        event_date=event_date or DEFAULT_EVENT_DATE,
        quantity=quantity,
        ticket_price=TICKET_PRICE,
        total_amount=total_amount,
        payment_method=payment_method.strip().upper(),
        payment_status="paid",
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return _booking_to_dict(booking)


def get_demo_booking_by_id(db: Session, booking_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves a persisted demo booking by its booking_id.
    Returns None if no matching booking exists.
    """
    stmt = select(Booking).where(Booking.booking_id == booking_id)
    booking = db.scalar(stmt)
    if not booking:
        return None
    return _booking_to_dict(booking)
    return _booking_to_dict(booking)