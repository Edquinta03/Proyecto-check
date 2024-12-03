class ModelCarrera{
    constructor(controller){
        this.dbController=controller
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    async validar(id) {
        const sql = `SELECT id_carrera FROM carrera WHERE id_carrera = ?`;
        
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
            c.id_carrera, 
            c.nombre_carrera,  
            f.nombre AS facultad_nombre 
        FROM 
            carrera c
        JOIN 
            facultad f ON c.facultad_id = f.id_facultad
        WHERE c.id_carrera=?;
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
    getAll(){
        const sql = `
        SELECT 
            c.id_carrera, 
            c.nombre_carrera,  
            f.nombre AS facultad_nombre 
        FROM 
            carrera c
        JOIN 
            facultad f ON c.facultad_id = f.id_facultad;
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
        const sql='insert into carrera(id_carrera, nombre_carrera, facultad_id) values(?, ?, ?)'
        this.dbController.open()
        const data = this.dbController.run(sql,datos)
        this.dbController.close()
        return data
    }

    update(id, nombre_carrera, facultad_id) {
        const sql = 'UPDATE carrera SET nombre_carrera = ?, facultad_id = ? WHERE id_carrera = ?';
        this.dbController.open();
        const data = this.dbController.run(sql, [nombre_carrera, facultad_id, id]);
        this.dbController.close();
        return data;
    }

    delete(id){
        const sql=`DELETE FROM carrera WHERE id_carrera = ?;`
        this.dbController.open()
        const data = this.dbController.run(sql,[id])
        this.dbController.close()
        return data
    }
    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
}
export default ModelCarrera