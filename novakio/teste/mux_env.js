// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", async () => {
  // Log inicial para indicar início do monitoramento
  console.log(
    "Iniciando monitoramento de visualizações para múltiplos vídeos..."
  );

  /**
   * Função assíncrona para buscar visualizações de um vídeo específico pelo título
   * @param {string} videoTitle - Título do vídeo a ser buscado
   * @returns {Promise<number>} - Número total de visualizações
   */
  async function fetchViewsByTitle(videoTitle) {
    // Constrói URL do proxy com parâmetro de título do vídeo
    const proxyUrl = `http://localhost:3000/video-views?video_title=${encodeURIComponent(
      videoTitle
    )}`;

    // Log para debug - mostra qual vídeo está sendo buscado
    console.log(`🔗 Buscando visualizações para: ${videoTitle}`);

    try {
      // Faz requisição GET ao proxy local
      const response = await fetch(proxyUrl);

      if (response.ok) {
        const data = await response.json();
        console.log(`📊 Dados recebidos para "${videoTitle}":`, data);

        // Retorna o número de visualizações ou 0 se não houver
        return data.total_row_count || 0;
      } else {
        // Tratamento de erro HTTP
        console.error(
          `❌ Erro ao buscar visualizações para "${videoTitle}":`,
          response.statusText
        );
        return 0;
      }
    } catch (error) {
      // Tratamento de erro de rede ou outras exceções
      console.error(`❌ Erro na requisição para "${videoTitle}":`, error);
      return 0;
    }
  }

  // Seleciona todos os containers de vídeo da página
  const videoContainers = document.querySelectorAll(".video-container");

  // Itera sobre cada container para buscar e exibir visualizações
  for (const container of videoContainers) {
    // Obtém o iframe e o elemento de contador dentro do container
    const iframe = container.querySelector("iframe");
    const viewsCounter = container.querySelector(".views-counter");

    // Extrai o título do vídeo da URL do iframe
    const iframeSrc = iframe.getAttribute("src");
    const urlParams = new URLSearchParams(iframeSrc.split("?")[1]);

    // Prioriza metadata-video-title, fallback para video-title
    const videoTitle =
      urlParams.get("metadata-video-title") || urlParams.get("video-title");

    // Se título válido e contador existir, busca e atualiza visualizações
    if (videoTitle && viewsCounter) {
      const views = await fetchViewsByTitle(videoTitle);
      viewsCounter.textContent = `Visualizações: ${views}`;
    }
  }

  // Log de conclusão do processamento
  console.log(
    "✅ Monitoramento de visualizações concluído para todos os vídeos"
  );
});
