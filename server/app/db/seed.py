from datetime import date, time
from decimal import Decimal
import logging
from sqlalchemy import select

from app.db.database import SessionLocal
from app.models.event import Event
from app.models.ticket import TicketType

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def seed_database():
    """
    Seeds initial Garba events and ticket types into PostgreSQL idempotently.
    """
    db = SessionLocal()
    try:
        events_data = [
            {
                "name": "Swarnim Navratri Garba Night",
                "description": "A vibrant Navratri Garba celebration featuring traditional music, energetic Garba and Dandiya, and a festive Gujarati cultural atmosphere.",
                "venue": "Swarnim Group Ground, Surat",
                "event_date": date(2026, 10, 12),
                "start_time": time(19, 30),
                "end_time": time(23, 30),
                "image": "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=1200&auto=format&fit=crop",
                "status": "active",
                "ticket_types": [
                    {
                        "name": "Regular Pass",
                        "description": "Access to general Garba play ground area",
                        "price": Decimal("200.00"),
                        "capacity": 2000,
                        "available_quantity": 2000,
                    },
                    {
                        "name": "VIP Pass",
                        "description": "Front stage access with reserved lounge seating & complimentary refreshments",
                        "price": Decimal("500.00"),
                        "capacity": 500,
                        "available_quantity": 500,
                    },
                ],
            },
            {
                "name": "Swarnim Grand Dandiya Evening",
                "description": "A festive Dandiya evening with music, lights and traditional Navratri celebrations.",
                "venue": "Swarnim Celebration Ground, Surat",
                "event_date": date(2026, 10, 13),
                "start_time": time(20, 00),
                "end_time": time(0, 00),
                "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
                "status": "active",
                "ticket_types": [
                    {
                        "name": "Regular Pass",
                        "description": "Standard entry ticket for 1 Person",
                        "price": Decimal("200.00"),
                        "capacity": 1500,
                        "available_quantity": 1500,
                    },
                    {
                        "name": "Premium Pass",
                        "description": "Premium Zone entry with preferred view",
                        "price": Decimal("350.00"),
                        "capacity": 300,
                        "available_quantity": 300,
                    },
                ],
            },
        ]

        seeded_events_count = 0
        seeded_tickets_count = 0

        for event_dict in events_data:
            stmt = select(Event).where(Event.name == event_dict["name"])
            existing_event = db.scalar(stmt)

            if existing_event:
                logger.info("Event '%s' already exists (ID: %s). Skipping creation.", existing_event.name, existing_event.id)
                continue

            tickets_info = event_dict.pop("ticket_types")
            event = Event(**event_dict)
            db.add(event)
            db.flush()

            seeded_events_count += 1

            for ticket_dict in tickets_info:
                ticket_type = TicketType(event_id=event.id, **ticket_dict)
                db.add(ticket_type)
                seeded_tickets_count += 1

        db.commit()
        logger.info("Database seed completed! Seeded %d new events and %d new ticket types.", seeded_events_count, seeded_tickets_count)

    except Exception as e:
        db.rollback()
        logger.error("Error seeding database: %s", str(e), exc_info=True)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
