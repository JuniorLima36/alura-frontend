async function buscarVideos() {
  try {
    const response = await fetch('http://localhost:3000/videos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return [];
  }
}

function criarCardVideo(video) {
  return `
    <li class="video-card">
      <iframe width="100%" height="72%" src="${video.url}"
        title="${video.titulo}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      <div class="descricao-video">
        <img src="${video.imagem}" alt="Imagem do vídeo">
        <h3>${video.titulo}</h3>
        <p>${video.descricao}</p>
      </div>
    </li>
  `;
}

function atualizarContainer(container, videos) {
  container.innerHTML = videos.length > 0 ? videos.map(criarCardVideo).join('') : '<p class="mensagem-titulo">Nenhum vídeo disponível.</p>';
}

async function listarVideos() {
  const containerVideos = document.getElementById('videos-container');
  const videos = await buscarVideos();
  atualizarContainer(containerVideos, videos);
}

function toggleVisibility(containerId, isVisible) {
  document.getElementById(containerId).style.display = isVisible ? 'flex' : 'none';
}

function enviarVideo() {
  toggleVisibility('videos-container', false);
  toggleVisibility('container', true);
}

function mostrarVideo() {
  toggleVisibility('videos-container', true);
  toggleVisibility('container', false);
}

async function cadastrarVideo(event) {
  event.preventDefault();
  
  const url = document.getElementById('url').value;
  const titulo = document.getElementById('titulo').value;
  const imagem = document.getElementById('imagem').value;
  const descricao = `${Math.floor((Math.random() * 10) + 1)} mil visualizações`;

  try {
    const videos = await buscarVideos();
    const novoId = (videos.reduce((maxId, video) => Math.max(maxId, video.id), 0) + 1).toString();
    const novoVideo = { id: novoId, url, titulo, imagem, descricao };

    const response = await fetch('http://localhost:3000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoVideo)
    });

    if (!response.ok) throw new Error('Erro ao cadastrar vídeo');

    document.getElementById('mensagem').style.display = 'block';
    document.getElementById('url').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('imagem').value = '';

    setTimeout(() => {
      document.getElementById('mensagem').style.display = 'none';
      mostrarVideo();
    }, 2000);
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function pesquisarVideo() {
  const termoPesquisa = document.getElementById('pesquisar').value.toLowerCase();
  const containerVideos = document.getElementById('videos-container');

  try {
    const videos = await buscarVideos();
    const videosFiltrados = videos.filter(video => video.titulo.toLowerCase().includes(termoPesquisa));
    atualizarContainer(containerVideos, videosFiltrados);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
  }

  document.getElementById('pesquisar').value = '';
}

listarVideos();
