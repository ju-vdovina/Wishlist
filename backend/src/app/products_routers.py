from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

from . import crud, schemas
from .init import get_db


router = APIRouter(
    prefix='/products',
    tags=["products"]
)

@router.post("/", response_model=schemas.ProductCreate)
def create_product(product: schemas.ProductCreate = Depends(), db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)


@router.get("/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products


@router.get("/{product_id}/", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.patch("/{product_id}", response_model=schemas.Product)
def change_product_availability(product_id: int, availability: bool, db: Session = Depends(get_db)):
    return crud.change_product_availability(db=db, product_id=product_id, availability=availability)