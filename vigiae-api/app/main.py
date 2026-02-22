import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, inspections

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vigiaê API",
    description="API de Fiscalização Sanitária",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(inspections.router)

@app.get("/")
def root():
    return {"message": "Vigiaê API - acesse /docs para Swagger"}