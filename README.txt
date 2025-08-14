Instruções para rodar o projeto full-stack Angular + Laravel

Backend (Laravel):
1. Acesse a pasta backend_new:
   cd backend_new

2. Instale as dependências PHP com Composer:
   composer install

3. Copie o arquivo de ambiente e configure as variáveis (ex: banco de dados):
   cp .env.example .env
   (Edite o arquivo .env conforme seu ambiente)

4. Gere a chave da aplicação:
   php artisan key:generate

5. Rode as migrations para criar as tabelas no banco:
   php artisan migrate

6. (Opcional) Rode os seeders para popular dados iniciais:
   php artisan db:seed

7. Inicie o servidor local Laravel:
   php artisan serve

O backend estará disponível em http://localhost:8000

Frontend (Angular):
1. Acesse a pasta frontend:
   cd frontend

2. Instale as dependências Node:
   npm install

3. Inicie o servidor de desenvolvimento Angular:
   ng serve

O frontend estará disponível em http://localhost:4200

Observações:
- O backend usa Laravel Sanctum para autenticação com tokens JWT válidos por 2 horas.
- O frontend armazena o token JWT e usa Angular Material para feedbacks visuais.
- Certifique-se de que o backend e frontend estejam rodando simultaneamente para o funcionamento correto.
- Ajuste as URLs da API no frontend se necessário.

Comandos resumidos:

# Backend
cd backend_new
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve

# Frontend
cd frontend
npm install
ng serve
