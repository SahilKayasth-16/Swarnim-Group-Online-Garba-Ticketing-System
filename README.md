# Online Garba Event Ticketing & QR-Based Entry Management System

> 🚧 Status: Active Development

A web-based ticketing and QR-based entry management system designed for Garba/Navratri events.

The system will support online ticket booking, cash-counter bookings, daily ticket capacity management, automatic ticket serial allocation, Razorpay payments, PDF ticket generation, unique QR codes, one-time QR validation, security scanning, and administrative reporting.

## Technology Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- REST API
- SQLAlchemy
- Alembic

### Database

- Managed PostgreSQL
- SQL

### Authentication & Security

- JWT
- Password hashing
- Server-side validation
- Role-based access control

### Payments

- Razorpay

### Ticket Generation

- QR Code
- PDF generation

## Project Architecture

The project follows a monorepo structure with a separate React frontend and FastAPI backend.

```text
garba-ticketing-system/
│
├── client/
│   └── React + Vite + TypeScript
│
├── server/
│   └── Python + FastAPI
│
├── README.md
├── .gitignore
└── package.json