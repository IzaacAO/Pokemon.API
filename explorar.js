const prompt = require('prompt-sync')();

async function buscar() {
  const nombre = prompt('¿Qué pokémon quieres elegir? (pikachu, charizard, bulbasaur): ').trim().toLowerCase();
  console.log(`Pokémon elegido: ${nombre}!`);

  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  console.log("Status:", respuesta.status);

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return null;
  }

  const datos = await respuesta.json();
  console.log(datos);
  console.log("=====================================");

  for (const t of datos.types) {
    console.log(t.type.name);
  }
  for (const s of datos.stats) {
    console.log(s.stat.name, s.base_stat);
  }
  for (const a of datos.abilities) {
    console.log(a.ability.name);
  }
}

buscar();
  
