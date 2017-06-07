import { ERol } from "../models/ERol";
import { Domicilio } from "../models/domicilio";

export class User {

  private id: Number;
  private nombre: String;
  private apellido: String;
  private documento: String;
  private legajo: String;
  private email: String;
  private password: String;
  private fnacimiento: Date;
  private rol: ERol;
  private image: String;
  private sexo: String;
  private domicilio: Domicilio;

  constructor(nombre: String, apellido: String, documento: String, email: String, password: String,
    fnacimiento: Date, rol: ERol, image: String, sexo: String, domicilio: Domicilio, id?: Number, legajo?: String) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.email = email;
    this.legajo = legajo;
    this.password = password;
    this.fnacimiento = fnacimiento;
    this.rol = rol;
    this.image = image;
    this.sexo = sexo;
    this.domicilio = domicilio;
  }

	public get $id(): Number {
		return this.id;
	}

	public get $nombre(): String {
		return this.nombre;
	}

	public get $apellido(): String {
		return this.apellido;
	}

	public get $documento(): String {
		return this.documento;
	}

	public get $legajo(): String {
		return this.legajo;
	}

	public get $email(): String {
		return this.email;
	}

	public get $password(): String {
		return this.password;
	}

	public get $fnacimiento(): Date {
		return this.fnacimiento;
	}

	public get $rol(): ERol {
		return this.rol;
	}

	public get $image(): String {
		return this.image;
	}

	public get $sexo(): String {
		return this.sexo;
	}

	public get $domicilio(): Domicilio {
		return this.domicilio;
	}
}
