from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import router

app = FastAPI(title="Bubblegum Authentication")

# Create database tables
Base.metadata.create_all(bind=engine)

# Register API routes
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)