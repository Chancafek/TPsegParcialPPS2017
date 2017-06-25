import { ETipoPregunta } from "../models/ETipoPregunta";

export class Pregunta {

    public id: Number;
    public id_encuesta: Number;
    public consigna: String;
    public tipo: ETipoPregunta;
    public opciones: String[];
    public respuestas: String[];
    public resultado: Boolean;

    constructor() {
        this.opciones = new Array<String>();
        this.respuestas = new Array<String>();
    }

}