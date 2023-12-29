import pandas as pd;
import numpy as np;

import pprint;
import json;

def read_excel(path: str) -> pd.DataFrame:
  data: pd.DataFrame = pd.read_excel(path)
  return data

def food_data() -> dict:
  data = read_excel("./data/myfoodapediadata/Food_Display_Table.xlsx")
  data = data.fillna('')

  cols = ['Food_Code', 'Display_Name'];
  combined_cols = [col for col in data.columns if col not in cols]

  groups = data.groupby(['Food_Code', 'Display_Name'])
  final = groups.apply(lambda x: x[combined_cols].to_dict('records')).reset_index(name='Calories_By_Portion').to_dict('records')

  return final;

def food_condiments_data():
  condiment_data = read_excel("./data/myfoodapediadata/Foods_Needing_Condiments_Table.xlsx");
  lu_condiment_data = read_excel("./data/myfoodapediadata/lu_Condiment_Food_Table.xlsx");

  conds = [1,2,3,4,5]

  food_condiments = []
  for _, row in condiment_data.iterrows():
    nans = row.isna().to_dict()
    data = row.to_dict()

    cond_array =  []
    for cond in conds:
      if not nans[f'cond_{cond}_name']:
        cond_array.append({ f'cond_{cond}_name': data[f'cond'] })
        

    # for cond in conds:
    #   if row[f"cond_{cond}_name"] is None:
    #     print(True)

def main():

  foods = food_data()
  # pprint.pprint(foods)

  with open('./foods.json', 'w') as json_file:
    json.dump(foods, json_file)

  return

if __name__ == "__main__":
  main()