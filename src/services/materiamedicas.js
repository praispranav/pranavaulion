import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/materiamedicas';


  function materiamedicaUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMateriamedicas() {
    return http.get(apiEndpoint);
  }
  
  export function getMateriamedica(Id) {
    return http.get(materiamedicaUrl(Id));
  }
  
  export function saveMateriamedica(materiamedica) {
    //clone
    const body = { ...materiamedica };
    console.log(body);
   //update
   if (materiamedica.id) {
     //delete _id
     delete body.id;
     return http.put(materiamedicaUrl(materiamedica.id),body);
   }
 
   //add a new materiamedica
   return http.post(apiEndpoint, materiamedica);
 }
  
  //delete materiamedicas
  export function deleteMateriamedica(Id) {
    return http.delete(materiamedicaUrl(Id));
  }  