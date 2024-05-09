from sqlalchemy.orm import Session

from . import models, schemas


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def get_product_by_category(db: Session, category: str):
    return db.query(models.Product).filter(models.Product.category == category).all()


def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def change_product_availability(db: Session , product_id: int, availability: bool):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product is None:
            return None
    
    setattr(db_product, 'availability', availability)
    db.commit()
    db.refresh(db_product)
    return db_product
