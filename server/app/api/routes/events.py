from typing import Any, Dict, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.event import EventDetailResponse, EventResponse
from app.schemas.ticket import TicketTypeResponse
from app.services import event_service

router = APIRouter()


@router.get("", response_model=Dict[str, Any])
@router.get("/", response_model=Dict[str, Any])
def list_events(db: Session = Depends(get_db)):
    """
    Retrieve all active Garba events.
    """
    events = event_service.get_all_events(db)
    data = [EventResponse.model_validate(e).model_dump(mode="json") for e in events]
    return {
        "success": True,
        "data": data,
    }


@router.get("/{event_id}", response_model=Dict[str, Any])
def get_event_detail(event_id: int, db: Session = Depends(get_db)):
    """
    Retrieve details for a single event by ID, including its ticket types.
    """
    event = event_service.get_event_by_id(db, event_id)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with ID {event_id} not found",
        )

    data = EventDetailResponse.model_validate(event).model_dump(mode="json")
    return {
        "success": True,
        "data": data,
    }


@router.get("/{event_id}/tickets", response_model=Dict[str, Any])
def get_event_ticket_types(event_id: int, db: Session = Depends(get_db)):
    """
    Retrieve all ticket types available for a specific event.
    """
    tickets = event_service.get_event_tickets(db, event_id)
    if tickets is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with ID {event_id} not found",
        )

    data = [TicketTypeResponse.model_validate(t).model_dump(mode="json") for t in tickets]
    return {
        "success": True,
        "data": data,
    }
