class ModelRegistro{
    constructor(controller){
        this.dbController=controller
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id){
        const sql=`select * from registro_entrada_salida where id_registro=?;`
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
        const sql=`select * from registro_entrada_salida;`
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

    async conteoEntradaSalida(usuario_id) {
        this.dbController.open();
    
        try {
            // Obtener el conteo actual de registros para el usuario
            const conteoSql = `SELECT COUNT(*) AS conteo FROM registro_entrada_salida WHERE usuario_id = ?;`;
            const conteoData = await this.dbController.get(conteoSql, [usuario_id]);
            const conteo = conteoData ? conteoData.conteo : 0;
            // Determinar si es una entrada o salida
            const contador = conteo % 2 === 0; // Entrada en conteo par, salida en impar            
            // Retornar el resultado
            return contador;
        } catch (error) {
            console.error("Error al contar entradas/salidas:", error);
        } finally {
            // Cerrar conexión a la base de datos
            this.dbController.close();
        }

    }


    registrarEntradaSalida(datos) {
        const fechaActual = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
    
        // Verificar si el usuario tiene un registro activo (fecha_salida es NULL)
        const sqlCheck = 'SELECT id_registro FROM registro_entrada_salida WHERE usuario_id = ? AND fecha_salida IS NULL';
        this.dbController.open();
        const registroActivo = this.dbController.get(sqlCheck, [datos.usuario_id]);
    
        if (registroActivo) {
            // Si existe un registro activo, actualizar fecha_salida
            const sqlUpdate = 'UPDATE registro_entrada_salida SET fecha_salida = ? WHERE id_registro = ?';
            this.dbController.run(sqlUpdate, [fechaActual, registroActivo.id_registro]);
        } else {
            // Si no existe un registro activo, insertar un nuevo registro
            const sqlInsert = 'INSERT INTO registro_entrada_salida (usuario_id, fecha_entrada, fecha_salida) VALUES (?, ?, NULL)';
            this.dbController.run(sqlInsert, [datos.usuario_id, fechaActual]);
        }
    
        this.dbController.close();
    }


    insert(datos){
        const fechaEntrada = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
        const sql='insert into registro_entrada_salida(usuario_id, fecha_entrada, fecha_salida) values(?, ?, NULL)';
        this.dbController.open()
        const data = this.dbController.run(sql,[datos.usuario_id, fechaEntrada])
        this.dbController.close()
        return data
    }

    updateSalida(id) {
        const fechaSalida = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
        const sql = 'UPDATE registro_entrada_salida SET fecha_salida = ? WHERE usuario_id = ?';
        this.dbController.open();
        const data = this.dbController.run(sql, [fechaSalida, id]);
        this.dbController.close();
        return data;
    }
    

    delete(id){
        const sql=`DELETE FROM registro_entrada_salida WHERE id_registro = ?;`
        this.dbController.open()
        const data = this.dbController.run(sql,[id])
        this.dbController.close()
        return data
    }
    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
}
export default ModelRegistro