from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

from . import crud, schemas
from .init import get_db


router = APIRouter(
    prefix='/category',
    tags=["category"]
)

@router.get("/{category}/", response_model=List[schemas.Product])
def read_product_by_category(category: schemas.Category, db: Session = Depends(get_db)):
    db_product = crud.get_product_by_category(db, category=category)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Products in category not found")
    return db_product
