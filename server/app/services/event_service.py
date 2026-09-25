from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.event import Event
from app.models.ticket import TicketType


def get_all_events(db: Session) -> List[Event]:
    """
    Retrieves all active events ordered by event date.
    """
    stmt = (
        select(Event)
        .where(Event.status == "active")
        .order_by(Event.event_date.asc(), Event.start_time.asc())
    )
    return list(db.scalars(stmt).all())


def get_event_by_id(db: Session, event_id: int) -> Optional[Event]:
    """
    Retrieves a single event by ID along with its ticket types.
    """
    stmt = (
        select(Event)
        .options(joinedload(Event.ticket_types))
        .where(Event.id == event_id)
    )
    return db.scalar(stmt)


def get_event_tickets(db: Session, event_id: int) -> Optional[List[TicketType]]:
    """
    Retrieves ticket types for a specific event.
    Returns None if the event does not exist.
    """
    event = db.get(Event, event_id)
    if not event:
        return None

    stmt = (
        select(TicketType)
        .where(TicketType.event_id == event_id)
        .order_by(TicketType.price.asc())
    )
    return list(db.scalars(stmt).all())
