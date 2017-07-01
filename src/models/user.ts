import { Legajo } from './legajo';
import { ERol } from "../models/ERol";
import { Domicilio } from "../models/domicilio";

export class User {

  public id?: Number;
  public nombre?: String;
  public apellido?: String;
  public documento?: String;
  public legajo?: Legajo;
  public email?: String;
  public password?: String;
  public fnacimiento?: Date;
  public rol?: ERol;
  public image?: String;
  public sexo?: String;
  public domicilio?: Domicilio;
  public rol_id?: number;
  constructor() {
  }

}
