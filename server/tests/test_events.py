from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_events():
    response = client.get("/api/events")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert isinstance(json_data["data"], list)
    assert len(json_data["data"]) >= 1


def test_get_event_detail():
    events_res = client.get("/api/events")
    events = events_res.json()["data"]
    assert len(events) > 0
    event_id = events[0]["id"]

    response = client.get(f"/api/events/{event_id}")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"]["id"] == event_id
    assert "ticket_types" in json_data["data"]


def test_get_event_tickets():
    events_res = client.get("/api/events")
    events = events_res.json()["data"]
    event_id = events[0]["id"]

    response = client.get(f"/api/events/{event_id}/tickets")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert isinstance(json_data["data"], list)


def test_get_nonexistent_event():
    response = client.get("/api/events/999999")
    assert response.status_code == 404


def test_get_nonexistent_event_tickets():
    response = client.get("/api/events/999999/tickets")
    assert response.status_code == 404
