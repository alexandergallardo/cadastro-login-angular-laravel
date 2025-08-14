// Carrega variáveis de ambiente do arquivo de configuração da Mux
require("dotenv").config({ path: "./mux-Production.env" });

// Importa bibliotecas necessárias
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

// Inicializa a aplicação Express
const app = express();

// Habilita CORS para permitir requisições do frontend
app.use(cors());

/**
 * Rota raiz - endpoint de verificação do proxy
 * Retorna mensagem indicando que o proxy está funcionando
 */
app.get("/", (req, res) => {
  res.send("Proxy Mux rodando. Use o endpoint /video-views para obter dados.");
});

/**
 * Função principal para buscar visualizações de vídeo pelo título
 * @param {string} videoTitle - Título do vídeo a ser buscado
 * @param {string} auth - Token de autenticação em base64
 * @returns {Promise<Object>} - Objeto com dados de visualizações filtradas
 */
async function getViewsByVideoTitle(videoTitle, auth) {
  try {
    // Log de início da busca
    console.log(`Buscando visualizações para vídeo: ${videoTitle}`);

    // URL da API Mux para buscar visualizações dos últimos 90 dias
    const url = `https://api.mux.com/data/v1/video-views?timeframe[]=90:days`;

    // Configuração da requisição com autenticação básica
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + auth,
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Filtra as visualizações pelo título do vídeo
      const filteredViews = data.data.filter(
        (view) => view.video_title === videoTitle
      );

      console.log(
        `Encontradas ${filteredViews.length} visualizações para "${videoTitle}"`
      );

      // Retorna objeto estruturado com dados filtrados
      return {
        total_row_count: filteredViews.length,
        data: filteredViews,
        filtered_by: videoTitle,
      };
    } else {
      // Tratamento de erro HTTP da API Mux
      console.error(
        "Erro na resposta da API Mux:",
        response.status,
        response.statusText
      );
      throw new Error(
        `Erro ao buscar visualizações: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    // Tratamento de erro de rede ou outras exceções
    console.error("Erro ao buscar visualizações:", error.message);
    throw error;
  }
}

/**
 * Endpoint principal do proxy para buscar visualizações de vídeo
 * Aceita parâmetro video_title ou title na query string
 */
app.get("/video-views", async (req, res) => {
  try {
    // Obtém credenciais das variáveis de ambiente
    const tokenId = process.env.MUX_TOKEN_ID;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;

    // Valida se as credenciais estão configuradas
    if (!tokenId || !tokenSecret) {
      return res.status(500).send("Credenciais da Mux não configuradas.");
    }

    // Cria token de autenticação em base64
    const auth = Buffer.from(`${tokenId}:${tokenSecret}`).toString("base64");

    // Obtém título do vídeo dos parâmetros da requisição
    const videoTitle = req.query.video_title || req.query.title;

    // Valida se o título foi fornecido
    if (!videoTitle) {
      return res
        .status(400)
        .send("Parâmetro video_title ou title é obrigatório.");
    }

    // Busca dados de visualizações
    const viewsData = await getViewsByVideoTitle(videoTitle, auth);

    // Retorna resposta JSON com os dados
    res.json(viewsData);
  } catch (error) {
    // Tratamento de erro geral
    res
      .status(500)
      .send("Erro ao buscar dados da API da Mux: " + error.message);
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Proxy rodando em http://localhost:3000");
});
