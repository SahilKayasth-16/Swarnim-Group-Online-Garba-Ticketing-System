from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_demo_booking():
    payload = {
        "quantity": 3,
        "event_date": "2026-10-11",
        "payment_method": "upi"
    }
    response = client.post("/api/bookings/demo", json=payload)
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"]["quantity"] == 3
    assert json_data["data"]["total_amount"] == 600.0
    assert json_data["data"]["booking_id"].startswith("SGNM-2026-")


def test_create_demo_booking_invalid_quantity():
    payload = {
        "quantity": 15,
        "event_date": "2026-10-11",
        "payment_method": "upi"
    }
    response = client.post("/api/bookings/demo", json=payload)
    assert response.status_code in (400, 422)


def test_download_demo_ticket_pdf():
    payload = {"quantity": 2, "event_date": "2026-10-11", "payment_method": "card"}
    res = client.post("/api/bookings/demo", json=payload)
    booking_id = res.json()["data"]["booking_id"]

    pdf_res = client.get(f"/api/bookings/demo/{booking_id}/ticket.pdf")
    assert pdf_res.status_code == 200
    assert pdf_res.headers["content-type"] == "application/pdf"
    assert len(pdf_res.content) > 100
