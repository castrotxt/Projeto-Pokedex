// todas as const buscam algo dentro do index.html
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
// define como 1 o pokemon inicial ao primeiro contato com a pagina
let searchPokemon = 1;

//manda o ultimo pokemon gerado pro local storage 
window.addEventListener('beforeunload', () => {
  localStorage.setItem('lastPokemon', searchPokemon);
});

// busca o ultimo pokemon gerado no local storege e imprime ele após o retorno a pagina
const lastPokemon = localStorage.getItem('lastPokemon');
  if (lastPokemon) {
    searchPokemon = parseInt(lastPokemon);
};

// const que busca a API 
const fetchPokemon =  async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  // verifica se a resposta do API foi realizada com sucesso caso seja envia o pokemon
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  };
};

const renderPokemon = async (pokemon) => {
  // Define o conteúdo do elemento com a classe "pokemon_name" como "Loading..."
  pokemonName.innerHTML = 'Loading...';
  // Limpa o conteúdo do elemento com a classe "pokemon_number"
  pokemonNumber.innerHTML = '';
  // Obtem os dados do Pokémon a partir da função "fetchPokemon"
  const data = await fetchPokemon(pokemon);
  // Verifica se os dados foram obtidos com sucesso
  if (data) {
    // Exibe a imagem do Pokémon
    pokemonImage.style.display = 'block';
    // Define o conteúdo do elemento com a classe "pokemon_name" como o nome do Pokémon
    pokemonName.innerHTML = data.name;
    // Definie o conteúdo do elemento com a classe "pokemon_number" como o número do Pokémon
    pokemonNumber.innerHTML = data.id;
    // Definie a fonte da imagem do Pokémon com a URL da imagem fornecida na resposta da API
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    // Limpa o valor do input de pesquisa
    input.value = '';
    // Atualiza o número do Pokémon que está sendo pesquisado
    searchPokemon = data.id;
  } else {
    // Esconde a imagem do Pokémon que tinha sido gerado por ultimo antes de entrar no erro not found
    pokemonImage.style.display = 'none';
    // Define o conteúdo do elemento com a classe "pokemon_name" como "Not found :c" caso o pokemon pesquisado não seja encontrado
    pokemonName.innerHTML = 'Not found :c';
    // Limpa o valor do input de pesquisa
    pokemonNumber.innerHTML = '';
  }
};

// envia o pokemon pesquisado mesmo se for escrito todo em maiuscula ou minuscula
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// faz o botão pra voltar funcionar
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  };
});

// faz o botão pra avançar funcionar
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);