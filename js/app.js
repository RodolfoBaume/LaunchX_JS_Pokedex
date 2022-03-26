    const pokeCard = document.querySelector('[poke-card]');
    const pokeName = document.querySelector('[poke-name]');
    const pokeImg = document.querySelector('[poke-img]');
    const pokeImgContainer = document.querySelector('[poke-img-container]');
    const pokeId = document.querySelector('[poke-id]');
    const pokeWeight = document.querySelector('[poke-weight]')
    const pokeHeight = document.querySelector('[poke-Height]')
    const pokeTypes = document.querySelector('[poke-types]');
    const pokeStats = document.querySelector('[stats-graph]')
   
    const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    fighting: "#C03028",
    water: "#6890F0",
    flying: "#A890F0",
    grass: "#78C850",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    psychic: "#F85888",
    rock: "#B8A038",
    ice: "#98D8D8",
    bug: "#A8B820",
    dragon: "#7038F8",
    ghost: "#705898",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    unknown: "#68A090"
};

const fetchPokemon = () =>{
    const pokeInput = document.getElementById("pokeInput");
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput.value.toLowerCase()}`;
    fetch(url).then((resp) => {
        if(resp.status != "200"){
            console.log(resp);
            notFound();
        }
        else {
            return resp.json();
        }
    }).then((data) => {
        createPokemon(data);          
    })
}

const createPokemon = (pokemon) => {
    pokeName.textContent = pokemon.name.toUpperCase();
    pokeImg.setAttribute('src',`https://serebii.net/pokemon/art/${pokemon.id.toString().padStart(3,0)}.png`);
    pokeId.textContent = `No. ${pokemon.id.toString().padStart(3,0)}`;
    pokeWeight.textContent = `Weight: ${pokemon.weight}`;
    pokeHeight.textContent = `Height: ${pokemon.height}`;
    pokemonTypes(pokemon.types);
    createChart(pokemon.stats, pokeStats);
}

// tipo
const pokemonTypes = (types) => {
    pokeTypes.innerHTML = '';  
    pokeTypes.textContent = 'Tipo'; //Leyenda tipo
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.classList = "tipo";
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name.toUpperCase();
        pokeTypes.appendChild(typeTextElement);
    })
}

// graficar stats
function createChart(stats, container) {
    container.innerHTML = '';
    pokeStats.textContent = 'Puntos de Base';
    
    let [spd, sdef, satk, def, atk, hp] = stats;
    let color = "#30A7D7";
  
    spd = spd.base_stat;
    sdef = sdef.base_stat;
    satk = satk.base_stat;
    def = def.base_stat;
    atk = atk.base_stat;
    hp = hp.base_stat;
  
    var options = {
      animationEnabled: true,
      height: 260,
      backgroundColor: "",
      axisY: {
        tickThickness: 0,
        lineThickness: 0,
        valueFormatString: " ",
        gridThickness: 0
      },
      axisX: {
        tickThickness: 0,
        lineThickness: 0
      },
      data: [
        {
          indexLabelFontSize: 14,
          toolTipContent: '<span style="color:#30A7D7"><strong>{y}</strong></span>',
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          indexLabelFontWeight: 400,
          indexLabelFontFamily: "Roboto",
          color: color,
          type: "bar",
          dataPoints: [
            { y: spd, label: "SPEED" },
            { y: sdef, label: "SP. DEFENSE" },
            { y: satk, label: "SP. ATTACK" },
            { y: def, label: "DEFENSE" },
            { y: atk, label: "ATTACK" },
            { y: hp, label: "HP" }
          ]
        }
      ]
    };
  
    $(container).CanvasJSChart(options);
  }

  //Pokemon no existe
  const notFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'img/pikachu-crying2.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeWeight.innerHTML = '';
    pokeHeight.innerHTML = ''; 
}
