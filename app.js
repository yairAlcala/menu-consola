import { guardarDB,leerDb } from './helpers/guardarArchivo.js';
import { 
  inquirerMenu, 
  pausa, 
  leerInput, 
  listadoTareasDel, 
  confirmar,
  mostrarListadoCheck
} from './helpers/inquirer.js';

import {Tareas} from './models/Tareas.js';

const main = async() => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDb = leerDb();
  if(tareasDb){
    tareas.cargarTareasFromArray(tareasDb);
  }
  do {
    opt = await inquirerMenu();//Imprimir menú y esperar respuesta
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
      break;
      case '2':
        tareas.listadoCompleto();
      break;
      case '3':
        tareas.listarPendientesCompletadas();
      break;
      case '4':
        tareas.listarPendientesCompletadas(false);
      break;
      case '5':
        const ids = await mostrarListadoCheck(tareas.listadoArr);
        tareas.toggleCompletadas(ids)
      break;
      case '6':
        const id = await listadoTareasDel(tareas.listadoArr);
        if (id != 0){
          const ok = await confirmar('¿Estás seguro?');
          if(ok){
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
      break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();

  } while (opt !== '0');
}

main();
