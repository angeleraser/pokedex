import { PokemonCardComponent } from "./components.js";
import { getPokemons } from "./poke-api.js";
import { getDocumentScrollPercentage } from "./utils.js";

const pokemonList = document.getElementById("pokemon-list");
const loadingPokeball = document.getElementById("loading-pokeball");

const MAX_POKEMONS_COUNT = 20;
let pokemonsOffset = 0;
let loadingPokemons = false;

async function showPokemonCards(offset) {
  try {
    loadingPokemons = true;
    loadingPokeball.style.display = "inline-block";
    const pokemons = await getPokemons({ limit: MAX_POKEMONS_COUNT, offset });

    pokemons.forEach((pokemon, index) => {
      const card = new PokemonCardComponent(pokemon).root;
      pokemonList.appendChild(card);
      if (index === 0) card.scrollIntoView({ behavior: "smooth" });
    });
  } finally {
    loadingPokeball.style.display = "none";
    loadingPokemons = false;
  }
}

window.addEventListener("scroll", function handleShowScroll() {
  const isMaxScroll = getDocumentScrollPercentage() === 100;
  if (isMaxScroll && !loadingPokemons)
    showPokemonCards((pokemonsOffset += MAX_POKEMONS_COUNT));
});

showPokemonCards(pokemonsOffset);