from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS  # Importa la clase CORS
import hashlib

app = Flask(__name__)
CORS(app)
# Configura la conexión a la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'sis_venta',
}


def hash_md5(input_string):
    # Create a new MD5 hash object
    md5 = hashlib.md5()

    # Update the hash object with the bytes-like object of the input string
    md5.update(input_string.encode('utf-8'))

    # Get the hexadecimal representation of the hash
    hashed_string = md5.hexdigest()

    return hashed_string

# Función auxiliar para obtener una conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(**db_config)

# Rutas

# Obtener todos los clientes
@app.route('/sis/clientes', methods=['GET'])
def obtener_clientes():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cliente")
    clientes = cursor.fetchall()
    connection.close()
    return jsonify(clientes)

# Obtener un cliente por ID
@app.route('/sis/clientes/<int:cliente_id>', methods=['GET'])
def obtener_cliente(cliente_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cliente WHERE idcliente = %s", (cliente_id,))
    cliente = cursor.fetchone()
    connection.close()

    if cliente:
        return jsonify(cliente)
    return jsonify({'mensaje': 'Cliente no encontrado'}), 404

# Crear un nuevo cliente
@app.route('/sis/clientes', methods=['POST'])
def crear_cliente():
    data = request.json
    
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("INSERT INTO cliente (nombre, telefono, direccion, usuario_id, estado) VALUES (%s, %s, %s, %s, %s)", 
                   (data['nombre'], data['telefono'], data['direccion'], data['usuario_id'], data['estado']))
    connection.commit()
    cursor.execute("SELECT * FROM cliente WHERE idcliente = LAST_INSERT_ID()")
    nuevo_cliente = cursor.fetchone()
    connection.close()
    return jsonify(nuevo_cliente), 201

# Actualizar un cliente por ID
@app.route('/sis/clientes/<int:cliente_id>', methods=['PUT'])
def actualizar_cliente(cliente_id):
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("UPDATE cliente SET nombre=%s, telefono=%s, direccion=%s, usuario_id=%s, estado=%s WHERE idcliente=%s", 
                   (data['nombre'], data['telefono'], data['direccion'], data['usuario_id'], data['estado'], cliente_id))
    connection.commit()
    cursor.execute("SELECT * FROM cliente WHERE idcliente = %s", (cliente_id,))
    cliente_actualizado = cursor.fetchone()
    connection.close()

    if cliente_actualizado:
        return jsonify(cliente_actualizado)
    return jsonify({'mensaje': 'Cliente no encontrado'}), 404

# Eliminar un cliente por ID
@app.route('/sis/clientes/<int:cliente_id>', methods=['DELETE'])
def eliminar_cliente(cliente_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("DELETE FROM cliente WHERE idcliente = %s", (cliente_id,))
    connection.commit()
    connection.close()
    return jsonify({'mensaje': 'Cliente eliminado con éxito'})

##API REST PARA usuarios
@app.route('/sis/usuarios', methods=['GET'])
def obtener_usuarios():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
    usuarios = cursor.fetchall()
    connection.commit()
    connection.close()
    return jsonify(usuarios)

@app.route('/sis/usuarios/<int:id_usuario>', methods=['GET'])
def obtener_usuario(id_usuario):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE idusuario = %s", (id_usuario,))
    usuario = cursor.fetchone()
    connection.commit()
    connection.close()
    return jsonify(usuario)

@app.route('/sis/usuarios', methods=['POST'])
def agregar_usuario():
    nuevo_usuario = request.get_json()
    
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("INSERT INTO usuario (nombre, correo, usuario, clave, estado) VALUES (%s, %s, %s, %s, %s)",
                   (nuevo_usuario['nombre'], nuevo_usuario['correo'], nuevo_usuario['usuario'],
                    hash_md5(nuevo_usuario['clave']), nuevo_usuario['estado']))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Usuario agregado correctamente"})

@app.route('/sis/usuarios/<int:id_usuario>', methods=['PUT'])
def actualizar_usuario(id_usuario):
    usuario_actualizado = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("UPDATE usuario SET nombre=%s, correo=%s, usuario=%s, clave=%s, estado=%s WHERE idusuario=%s",
                   (usuario_actualizado['nombre'], usuario_actualizado['correo'],
                    usuario_actualizado['usuario'], hash_md5(usuario_actualizado['clave']),
                    usuario_actualizado['estado'], id_usuario))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Usuario actualizado correctamente"})

@app.route('/sis/usuarios/<int:id_usuario>', methods=['DELETE'])
def eliminar_usuario(id_usuario):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("DELETE FROM usuario WHERE idusuario=%s", (id_usuario,))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Usuario eliminado correctamente"})
###FIN DE APIREST usuarios

##INICIO DE APIREST productos

@app.route('/sis/productos', methods=['GET'])
def obtener_productos():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM producto")
    productos = cursor.fetchall()
    connection.commit()
    connection.close()
    return jsonify(productos)

@app.route('/sis/productos/<int:cod_producto>', methods=['GET'])
def obtener_producto(cod_producto):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM producto WHERE codproducto = %s", (cod_producto,))
    producto = cursor.fetchone()
    connection.commit()
    connection.close()
    return jsonify(producto)

@app.route('/sis/productos', methods=['POST'])
def agregar_producto():
    nuevo_producto = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("INSERT INTO producto (codigo, descripcion, precio, existencia, usuario_id, estado) VALUES (%s, %s, %s, %s, %s, %s)",
                   (nuevo_producto['codigo'], nuevo_producto['descripcion'], nuevo_producto['precio'],
                    nuevo_producto['existencia'], nuevo_producto['usuario_id'], nuevo_producto['estado']))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Producto agregado correctamente"})

@app.route('/sis/productos/<int:cod_producto>', methods=['PUT'])
def actualizar_producto(cod_producto):
    producto_actualizado = request.get_json()
    nuevo_producto = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("UPDATE producto SET codigo=%s, descripcion=%s, precio=%s, existencia=%s, usuario_id=%s, estado=%s WHERE codproducto=%s",
                   (producto_actualizado['codigo'], producto_actualizado['descripcion'],
                    producto_actualizado['precio'], producto_actualizado['existencia'],
                    producto_actualizado['usuario_id'], producto_actualizado['estado'], cod_producto))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Producto actualizado correctamente"})

@app.route('/sis/productos/<int:cod_producto>', methods=['DELETE'])
def eliminar_producto(cod_producto):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("DELETE FROM producto WHERE codproducto=%s", (cod_producto,))
    connection.commit()
    connection.close()
    cursor.close()
    return jsonify({"mensaje": "Producto eliminado correctamente"})

###FIN DE APIREST productos


##INICIO DE APIREST configuracion

@app.route('/sis/configuracion', methods=['GET'])
def obtener_configuracion():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM configuracion")
    configuracion = cursor.fetchone()
    connection.commit()
    connection.close()
    return jsonify(configuracion)

@app.route('/sis/configuracion', methods=['PUT'])
def actualizar_configuracion():
    nueva_configuracion = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("UPDATE configuracion SET nombre=%s, telefono=%s, email=%s, direccion=%s WHERE id=1",
                   (nueva_configuracion['nombre'], nueva_configuracion['telefono'],
                    nueva_configuracion['email'], nueva_configuracion['direccion']))
    connection.commit()
    connection.close()
    return jsonify({"mensaje": "Configuración actualizada correctamente"})
## PERMISOS
@app.route('/sis/permisos', methods=['GET'])
def obtener_permisos():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Ejecuta la consulta para obtener todos los permisos
        cursor.execute("SELECT * FROM permisos")
        permisos = cursor.fetchall()

        # Cierra la conexión y devuelve los resultados en formato JSON
        cursor.close()
        connection.close()
        return jsonify(permisos)

    except mysql.connector.Error as err:
        # Manejo de errores si ocurre algún problema con la base de datos
        return jsonify({"error": f"Error de base de datos: {err}"}), 500


@app.route('/sis/detalle_permisos', methods=['GET'])
def obtener_detalles_permisos():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM detalle_permisos")
    detalles_permisos = cursor.fetchall()
    return jsonify(detalles_permisos)

@app.route('/sis/detalle_permisos/<int:id>', methods=['GET'])
def obtener_detalles_permiso(id):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM detalle_permisos WHERE id_usuario=%s",(id,))
    detalles_permisos = cursor.fetchall()
    
    return jsonify(detalles_permisos)


# Agregar nuevos detalles de permisos
@app.route('/sis/detalle_permisos', methods=['POST'])
def agregar_detalles_permisos():
    nuevos_detalles_permisos = request.get_json()
    
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    
    for nuevo_detalle_permisos in nuevos_detalles_permisos:
        cursor.execute("INSERT INTO detalle_permisos (id_permiso, id_usuario) VALUES (%s, %s)",
                       (nuevo_detalle_permisos['id_permiso'], nuevo_detalle_permisos['id_usuario']))
    
    connection.commit()
    return jsonify({"mensaje": "Detalles de permisos agregados correctamente"})

# Actualizar detalles de permisos por ID
@app.route('/sis/detalle_permisos/<int:id_usuario>', methods=['PUT'])
def actualizar_permisos(id_usuario):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Eliminar todos los permisos existentes para el usuario
        cursor.execute("DELETE FROM detalle_permisos WHERE id_usuario = %s", (id_usuario,))

        # Obtener permisos enviados en el cuerpo de la solicitud
        nuevos_permisos = request.get_json()
        # Insertar los nuevos permisos
        for permiso in nuevos_permisos:
            
            cursor.execute("INSERT INTO detalle_permisos (id_usuario, id_permiso) VALUES (%s, %s)",
                           (permiso['id_usuario'], permiso['id_permiso']))

        connection.commit()
        return jsonify({"mensaje": "Permisos actualizados correctamente"}), 200

    except Exception as e:
  
        return jsonify({"error": "Error al actualizar permisos"}), 500

    finally:
        connection.close()
        
@app.route('/sis/ventas', methods=['GET'])
def obtener_ventas():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Obtener registros de la tabla "ventas" y datos del cliente y usuario asociados
        cursor.execute("""
            SELECT v.id AS venta_id, v.id_cliente, v.total, v.id_usuario, v.fecha,
                   c.idcliente, c.nombre AS cliente_nombre, c.telefono, c.direccion, c.usuario_id AS cliente_usuario_id, c.estado AS cliente_estado,
                   u.idusuario AS usuario_id, u.nombre AS usuario_nombre, u.correo, u.usuario AS usuario_usuario, u.estado AS usuario_estado
            FROM ventas v
            JOIN cliente c ON v.id_cliente = c.idcliente
            JOIN usuario u ON v.id_usuario = u.idusuario
        """)
        registros_ventas_clientes_usuarios = cursor.fetchall()

        if not registros_ventas_clientes_usuarios:
            return jsonify({"message": "No se encontraron registros de ventas, clientes y usuarios"}), 404

        return jsonify(registros_ventas_clientes_usuarios)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/sis/ventas/<int:id_venta>', methods=['GET'])
def obtener_venta(id_venta):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Consulta para obtener la información de la venta y el cliente
        venta_query = """
            SELECT v.id AS venta_id, v.total, v.fecha,
                   c.idcliente, c.nombre AS cliente_nombre, c.telefono, c.direccion AS cliente_direccion
            FROM ventas v
            JOIN cliente c ON v.id_cliente = c.idcliente
            WHERE v.id = %s
        """
        cursor.execute(venta_query, (id_venta,))
        venta_data = cursor.fetchone()

        if not venta_data:
            return jsonify({"message": f"No se encontró la venta con ID {id_venta}"}), 404

        # Consulta para obtener los productos de la venta
        productos_query = """
            SELECT p.codproducto, p.descripcion, dv.cantidad, dv.precio
            FROM detalle_venta dv
            JOIN producto p ON dv.id_producto = p.codproducto
            WHERE dv.id_venta = %s
        """
        cursor.execute(productos_query, (id_venta,))
        productos_data = cursor.fetchall()

        # Estructura la respuesta JSON
        respuesta_json = {
            "venta": {
                "id": venta_data["venta_id"],
                "total": venta_data["total"],
                "fecha": venta_data["fecha"],
                "cliente": {
                    "idcliente": venta_data["idcliente"],
                    "nombre": venta_data["cliente_nombre"],
                    "telefono": venta_data["telefono"],
                    "direccion": venta_data["cliente_direccion"]
                },
                "productos": productos_data
            }
        }

        # Cierra la conexión a la base de datos
        cursor.close()
        connection.close()

        return jsonify(respuesta_json)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear una nueva venta
@app.route('/sis/ventas', methods=['POST'])
def crear_venta():
    try:
        data = request.get_json()

        # Verificación de campos requeridos
        if not all(key in data for key in ['id_cliente', 'total', 'id_usuario', 'detalles_venta']):
            return jsonify({"error": "Faltan campos requeridos en la solicitud"}), 400

        id_cliente = data['id_cliente']
        total = float(data['total'])  # Convertir 'total' a float
        id_usuario = data['id_usuario']
        detalles_venta = data['detalles_venta']

        connection = get_db_connection()
        cursor = connection.cursor()        
        cursor.execute("INSERT INTO ventas (id_cliente, total, id_usuario) VALUES (%s, %s, %s)", (id_cliente, total, id_usuario))
        venta_id = cursor.lastrowid

        for detalle in detalles_venta:
            id_producto = detalle['id_producto']
            cantidad = detalle['cantidad']
            precio = detalle['precio']

            # Insertar en detalle_venta
            cursor.execute("INSERT INTO detalle_venta (id_producto, id_venta, cantidad, precio) VALUES (%s, %s, %s, %s)",
                            (id_producto, venta_id, cantidad, precio))

            # Actualizar existencia en la tabla producto
            cursor.execute("UPDATE producto SET existencia = existencia - %s WHERE codproducto = %s", (cantidad, id_producto))

        connection.commit()

        return jsonify({"message": "Venta creada con éxito", "venta_id": venta_id})

    except Exception as e:
        return jsonify({"error": f"Error en la base de datos: {str(e)}"}), 500


##cantida de registros
# Ruta para obtener la cantidad de registros en todas las tablas
@app.route('/sis/registros', methods=['GET'])
def cantidad_registros():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Consulta para obtener la cantidad de registros en cada tabla
        query = """
            SELECT
                'ventas' AS tabla,
                COUNT(*) AS cantidad_registros
            FROM ventas
            UNION ALL
            SELECT
                'usuario' AS tabla,
                COUNT(*) AS cantidad_registros
            FROM usuario
            UNION ALL
            SELECT
                'producto' AS tabla,
                COUNT(*) AS cantidad_registros
            FROM producto
            UNION ALL
            SELECT
                'cliente' AS tabla,
                COUNT(*) AS cantidad_registros
            FROM cliente
        """

        cursor.execute(query)
        resultados = cursor.fetchall()

        cantidad_registros_dict = {resultado['tabla']: resultado['cantidad_registros'] for resultado in resultados}

        # Construir el JSON con los nombres específicos de claves
        json_resultado = {
            'cantidad_ventas': cantidad_registros_dict.get('ventas', 0),
            'cantidad_usuarios': cantidad_registros_dict.get('usuario', 0),
            'cantidad_productos': cantidad_registros_dict.get('producto', 0),
            'cantidad_clientes': cantidad_registros_dict.get('cliente', 0),
        }

        return jsonify(json_resultado)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            
            
@app.route('/sis/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
    
        usuario = data["usuario"]
        clave = data["clave"]
        clave=hash_md5(clave)
    
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE usuario=%s AND clave=%s AND estado=%s", (usuario, clave,1))
        user = cursor.fetchone()
        
        cursor.close()

        if user:
            return jsonify({'message': 'Inicio de sesión exitoso',"token":'1',"usuario":user})
        else:
            return jsonify({'message': 'Credenciales incorrectas',"token":'0'})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=False)