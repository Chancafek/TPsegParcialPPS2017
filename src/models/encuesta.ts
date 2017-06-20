import { Pregunta } from "../models/pregunta";

export class Encuesta {

    public id: Number;
    public preguntas: Pregunta[];
    public tema: String;
    public id_user: Number;


    constructor() {
        this.preguntas = new Array<Pregunta>();
    }

}