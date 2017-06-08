import { Pregunta } from "../models/pregunta";

export class Encuesta {

    private id: Number;
    private preguntas: Pregunta[];
    private tema: String;
    private id_user: Number;


    constructor(tema: String, preguntas?: Pregunta[], id_user?: Number, id?: Number) {
        this.id = id;
        this.id_user = id_user;
        this.preguntas = preguntas;
        this.tema = tema;
    }

	public get $id(): Number {
		return this.id;
	}

	public get $preguntas(): Pregunta[] {
		return this.preguntas;
	}

	public get $tema(): String {
		return this.tema;
	}

	public get $id_user(): Number {
		return this.id_user;
	}

	public addPregunta(pregunta: Pregunta): void{
		this.preguntas.push(pregunta);
	}
}