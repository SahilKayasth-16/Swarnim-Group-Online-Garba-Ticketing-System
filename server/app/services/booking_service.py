import random
import string
from typing import Dict, Any, Optional

DEMO_BOOKINGS: Dict[str, Dict[str, Any]] = {}


def create_demo_booking(quantity: int, event_date: str, payment_method: str) -> Dict[str, Any]:
    """
    Creates a simulated demo booking record with dynamic total calculation and booking reference.
    """
    if quantity < 1 or quantity > 10:
        raise ValueError("Quantity must be between 1 and 10 tickets.")

    allowed_methods = ["upi", "card", "netbanking"]
    if payment_method.lower() not in allowed_methods:
        raise ValueError("Invalid payment method selected.")

    random_str = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    booking_id = f"SGNM-2026-{random_str}"

    ticket_price = 200.0
    total_amount = float(quantity * ticket_price)

    booking_data = {
        "booking_id": booking_id,
        "event_name": "Swarnim Group Navratri Mahotsav 2026",
        "venue": "Swarnim Group Ground, Vesu, Surat",
        "event_date": event_date if event_date else "11 October 2026",
        "quantity": quantity,
        "ticket_price": ticket_price,
        "total_amount": total_amount,
        "payment_method": payment_method.upper(),
        "payment_status": "paid",
    }

    DEMO_BOOKINGS[booking_id] = booking_data
    return booking_data


def get_demo_booking_by_id(booking_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves a demo booking by ID.
    """
    if booking_id in DEMO_BOOKINGS:
        return DEMO_BOOKINGS[booking_id]

    if booking_id.startswith("SGNM-2026-"):
        return {
            "booking_id": booking_id,
            "event_name": "Swarnim Group Navratri Mahotsav 2026",
            "venue": "Swarnim Group Ground, Vesu, Surat",
            "event_date": "11 October 2026",
            "quantity": 1,
            "ticket_price": 200.0,
            "total_amount": 200.0,
            "payment_method": "UPI",
            "payment_status": "paid",
        }

    return None
