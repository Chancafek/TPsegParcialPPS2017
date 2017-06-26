import { ETipoPregunta } from "../models/ETipoPregunta";

export class Pregunta {

    public id: Number;
    public id_encuesta: Number;
    public consigna: String;
    public tipo: ETipoPregunta;
    public tipo_id: number;
    public opciones: String[];
    public respuestas: String[];
    public resultado: Boolean;

    constructor() {
        this.opciones = new Array<String>();
        this.respuestas = new Array<String>();
    }

    public static buildPregunta(objeto:any): Pregunta{
        let pregunta: Pregunta = new Pregunta();

        pregunta.tipo = objeto.tipo_id;
        pregunta.consigna = objeto.texto;
        objeto.opciones.forEach(opcion => {
            pregunta.opciones.push(opcion.texto);
        });

        let respuestas:string[] = new Array<string>();
        for (var i = 0; i < objeto.opciones.length; i++) {
            for (var j = 0; j < objeto.respuestas.length; j++) {
                if(objeto.opciones[i].id == objeto.respuestas[j].opcion_id){
                    respuestas.push((i + 1).toString());
                    break;
                }
            }
        }
        pregunta.respuestas = respuestas;

        console.log("cree esto: ", pregunta);
        return pregunta;
    }

}