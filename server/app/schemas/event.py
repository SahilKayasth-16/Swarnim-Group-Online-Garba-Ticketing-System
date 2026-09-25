from datetime import date, datetime, time
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from app.schemas.ticket import TicketTypeResponse


class EventBase(BaseModel):
    name: str
    description: Optional[str] = None
    venue: str
    event_date: date
    start_time: time
    end_time: time
    image: Optional[str] = None
    status: str = "active"


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EventDetailResponse(EventResponse):
    ticket_types: List[TicketTypeResponse] = []

    model_config = ConfigDict(from_attributes=True)
