export class Domicilio{
    
    private id:Number;
    private direccion:String;
    private latitud:Number;
    private longitud:Number;

    constructor(direccion:String, latitud:Number, longitud:Number, id?:Number){
        this.id = id;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
    }

	public get $id(): Number {
		return this.id;
	}

	public get $direccion(): String {
		return this.direccion;
	}

	public get $latitud(): Number {
		return this.latitud;
	}

	public get $longitud(): Number {
		return this.longitud;
	}
    
}