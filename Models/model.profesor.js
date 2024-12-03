class ModelProfesor{
    constructor(controller){
        this.dbController=controller
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    async validar(id) {
        const sql = `SELECT id_profesor FROM profesor WHERE id_profesor = ?`;
        
        // Abrir la base de datos (asegúrate de que 'this.dbController.open()' esté bien implementado)
        await this.dbController.open();
        
        try {
            // Ejecutar la consulta de manera asíncrona
            const row = await this.dbController.get(sql, [id]);

            // Si no se encuentra el id, 'row' será undefined
            if (row) {
                return true; // El id_profesor ya existe
            } else {
                return false; // El id_profesor no existe
            }
        } catch (err) {
            console.error("Error en la consulta:", err);
            throw new Error("Error al consultar la base de datos.");
        } finally {
            // Cerrar la base de datos si es necesario
            await this.dbController.close();
        }
    }


    get(id){
        const sql = `
        SELECT 
            p.id_profesor, 
            p.nombres, 
            p.apellidos, 
            f.nombre AS facultad_nombre, 
            s.status AS status
        FROM 
            profesor p
        JOIN 
            facultad f ON p.facultad_id = f.id_facultad
        JOIN 
            status s ON p.status_id = s.id_status
        WHERE p.id_profesor=?;
    `;
        this.dbController.open()
        const data = this.dbController.get(sql,[id])
        this.dbController.close()
        return data
    }
    /**
     * Devuelve la lista de todos los usuarios
     * @returns objeto con la lista de datos
     */
   async getAll(){
        const sql = `
        SELECT 
            p.id_profesor, 
            p.nombres, 
            p.apellidos, 
            f.nombre AS facultad_nombre, 
            s.status AS status
        FROM 
            profesor p
        JOIN 
            facultad f ON p.facultad_id = f.id_facultad
        JOIN 
            status s ON p.status_id = s.id_status;
    `;
        this.dbController.open()
        const data = this.dbController.all(sql,[])
        this.dbController.close()
        return data
    }
    /**
     * Inserta un registro en users
     * @param {*} datos arreglo de parametros [name,username]
     * @returns 
     */
    insert(datos){
        const sql='insert into profesor(id_profesor, nombres,  apellidos, facultad_id, status_id) values(?, ?, ?, ?, ?)'
        this.dbController.open()
        const data = this.dbController.run(sql,datos)
        this.dbController.close()
        return data
    }

    update(id, nombres, apellidos, facultad_id, status_id) {
        const sql = 'UPDATE profesor SET nombres = ?, apellidos = ?, facultad_id = ?, status_id = ? WHERE id_profesor = ?';
        this.dbController.open();
        const data = this.dbController.run(sql, [nombres, apellidos, facultad_id, status_id, id]);
        this.dbController.close();
        return data;
    }

    delete(id){
        const sql=`DELETE FROM profesor WHERE id_profesor = ?;`
        this.dbController.open()
        const data = this.dbController.run(sql,[id])
        this.dbController.close()
        return data
    }
    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
}
export default ModelProfesor