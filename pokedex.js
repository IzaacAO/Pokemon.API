
async function buscarPokemon(nombre) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
  const respuesta = await fetch(url);
 
  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return null;
  }
  return await respuesta.json();
}
 
async function search() {
  const pokemons = ["pikachu", "charizard", "bulbasaur", "pokemonfalso"];
 
  for (const nombre of pokemons) {
    const datos = await buscarPokemon(nombre);
 
    if (datos !== null) {
      console.log(datos.id, datos.name);
    }
  }
}
 
function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay nada que mostrar.");
    return;
  }
 
  const nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
  console.log("Nombre: " + nombre);
  console.log("Id: " + datos.id);
 
  const tipos = [];
  for (const t of datos.types) {
    tipos.push(t.type.name);
  }
  console.log("Tipo: " + tipos.join(" / "));
 
  console.log("Altura: " + datos.height * 10 + " cm");
  console.log("Peso: " + datos.weight / 10 + " kg");
 
  console.log("Stats:");
  for (const s of datos.stats) {
    console.log("  " + s.stat.name + ": " + s.base_stat);
  }
 
  console.log("Habilidades:");
  for (const a of datos.abilities) {
    const oculta = a.is_hidden ? " (oculta)" : "";
    console.log("  " + a.ability.name + oculta);
  }
}
 
function obtenerStat(datos, nombreStat) {
  for (const s of datos.stats) {
    if (s.stat.name === nombreStat) {
      return s.base_stat; 
    }
  }
  return null; 
}
 
async function compararPokemon(nombre1, nombre2, stat) {
  const p1 = await buscarPokemon(nombre1);
  const p2 = await buscarPokemon(nombre2);
 
  if (p1 === null || p2 === null) {
    console.log("No se puede comparar: alguno de los pokémon no existe.");
    return;
  }
 
  const valor1 = obtenerStat(p1, stat);
  const valor2 = obtenerStat(p2, stat);
 
  if (valor1 === null || valor2 === null) {
    console.log("La stat " + stat + " no es válida.");
    console.log("Stats válidas: hp, attack, defense, special-attack, special-defense, speed");
    return;
  }
 
  console.log(p1.name + ": " + valor1 + " vs " + p2.name + ": " + valor2 + " (" + stat + ")");
 
  if (valor1 > valor2) {
    console.log("Gana " + p1.name);
  } else if (valor2 > valor1) {
    console.log("Gana " + p2.name);
  } else {
    console.log("¡Empate!");
  }
}
 
async function pokemonMasFuerte(listaNombres, stat) {
  let mejorNombre = null;
  let mejorValor = -1;
 
  for (const nombre of listaNombres) {
    const datos = await buscarPokemon(nombre);
    if (datos === null) {
      continue; 
    }
 
    const valor = obtenerStat(datos, stat);
    if (valor === null) {
      continue; 
    }
 
    if (valor > mejorValor) {
      mejorValor = valor;
      mejorNombre = datos.name;
    }
  }
 
  if (mejorNombre === null) {
    console.log("No se encontró ningún ganador.");
    return null;
  }
 
  console.log("El más fuerte en " + stat + " es " + mejorNombre + " con " + mejorValor);
  return mejorNombre;
}
 
async function main() {
  // Ejercicio 2:
  await search();

  // Ejercicio 3: 
  mostrarFicha(await buscarPokemon("gengar"));
  mostrarFicha(await buscarPokemon("eevee"));

  // Ejercicio 4
  await compararPokemon("snorlax", "machamp", "hp");
  await compararPokemon("onix", "blastoise", "defense");
  await compararPokemon("pikachu", "raichu", "fuerza");

  // Ejercicio 5
  const equipo = ["charizard", "blastoise", "venusaur", "machamp", "gengar", "snorlax"];
  const masAtaque = await pokemonMasFuerte(equipo, "attack");
  await pokemonMasFuerte(equipo, "defense");

  if (masAtaque !== null) {
    mostrarFicha(await buscarPokemon(masAtaque));
  }

  
}
main();
