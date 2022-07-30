import { v4 as uuidv4 } from 'uuid';

class Tarea{
  id = '';
  desc = '';
  completadoEn = null;

  constructor(desc,uuid = null, completadoEn = null){

    this.id = uuid ? uuid : uuidv4();
    this.desc = desc;
    this.completadoEn = completadoEn ? completadoEn : null;
  }

}

export { Tarea };
