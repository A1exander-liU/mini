from os import getenv;

from dotenv import load_dotenv;
from flask import Flask;
from sqlalchemy import select, or_;

from db_base import db;
from models.food import Food;

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv("DATABASE_URL")
db.init_app(app)

BASE = '/api'

@app.get(f'{BASE}/v1/food/<name>')
def get_food_items(name: str):
  lowered = name.lower()
  stmt = select(Food).where(
    or_(
      Food.Display_Name.ilike(f'{name}%'),
      Food.Display_Name.regexp_match(rf'\b{lowered}\b')
    )
  )
  result = db.session.execute(stmt);

  foods = []
  for scalar in result.scalars():
    foods.append(
      { 
        'Display_Name': scalar.Display_Name,
        'Calories_By_Portion': scalar.Calories_By_Portion
      }
    )

  return foods

if __name__ == "__main__":
  app.run(debug=True)