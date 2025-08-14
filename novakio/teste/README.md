# Teste Mux - Monitoramento de Visualizações

## Descrição do Projeto

Este projeto demonstra a integração com a API da Mux para monitoramento de visualizações de vídeos. Ele consiste em um frontend HTML que exibe players de vídeo Mux e um backend proxy que busca dados de visualizações da API Mux.

## Arquitetura

O projeto é dividido em três componentes principais:

### 1. Frontend (testeMux.html)

- **Descrição**: Página HTML que exibe players de vídeo Mux
- **Funcionalidades**:
  - Exibe múltiplos vídeos Mux em iframes
  - Mostra contadores de visualizações dinâmicos
  - Integração com JavaScript para busca de dados

### 2. Cliente JavaScript (mux_env.js)

- **Descrição**: Script que gerencia a comunicação entre frontend e backend
- **Funcionalidades**:
  - Busca visualizações por título de vídeo
  - Atualiza contadores dinamicamente
  - Tratamento de erros e logs detalhados

### 3. Proxy Server (proxy.js)

- **Descrição**: Servidor Express que atua como proxy para a API Mux
- **Funcionalidades**:
  - Autenticação segura com credenciais Mux
  - Busca de visualizações dos últimos 90 dias
  - Filtragem por título de vídeo
  - CORS habilitado para requisições cross-origin

## Instalação e Configuração

### Pré-requisitos

- Node.js instalado
- Conta Mux com credenciais válidas

### Passos de Instalação

1. **Clonar o projeto**

   ```bash
   git clone [url-do-repositorio]
   cd [nome-do-diretorio]
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**

   - Criar arquivo `mux-Production.env` na raiz
   - Adicionar as seguintes variáveis:

   ```
   MUX_TOKEN_ID=seu_token_id
   MUX_TOKEN_SECRET=seu_token_secret
   ```

4. **Iniciar o servidor**

   ```bash
   node proxy.js
   ```

5. **Acessar a aplicação**
   - Abrir `testeMux.html` no navegador
   - O servidor proxy rodará em `http://localhost:3000`

## Endpoints da API

### GET /video-views

Busca visualizações de um vídeo específico.

**Parâmetros:**

- `video_title` ou `title` (obrigatório): Título do vídeo a ser buscado

**Exemplo de requisição:**

```
GET http://localhost:3000/video-views?video_title=teste
```

**Resposta de sucesso:**

```json
{
  "total_row_count": 42,
  "data": [...],
  "filtered_by": "teste"
}
```

## Estrutura dos Arquivos

```
├── testeMux.html      # Frontend HTML
├── mux_env.js         # Lógica cliente JavaScript
├── proxy.js           # Servidor proxy Express
├── mux-Production.env # Variáveis de ambiente (não versionar)
├── package.json       # Dependências do projeto
└── README.md         # Este arquivo
```

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Node.js, Express.js
- **Bibliotecas**: node-fetch, cors, dotenv
- **API**: Mux Data API

## Segurança

- Credenciais Mux armazenadas em variáveis de ambiente
- Autenticação via Basic Auth com token base64
- CORS configurado para permitir apenas origens específicas (se necessário)

## Troubleshooting

### Erro: "Credenciais da Mux não configuradas"

- Verificar se o arquivo `mux-Production.env` existe
- Confirmar que as variáveis MUX_TOKEN_ID e MUX_TOKEN_SECRET estão corretas

### Erro: "Proxy rodando mas não recebe dados"

- Verificar se o servidor está rodando na porta 3000
- Confirmar que a API Mux está acessível
- Verificar logs do console para mais detalhes

### Erro: "CORS bloqueado"

- Verificar se o CORS está habilitado no proxy.js
- Confirmar que o frontend está acessando o proxy corretamente

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
