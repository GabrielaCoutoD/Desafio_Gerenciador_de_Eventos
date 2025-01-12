
# Desafio Neki – Gerenciador de Eventos 

## Descrição do Projeto
O Gerenciador de Eventos é um projeto de estudos desenvolvido para a empresa Neki como parte do processo seletivo após a Residência em TIC do SerraTec. O objetivo é criar um sistema que permita a um Administrador gerenciar eventos por meio de uma plataforma web ou mobile. O Administrador poderá cadastrar, listar, editar e remover eventos. Ele terá um login específico, criado na tela de cadastro de administrador. As senhas e outras informações sensíveis serão armazenadas de maneira criptografada no banco de dados, e o sistema usará Java Web Token para validar as requisições.
Este repositório contém a implementação FullStack do sistema, incluindo o desenvolvimento do BackEnd com o framework Spring Boot e do FrontEnd com os frameworks React para a versão web e React-Native para a versão mobile.

## Requisitos do Projeto:
### # Backend (Spring Boot

#### # Serviço de Login de Administrador:

• Verifique o email e senha para autenticação;

•	Retorne um token para os demais serviços;

#### # Serviço de Cadastro de Administrador:

•	Receba os dados de nome, email e senha para cadastro;

•	Armazene a senha de forma criptografada;

#### # Serviço de Listagem de Eventos:

•	Receba o id do administrador e retorne todos os eventos associados;

#### # Serviço de Cadastro de Evento:

•	Receba o nome, data, localização, imagem e adminId para associar o evento ao administrador;

#### # Serviço de Atualização de Evento:

•	Permita atualizar a data ou localização de um evento com base no eventoId;

#### # Serviço de Exclusão de Evento:

•	Exclua o evento usando o eventoId.

### # Frontend (React e React Native)

#### #Tela de Login:

•	Campos: Email do Administrador, Senha;

•	Caso opte por "Gravar Senha", salve para acesso rápido nas próximas vezes;

•	Botões: Entrar e Cadastrar-se.

#### #Tela de Cadastro de Administrador:

•	Campos: Nome do Administrador, Email, Senha, Confirmar Senha;

•	Valide se a senha coincide com o campo de confirmação;

•	Ao cadastrar, exiba uma mensagem de sucesso.

#### #Tela Home de Eventos:

•	Liste os eventos cadastrados pelo administrador, com imagem, título do evento, data e localização;

•	Opções de Editar data e localização;

•	Excluir evento da lista.

•	Botão de Adicionar Evento, que abrirá uma modal com:

■ Campos para nome do evento, data, localização e uma imagem;

■ Botão de salvar.

