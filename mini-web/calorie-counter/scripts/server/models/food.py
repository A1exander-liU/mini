from db_base import db;

class Food(db.Model):
  __tablename__ = 'foods'

  Food_Code = db.Column(db.Integer, primary_key=True)
  Display_Name = db.Column(db.Text)
  Calories_By_Portion = db.Column(db.JSON)
