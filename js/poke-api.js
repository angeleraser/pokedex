export class Pokemon {
  constructor({
    name = "",
    hp = 0,
    description = "",
    types = [""],
    id = 0,
    ability = "",
    imgUrl = "./assets/no-pokemon.png",
  }) {
    this.name = name;
    this.hp = hp;
    this.description = description;
    this.types = types;
    this.id = id;
    this.ability = ability;
    this.imgUrl = imgUrl ?? "./assets/no-pokemon.png";
  }
}

async function getPokemonDescriptionBy(id) {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const defaultText = "No description";

  if (!resp.ok) return defaultText;

  const { flavor_text_entries } = await resp.json();

  if (!flavor_text_entries.length) return defaultText;

  const flavorText =
    flavor_text_entries.find((text) => text.language.name === "en")
      ?.flavor_text || flavor_text_entries[0]?.flavor_tex;

  return flavorText.replaceAll("", " ");
}

async function getPokemonBy(id) {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await resp.json();
  const description = await getPokemonDescriptionBy(id);
  const { other } = data.sprites;

  const imgUrl =
    other.dream_world.front_default ||
    other.home.front_default ||
    other["official-artwork"].front_default;

  const { ability } = data.abilities.find((ability) => !ability.is_hidden);
  const hpStat = data.stats.find((item) => item.stat.name === "hp");
  const types = data.types.map(({ type: { name } }) => name);

  return new Pokemon({
    ability: ability?.name.replaceAll("-", " "),
    description,
    hp: hpStat.base_stat,
    id: data.id,
    imgUrl,
    name: data.name.replaceAll("-", " "),
    types,
  });
}

export async function getPokemons({ limit, offset }) {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const { results } = await resp.json();

  const pokemonRequests = results.map((item) => {
    const [, , , , , , id] = item.url.split("/");
    return getPokemonBy(id);
  });

  const pokemonsData = await Promise.allSettled(pokemonRequests);

  return pokemonsData.filter(({ value }) => value).map(({ value }) => value);
}