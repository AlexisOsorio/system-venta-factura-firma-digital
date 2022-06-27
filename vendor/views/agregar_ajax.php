<?php
include_once '../../config/conexion.php';
session_start();
//print_r($_POST);exit;
if (!empty($_POST)) {
    //extraer datos stock
    if ($_POST['action'] == 'infoStock') {
        $stock_id = $_POST['producto'];

        $query = mysqli_query($conexion, "SELECT codproducto, descripcion,existencia,precio FROM producto 
                                        WHERE codproducto = $stock_id AND estatus = 1");
        mysqli_close($conexion);

        $result = mysqli_num_rows($query);

        if ($result > 0) {
            $data = mysqli_fetch_array($query);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            exit;
        } else {
            echo "error";
        }
        exit;
    }

    //Agregar datos stock a entrada
    if ($_POST['action'] == 'addProd') {
        if (!empty($_POST['cantidad']) || !empty($_POST['precio']) || !empty($_POST['producto_id'])) {
            $cantidad = $_POST['cantidad'];
            $precio = $_POST['precio'];
            $producto_id = $_POST['producto_id'];
            $usuario_id = $_SESSION['idUser'];

            $query_insert = mysqli_query($conexion, "INSERT INTO entradas(codproducto ,cantidad,precio,usuario_id) 
                                        VALUES ($producto_id,$cantidad,$precio,$usuario_id)");

            if ($query_insert) {
                //execute store procedure 
                $query_update = mysqli_query($conexion, "CALL actualizar_precio_producto
                                                        ($cantidad,$precio,$producto_id)");
                $result_stk = mysqli_num_rows($query_update);
                if ($result_stk > 0) {
                    $data = mysqli_fetch_array($query_update);
                    $data['producto_id'] = $producto_id;
                    echo json_encode($data, JSON_UNESCAPED_UNICODE);
                    exit;
                }
            } else {
                echo "error";
                exit;
            }
            mysqli_close($conexion);
        } else {
            echo "error";
        }
        exit;
    }

    //Eliminar Producto
    if ($_POST['action'] == 'delProd') {

        if (empty($_POST['producto_id']) || !is_numeric($_POST['producto_id'])) {
            echo 'Error';
        } else {
            # code...

            $idproductoD = $_POST['producto_id'];

            $query_D = mysqli_query($conexion, "UPDATE producto SET estatus = 0 WHERE codproducto = $idproductoD");
            mysqli_close($conexion);
            if ($query_D) {
                echo 'OK';
            } else {
                echo 'error';
            }
        }
        echo 'error';
        exit;
    }

    //Buscar Cliente
    if ($_POST['action'] == 'searchCliente') {
       if (!empty($_POST['cliente'])) {
            $cedula = $_POST['cliente'];

            $query = mysqli_query($conexion,"SELECT * FROM cliente WHERE ruc LIKE '$cedula' AND estatus = 1");
            mysqli_close($conexion);
            $result = mysqli_num_rows($query);

            $data = '';
            if (($result > 0)) {
                $data = mysqli_fetch_assoc($query);
            }else {
                $data = 0;
            }
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
       }
        exit;
    }
    
    //register clients mod sales
    if ($_POST['action'] == 'addClient') {
        
        $cedula = $_POST['cedula_client'];
        $nombre = $_POST['nombre_client'];
        $telefono = $_POST['telefono_client'];
        $direccion = $_POST['direccion_client'];
        $usuario_id = $_SESSION['idUser'];

        $query_insert = mysqli_query($conexion, "INSERT INTO cliente(ruc,nombre,telefono,direccion, usuario_id) 
                                        VALUES('$cedula', '$nombre', '$telefono', '$direccion', '$usuario_id')");
        if ($query_insert) {
            $codClient = mysqli_insert_id($conexion);
            $mensaje = $codClient;
        }else {
            $mensaje = 'error';
        }
        mysqli_close($conexion);
        echo $mensaje;
        exit;
    }
}
exit;
