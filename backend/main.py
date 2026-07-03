from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="One Vendor Solutions API",
    description="Full-stack B2B vendor procurement platform",
    version="1.0.0"
)

# Configure CORS for React frontend (default: localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_origins_regex="http://localhost:.*",
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Route
@app.get("/")
def read_root():
    return {
        "success": True,
        "data": {
            "status": "ok",
            "service": "One Vendor API"
        },
        "message": "API is operational"
    }

# Stub import routers (to be populated in future steps)
# from app.routers import auth, admin_auth, enquiries, bookings, products, customers, admin, analytics, contact, settings
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# etc.
