# 💳 Microserviço de Pagamento (`payment`)

## 📌 Descrição

Este projeto implementa um microserviço de **pagamento** independente, desenvolvido em **Node.js (NestJS)** com **Prisma ORM**, banco de dados **PostgreSQL** e comunicação assíncrona via **RabbitMQ** com o microserviço de notificação.

O microserviço realiza o registro de transações de pagamento e envia notificações de registro e confirmação de forma assíncrona.

---

## 🧱 Tecnologias Utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- RabbitMQ
- Docker + Docker Compose
- Node.js v20.12.0

---

## 📂 Estrutura de Pastas

```bash
payment/
├── docker/
│   ├── docker-compose.yaml         # PostgreSQL e PGAdmin
│   └── docker-rabbit.yaml          # RabbitMQ
├── prisma/
│   ├── migrations/                 # Migrations Prisma
│   └── schema.prisma               # Definição do modelo CreditCard
├── src/
│   ├── credit-card/                # Módulo principal de pagamento
│   │   ├── credit-card.controller.ts
│   │   ├── credit-card.service.ts
│   │   └── credit-card.module.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── main.ts
```

---

## 🧪 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/cristianbrunone/ms-payment-service.git
cd payment
```

### 2. Subir containers do PostgreSQL e RabbitMQ

```bash
# Terminal 1 - Banco de Dados e PGAdmin
docker-compose -f docker/docker-compose.yaml up

# Terminal 2 - RabbitMQ
docker-compose -f docker/docker-rabbit.yaml up
```

### 3. Instalar dependências do projeto

```bash
npm install
```

### 4. Criar banco com Prisma

```bash
npx prisma migrate dev
```

### 5. Iniciar a aplicação

```bash
npm run start
```

---

## 📤 Exemplo de Requisição

**POST** `http://localhost:3000/credit-card/send`

```json
{
  "idUser": "123e4567-e89b-12d3-a456-426614174000",
  "orderNumber": 48,
  "orderValue": 850.99,
  "paymentConfirmed": false
}
```

**Resposta esperada (201 Created):**

```json
{
  "id": "c17ce577-cf41-4696-b4a2-99d52959ab41",
  "idUser": "123e4567-e89b-12d3-a456-426614174000",
  "orderNumber": 48,
  "orderValue": 850.99,
  "paymentConfirmed": false,
  "createAt": "2025-05-17T22:22:19.243Z",
  "updatedAt": "2025-05-17T22:22:19.243Z"
}
```

---

## 📸 Prints de Funcionamento


- 🗃️ Tabela `CreditCard` no pgAdmin  
   (screenshots/pgadmin-payment.png)

- ✅ Envio de Pagamento via ThunderClient  
  (screenshots/post-do-payment.png)

- 📧 Tabela `Mail` preenchida pelo serviço de notificação  
  (screenshots/pgadmin-mail.png)

- 📬 RabbitMQ  
  (screenshots/rabbitmq.png)

- 🖥️ Saída no Terminal com logs do processamento -service Notification: 
  (screenshots/saida-do-notification.png)

---

## 🔄 Comunicação Assíncrona

Este microserviço se comunica de forma assíncrona com o serviço de notificação via **RabbitMQ**:

- `register` → enviado após o registro do pagamento.
- `confirmation` → enviado após simulação de processamento (4 segundos).

---

## ✅ Critérios Atendidos

✔️ Serviços independentes (payment e notification)  
✔️ Comunicação assíncrona via RabbitMQ  
✔️ Fluxo completo de criação e confirmação de pagamento  

---

## ✍️ Autor

**Aluno:** Cristian Brunone  
**Curso:** Desenvolvimento de Sistemas Móveis e Distribuídos  
**Data:** Maio/2025
