# App

Gympass style app.

## RFs (Requisitos funcionais)

- [x] deve ser possivel se cadastrar
- [x] deve ser possivel se autenticar
- [x] deve ser possivel obter o perfil do usuario logado
- [] deve ser possivel obter o numero de check-ins realizados pelo usuario logado
- [] deve ser possivel o usuario ver o seu historico de check-ins
- [] deve ser possivel o usuario buscar academias proximas
- [] deve ser possivel o usuarios buscar academias pelo nome
- [x] deve ser possivel o usuario realizar check-in em uma academia
- [] deve ser possivel validar o check-in de um usuário
- [] deve ser possivel cadastrar uma academia 

## RN (Regras de negocios)

- [x] o usuário não deve poder se cadastrar com email duplicado
- [x] o usuário não pode fazer 2 check-ins no mesmo dia
- [] o usuário não pode fazer check-in se não estiver perto(100m) da academia
- [] o check-in só pode ser validado até 20min após criado
- [] o check-in só pode ser validado por administradores
- [] academinha só pode ser cadastrada por administradores


## RNFs (Requisitos não funcionais)

- [x] a senha do usuário precisa estar criptografada
- [x] os dados da aplicação precisa estar persistidos em um banco postegres
- [] todas as listas de dados precisam estar paginadas com 20 items por páginas
- [] O usuário deve ser identificado por um JWT(json web token)