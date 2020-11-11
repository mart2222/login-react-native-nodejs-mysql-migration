
# Olá :cat:

### Projeto em React-Native + Push Notification + Login/Register + NodeJS + Mysql + Migration

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

![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/1.jpg =200x400)   ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/2.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/3.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/4.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/5.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/6.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/7.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/8.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/9.jpg =200x400) ![](https://raw.githubusercontent.com/mart2222/login-react-native-nodejs-mysql-migration/master/prints/10.jpg =200x400)

---

### Obrigado! :100: