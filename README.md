# Healthy Life

### Sobre

Aplicativo de apoio à nutrição. O objetivo é acompanhar as refeições realizadas, verificando o total de calorias por refeição, bem como o histórico de peso, índice de massa corporal e estimativa de consumo energético, entre outras funcionalidades.

### Tecnologias

- React Native na versão 0.59.9
- Arquitetura offline first
- Consumo de API em Yii2 (framework php). Mais infos em: https://github.com/pessolatohenrique/Cibus
- Utilização de boas práticas e recursos modernos do universo react / react-native

### Instalação do projeto

Realizar o clone do projeto

    git clone https://github.com/USER/healthylife.git

Acesse a pasta do projeto e rode o comando para instalar as dependências npm:

    npm install

### Inicializando o projeto em múltiplos ambientes

    **Desenvolvimento**: `ENVFILE=.env && react-native run-android`
    **Homologação**: `ENVFILE=.env && react-native run-android`
    **Produção**: `ENVFILE=.env.production && react-native run-android`

    Para o Windows acrescentar o _SET_ no comando, por exemplo:
    `SET ENVFILE=.env.production && react-native run-android`
