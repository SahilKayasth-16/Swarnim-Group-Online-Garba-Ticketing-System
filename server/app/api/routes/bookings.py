from fastapi import APIRouter, HTTPException, status, Response
from app.schemas.booking import DemoBookingCreate, DemoBookingResponse
from app.services import booking_service
from app.utils.pdf_generator import generate_ticket_pdf

router = APIRouter()


@router.post("/demo", response_model=DemoBookingResponse)
def create_demo_booking_route(payload: DemoBookingCreate):
    """
    Simulates a demo ticket booking payment and returns booking summary.
    """
    try:
        booking_data = booking_service.create_demo_booking(
            quantity=payload.quantity,
            event_date=payload.event_date,
            payment_method=payload.payment_method,
        )
        return {
            "success": True,
            "message": "Payment successful! Your tickets have been booked.",
            "data": booking_data,
        }
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(val_err),
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during demo payment processing.",
        )


@router.get("/demo/{booking_id}/ticket.pdf")
def download_demo_ticket_pdf(booking_id: str):
    """
    Generates and streams a downloadable PDF ticket for the demo booking.
    """
    booking = booking_service.get_demo_booking_by_id(booking_id)
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
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate ticket PDF.",
        )
