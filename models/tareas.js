import {Tarea} from './Tarea.js';
import color from 'colors';

class Tareas{

  _listado = {};

  get listadoArr(){
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor(){
    this._listado = {};
  }

  borrarTarea(id=''){
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  crearTarea(desc = ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []){

    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea
    });

    /*Object.keys(tareas).forEach(key => {
      const nTarea = new Tarea(tareas[key].desc,tareas[key].id,tareas[key].completadoEn);
      this._listado[tareas[key].id] = nTarea;
      
    });*/
  }

  listadoCompleto(){
    console.log();
    this.listadoArr.forEach((data, i) =>{
      let tarea = `${ color.green((i+1)+'.')} `+ data.desc + ' :: ';
      tarea += (data.completadoEn) ? 'Completado'.green : 'Pendiente'.red;
      console.log(tarea);
    });
    /*Object.keys(this.listadoArr).forEach(key => {
      let tar = `${ color.green(cont+'.')} `+ this._listado[key].desc + ' :: ';
      tar += (this._listado[key].completadoEn) ? `${'Completado'.green}` : `${'Pendiente'.red}`;
      cont++;
      console.log(tar);
    });*/
  }

  listarPendientesCompletadas(completadas = true){
    console.log();
    let i = 0;
    this.listadoArr.forEach((data) =>{
      if(completadas){
        if(data.completadoEn){
          console.log(`${ color.green((i+1)+'.')} `+ data.desc + ' :: '+data.completadoEn.green);
        }
      }else{
        if(!data.completadoEn){
          console.log(`${ color.green((i+1)+'.')} `+ data.desc + ' :: '+'Pendiente'.red);
        }
      }
    });
  }

  toggleCompletadas(ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea =>{
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null
      }
    });
  }

}

export { Tareas };
