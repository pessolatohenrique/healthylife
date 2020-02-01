import Realm from "realm";

// Define your models and their properties
const IndicativeSchema = {
  name: "Indicative",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    imc: "double",
    imc_classification: "string",
    diet_value: "int",
    consumed: "double",
    consumed_percentage: "double",
    created_at: "date",
    updated_at: "date"
  }
};

const MealTypeSchema = {
  name: "MealType",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    description: "string",
    created_at: "date",
    updated_at: "date"
  }
};

const MealSchema = {
  name: "Meal",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    meal_type: { type: "MealType" },
    consumed_at: "string",
    calories_total: "double",
    created_at: "date",
    updated_at: "date"
  }
};

const WeightHistorySchema = {
  name: "WeightHistory",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    registered_at: "date",
    weight: "double",
    difference_weight: "double",
    difference_imc: "double",
    classification_imc: "string",
    created_at: "date",
    updated_at: "date"
  }
};

const WeightHistoryRegisterSchema = {
  name: "WeightHistoryRegister",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    registered_at: "date",
    weight: "double",
    method: "string",
    sync: "bool",
    created_at: "date",
    updated_at: "date"
  }
};

const FoodGroupSchema = {
  name: "FoodGroup",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    description: "string",
    portion: "double",
    created_at: "date",
    updated_at: "date"
  }
};

const FoodSchema = {
  name: "Food",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    group: { type: "FoodGroup" },
    description: "string",
    measure: "string",
    calories: "double"
  }
};

const MealFulfilledSchema = {
  name: "MealFulfilled",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    meal_type: { type: "MealType" },
    food: { type: "Food" },
    consumed_date: "string",
    consumed_time: "string",
    quantity: "double",
    calories_total: "double",
    created_at: "date",
    updated_at: "date"
  }
};

const getRealm = () =>
  Realm.open({
    schema: [
      IndicativeSchema,
      MealTypeSchema,
      MealSchema,
      WeightHistorySchema,
      WeightHistoryRegisterSchema,
      FoodGroupSchema,
      FoodSchema,
      MealFulfilledSchema
    ]
  }).catch(error => console.tron.error("Error realm open", error));

export { IndicativeSchema, getRealm };
