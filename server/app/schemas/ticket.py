from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict


class TicketTypeBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    capacity: int
    available_quantity: int


class TicketTypeCreate(TicketTypeBase):
    event_id: int


class TicketTypeResponse(TicketTypeBase):
    id: int
    event_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
