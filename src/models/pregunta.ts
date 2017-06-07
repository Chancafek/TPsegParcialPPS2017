import { ETipoPregunta } from "../models/ETipoPregunta";

export class Pregunta {

    private id: Number;
    private id_encuesta: Number;
    private consigna: String;
    private tipo: ETipoPregunta;
    private opciones: String[];
    private respuestas: String[];

    constructor(consigna: String, tipo: ETipoPregunta, opciones: String[], respuestas: String[], id?: Number, id_encuesta?: Number) {
        this.consigna = consigna;
        this.tipo = tipo;
        this.opciones = opciones;
        this.respuestas = respuestas;
        this.id = id;
        this.id_encuesta = id_encuesta;
    }

	public get $id(): Number {
		return this.id;
	}

	public get $id_encuesta(): Number {
		return this.id_encuesta;
	}

	public get $consigna(): String {
		return this.consigna;
	}

	public get $tipo(): ETipoPregunta {
		return this.tipo;
	}

	public get $opciones(): String[] {
		return this.opciones;
	}

	public get $respuestas(): String[] {
		return this.respuestas;
	}

}