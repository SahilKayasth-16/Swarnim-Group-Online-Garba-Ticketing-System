import logging
from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

logger = logging.getLogger(__name__)

# SQLAlchemy 2.x Engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
)

# SQLAlchemy Session Factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that yields a database session lifecycle.
    Ensures that the session is closed cleanly after request processing.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_db_connection() -> bool:
    """
    Executes a lightweight query (SELECT 1) to verify PostgreSQL connectivity.
    Returns True if successful, False otherwise without leaking sensitive credentials.
    """
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        logger.info("PostgreSQL database connection verified successfully.")
        return True
    except Exception as exc:
        logger.error("PostgreSQL database connection failed.", exc_info=False)
        return False
