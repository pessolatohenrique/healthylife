import Realm from 'realm';

// Define your models and their properties
const IndicativeSchema = {
  name: 'Indicative',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    imc: 'double',
    imc_classification: 'string',
    diet_value: 'int',
    consumed: 'double',
    consumed_percentage: 'double',
    created_at: 'date',
    updated_at: 'date',
  },
};

const getRealm = () => Realm.open({
  schema: [IndicativeSchema],
}).catch(error => console.tron.error('Error realm open', error));

export { IndicativeSchema, getRealm };
