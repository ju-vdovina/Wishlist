# Pydantic models
from pydantic import BaseModel, Field
from enum import Enum


class Category(str, Enum):
    life_and_home = "Быт и дом"
    health_and_beauty = "Красота и здоровье"
    food = "Еда"
    apparel_and_accessories = "Одежда и аксессуары"


class Product(BaseModel):
    id: int
    title: str
    category: Category
    is_many: bool
    price: float
    description: str
    shop: str = Field(default='')
    availability: bool = Field(default=True)
    

class ProductCreate(BaseModel):
    title: str
    category: Category
    is_many: bool
    price: float
    description: str
    shop: str = Field(default='')
    availability: bool = Field(default=True)


class ProductUpdate(BaseModel):
    id: int
    availability: bool
