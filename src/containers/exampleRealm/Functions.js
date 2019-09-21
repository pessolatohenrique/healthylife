const createLanguages = (realm) => {
  realm.write(() => {
    realm.create(
      'Category',
      {
        id: 1,
        name: 'Mobile',
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Category',
      {
        id: 2,
        name: 'Front-end',
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Category',
      {
        id: 3,
        name: 'Back-end',
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Language',
      {
        id: 1,
        name: 'React Native',
        description: 'Utilizado para desenvolver apps mobile',
        image: 'https://victorvhpg.github.io/minicurso-react.js/slides/img/logo.png',
        category: { id: 1, name: 'Mobile' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Language',
      {
        id: 2,
        name: 'React JS',
        description: 'Utilizado para desenvolver interfaces web',
        image: 'https://victorvhpg.github.io/minicurso-react.js/slides/img/logo.png',
        category: { id: 2, name: 'Front-end' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Language',
      {
        id: 3,
        name: 'Node JS',
        description: 'Backend em Javascript',
        image: 'https://www.opus-software.com.br/wp-content/uploads/2018/09/nodejs.jpg',
        category: { id: 3, name: 'Back-end' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Language',
      {
        id: 4,
        name: 'Javascript',
        description: 'Linguagem de programação de alto nível',
        image: 'https://seeklogo.com/images/J/javascript-logo-E967E87D74-seeklogo.com.png',
        category: { id: 2, name: 'Front-end' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );
  });

  return realm;
};

const addNewLanguage = (realm) => {
  realm.write(() => {
    realm.create(
      'Language',
      {
        id: 5,
        name: 'HTML',
        description: 'Linguagem de marcação',
        image: 'https://logodownload.org/wp-content/uploads/2016/10/html5-logo-8.png',
        category: { id: 2, name: 'Front-end' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );

    realm.create(
      'Language',
      {
        id: 6,
        name: 'CSS',
        description: 'Linguagem de estilização em cascata',
        image: 'http://verekia.com/_pages/css3/introduction-css3/img/css3-logo.png',
        category: { id: 2, name: 'Front-end' },
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );
  });

  return realm;
};

/**
 * realiza a pesquisa de itens, dentro de um array realm
 * @param {Object} realm dados do banco de dados realm
 * @param {String} text texto a ser procurado
 * @return {Array} filteredItens itens encontrados
 */
const search = (realm, text) => {
  const filteredItems = realm
    .objects('Language')
    .filtered(
      'name CONTAINS[c] $0 OR description CONTAINS[c] $0 OR category.name CONTAINS[c] $0',
      text,
    )
    .sorted('name');

  return filteredItems;
};

export { createLanguages, addNewLanguage, search };
