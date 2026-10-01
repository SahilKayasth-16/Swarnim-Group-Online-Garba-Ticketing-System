from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services import booking_service
from app.utils.pdf_generator import generate_ticket_pdf

router = APIRouter()


@router.get("/{booking_id}")
def get_booking(booking_id: str, db: Session = Depends(get_db)):
    """
    Retrieve a persisted booking by booking ID.
    """
    booking = booking_service.get_booking_by_id(
        db=db,
        booking_id=booking_id,
    )

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID {booking_id} not found.",
        )

    return {
        "success": True,
        "message": "Booking retrieved successfully.",
        "data": booking,
    }


@router.get("/{booking_id}/ticket.pdf")
def download_ticket_pdf(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Generate and download a PDF ticket for an existing booking.
    """
    booking = booking_service.get_booking_by_id(
        db=db,
        booking_id=booking_id,
    )

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID {booking_id} not found.",
        )

    try:
        pdf_bytes = generate_ticket_pdf(booking)
        filename = f"ticket-{booking_id}.pdf"

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            },
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate ticket PDF.",
        )