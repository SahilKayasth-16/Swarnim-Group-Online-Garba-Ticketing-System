import io
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def generate_ticket_pdf(booking: dict) -> bytes:
    """
    Generates a PDF ticket document using ReportLab for a booking.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
        pageCompression=0,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TicketTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#4c1d95"),
        alignment=1,
        spaceAfter=6,
    )

    subtitle_style = ParagraphStyle(
        "TicketSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#b45309"),
        alignment=1,
        spaceAfter=15,
    )

    ref_style = ParagraphStyle(
        "BookingRef",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#1e293b"),
        alignment=1,
        spaceAfter=15,
    )

    label_style = ParagraphStyle(
        "LabelStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#475569"),
    )

    value_style = ParagraphStyle(
        "ValueStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#0f172a"),
    )

    badge_style = ParagraphStyle(
        "BadgeStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#15803d"),
        alignment=0,
    )

    elements = []

    elements.append(Paragraph("SWARNIM GROUP NAVRATRI MAHOTSAV 2026", title_style))
    elements.append(Paragraph("OFFICIAL GARBA TICKET PASS", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#7e22ce"), spaceAfter=15))

    booking_id = booking.get("booking_id", "SGNM-2026-DEMO")
    elements.append(Paragraph(f"BOOKING ID: <font color='#6b21a8'>{booking_id}</font>", ref_style))
    elements.append(Spacer(1, 5))

    event_name = booking.get("event_name", "Swarnim Group Navratri Mahotsav 2026")
    event_date = booking.get("event_date", "11 October 2026")
    venue = booking.get("venue", "P.R.B Arts & P.G.R Commerce College Ground, Station Road, Bardoli, Surat")
    quantity = str(booking.get("quantity", 1))
    price = f"Rs. {booking.get('ticket_price', 200.0):.2f}"
    total = f"Rs. {booking.get('total_amount', 200.0):.2f}"
    payment_method = str(booking.get("payment_method", "ONLINE")).upper()
    payment_status = str(booking.get("payment_status", "PAID")).upper()

    table_data = [
        [Paragraph("Event Name:", label_style), Paragraph(event_name, value_style)],
        [Paragraph("Event Date:", label_style), Paragraph(event_date, value_style)],
        [Paragraph("Venue:", label_style), Paragraph(venue, value_style)],
        [Paragraph("Number of Passes:", label_style), Paragraph(quantity, value_style)],
        [Paragraph("Price per Pass:", label_style), Paragraph(price, value_style)],
        [Paragraph("Total Amount Paid:", label_style), Paragraph(f"<b>{total}</b>", value_style)],
        [Paragraph("Payment Method:", label_style), Paragraph(payment_method, value_style)],
        [Paragraph("Payment Status:", label_style), Paragraph(f"<b>{payment_status}</b>", badge_style)],
    ]

    t = Table(table_data, colWidths=[140, 360])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    elements.append(t)
    elements.append(Spacer(1, 20))

    qr_data = [
        [Paragraph("<b>[ QR CODE PLACEHOLDER - SCAN AT VENUE GATE ]</b>", ParagraphStyle('QRHead', parent=styles['Normal'], alignment=1, fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#475569')))],
        [Paragraph(f"Verification Code: {booking_id}-VALIDATED", ParagraphStyle('QRSub', parent=styles['Normal'], alignment=1, fontName='Courier', fontSize=8, textColor=colors.HexColor('#64748b')))]
    ]
    qr_table = Table(qr_data, colWidths=[500])
    qr_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f1f5f9')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#94a3b8')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('PADDING', (0, 0), (-1, -1), 12),
    ]))
    elements.append(qr_table)

    elements.append(Spacer(1, 20))

    footer_text = "Note: This is an official digital pass generated for Swarnim Group Navratri Mahotsav 2026. Present this pass at the gate upon arrival."
    elements.append(Paragraph(footer_text, ParagraphStyle("Footer", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=8, leading=11, textColor=colors.HexColor("#64748b"), alignment=1)))

    doc.build(elements)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
