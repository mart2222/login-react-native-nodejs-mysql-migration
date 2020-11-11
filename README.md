
# Olá :cat:

### Projeto em React-Native + Push Notification + Login/Register + NodeJS + Mysql + Migration

## Configurações
No servidor incluir as configurações no arquivo ".env" e no App o arquivo "app.json", ambos na raiz de cada pasta


## Intalação do servidor

`$ npm install`
`$ npx sequelize db:migrate`

---

## Iniciar o servidor

`$ npm run dev`

---

## Intalação do app

`$ npm install`
`$ react-native link`

---

## Iniciar o aplicativo no emulador

`$ react-native run-android`

---

## Usando o app

Página de login e registro normais;
Ao se autenticar você será redirecionado para página de grupos, nele você pode pressionar "+" para adicionar um grupo novo. 
Os grupo listados ao serem pressionados você irá ser vinculado ao grupo, para desvincular só pressionar novamente, ao deixar um pouco pressionado você pode excluir o grupo.
Para mandar notificação para um grupo específico por Push Notification, será necessário enviar uma requisição para o servidor com o método POST para o endpoint "/api/notificacao/:grupoId". Exemplo curl : 

```sh
curl -X POST \
  http://localhost:3000/api/notificacao/3 \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"title": "Comunicado",
	"message": "Amanhã será o evento \"Leve seu mascote\""
}'
```
---

### Pré visualização do app

---
<img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/1.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/2.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/3.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/4.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/5.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/6.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/7.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/8.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/9.jpg" width="200" height="400"> <img src="https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/10.jpg" width="200" height="400">

---

### Obrigado! :100: