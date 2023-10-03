import { Pokemon } from "./poke-api.js";

export class PokemonCardComponent {
  constructor(props) {
    /**
     * @type {Pokemon}
     */
    this.props = props;
    this.root = this.createRoot();
  }

  createRoot() {
    const root = document.createElement("div");
    root.classList.add("pokemon-card");

    const [primaryType, secondaryType] = this.props.types;

    root.style.backgroundColor = `var(--${primaryType})`;

    if (secondaryType) {
      root.style.backgroundImage = `linear-gradient(
        to left bottom,
        var(--${primaryType}),
        var(--${secondaryType})
      )`;
    }

    root.innerHTML = `
    <div class="pokemon-card-content">
      <div class="pokemon-card-header">
        <span class="pokemon-card-ability">${this.props.ability}</span>
        <span class="pokemon-card-name">${this.props.name}</span>
        <span class="pokemon-card-hp">${this.props.hp}</span>
      </div>

      <div class="pokemon-card-img">
        <img
          src="${this.props.imgUrl}"
          alt="${this.props.name}"
        />
      </div>

      <div class="pokemon-card-detail">
        ${this.props.description}
      </div>
      <div class="pokemon-card-types">
        ${this.props.types
          .map((name) => {
            return `<div data-pokemon-type="${name}" class="pokemon-card-type">${name}</div>`;
          })
          .join("")}
      </div>
      <div class="pokemon-card-id">#${this.props.id}</div>
    </div>
    `;

    return root;
  }
}
