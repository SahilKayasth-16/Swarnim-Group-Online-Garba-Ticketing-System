from datetime import date, datetime, time
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import Date, DateTime, Integer, String, Text, Time, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.ticket import TicketType


class Event(Base):
    """
    SQLAlchemy 2.x model representing a Garba Event.
    """

    __tablename__ = "events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    venue: Mapped[str] = mapped_column(String(255), nullable=False)
    event_date: Mapped[date] = mapped_column(Date, nullable=False)
    start_time: Mapped[time] = mapped_column(Time, nullable=False)
    end_time: Mapped[time] = mapped_column(Time, nullable=False)
    image: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="active")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    ticket_types: Mapped[List["TicketType"]] = relationship(
        "TicketType", back_populates="event", cascade="all, delete-orphan"
    )
