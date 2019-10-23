import Realm from 'realm';

// Define your models and their properties
const IndicativeSchema = {
  name: 'Indicative',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    imc: 'float',
    imc_classification: 'string',
    diet_value: 'int',
    consumed: 'float',
    consumed_percentage: 'float',
    created_at: 'date',
    updated_at: 'date',
  },
};

const getRealm = () => Realm.open({
  schema: [IndicativeSchema],
}).catch(error => console.tron.error('Error realm open', error));

export { IndicativeSchema, getRealm };
