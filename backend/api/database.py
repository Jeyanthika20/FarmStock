import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in .env file")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # avoid stale connections
    pool_size=5,             # base pool size
    max_overflow=10,         # extra connections allowed
    echo=False               # set True for SQL debug logs in dev
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
