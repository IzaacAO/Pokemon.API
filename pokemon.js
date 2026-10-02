async function buscarPokemon(nombre) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return null;
  }

  return await respuesta.json();
}

async function main() {
  const datos = await buscarPokemon("pikachu");

  if (datos === null) {
    return; 
  }

  console.log("INFORMACIÓN DE: " + datos.name + " (ID: " + datos.id + ")");

  console.log("Tipos:");
  for (const t of datos.types) {
    console.log(` ${t.type.name}`);
  }

  console.log("Stats base:");
  for (const s of datos.stats) {
    console.log(`- ${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Habilidades:");
  for (const a of datos.abilities) {
    console.log(`- ${a.ability.name}`);
  }
}

main();