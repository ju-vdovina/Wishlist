# SQLAlchemy models
from sqlalchemy import Boolean, Column, Integer, String, Float

from .database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    category = Column(String, index=True)
    is_many = Column(Boolean, index=True)
    price = Column(Float, index=True)
    description = Column(String, index=True)
    shop = Column(String, index=True, default='')
    availability = Column(Boolean, index=True, default=True)
