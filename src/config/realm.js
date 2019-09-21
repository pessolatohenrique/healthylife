import Realm from 'realm';

// Define your models and their properties
// language.category = { name: 'Backend' }
const LanguageSchema = {
  name: 'Language',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    category: 'Category',
    name: 'string',
    description: 'string',
    image: 'string',
    created_at: 'date',
    updated_at: 'date',
  },
};

/* categoryList.push({
    name: 'PHP',
    description: 'Atualmente está na versão 7.1',
    image: 'uma imagem aqui'}),
    created_at: new Date(),
    updated_at: new Date()
*/
const CategorySchema = {
  name: 'Category',
  languages: 'Language[]',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    created_at: 'date',
    updated_at: 'date',
  },
};

const getRealm = () => Realm.open({
  schema: [LanguageSchema, CategorySchema],
}).catch(error => console.tron.error('Error realm open', error));

export { LanguageSchema, CategorySchema, getRealm };
