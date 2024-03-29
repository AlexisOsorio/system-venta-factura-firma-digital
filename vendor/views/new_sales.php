<?php
session_start();
include_once '../../config/conexion.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nueva Venta</title>

    <?php
    include_once "../layouts/style.php"
    ?>

    <style>

    </style>
</head>

<body class="hold-transition sidebar-mini">
    <?php
    include_once "../layouts/header.php"
    ?>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12">
                        <h2 style="font-size: 27px;text-align: center; margin: 0;padding: 0; font-weight: bold;">Nueva Venta</h2>
                        <div class="form-group row action_client">
                            <label for="Datos" class="col-sm-2 col-form-label action_cliente">Datos del Cliente</label>
                            <a href="#" class="btn btn-primary btn_new_client"><i class="nav-icon fas fa-user-plus"></i> Nuevo Cliente</a>
                        </div>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
            <div class="card border-primary">
                <div class="card-body">
                    <form action="" name="form_new_client" id="form_new_client">
                        <input type="hidden" name="action" value="addClient">
                        <input type="hidden" name="idclient" id="idclient" value="" required>
                        <div class="form-group row">
                            <div class="col-sm-4">
                                <label for="cedula" class="col-form-label">Cedula</label>
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" name="cedula_client" id="cedula_client" placeholder="Cedula del cliente" required>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <label for="nombre" class="col-form-label">Nombre</label>
                                <div class="col-sm-12">
                                    <input type="text" disabled class="form-control" name="nombre_client" id="nombre_client" placeholder="Nombre del cliente" required>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <label class="col-form-label">Telefono</label>
                                <div class="col-sm-12">
                                    <input type="number" disabled class="form-control" name="telefono_client" id="telefono_client" placeholder="Telefono del cliente" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label class="col-sm-2 col-form-label">Dirección</label>
                                <div class="col-sm-12">
                                    <input type="text" disabled class="form-control" name="direccion_client" id="direccion_client" placeholder="Dirección del cliente" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row text-center">
                            <div class="col-sm-12"  id="div_register_client"  style="display: none;">
                                <button type="submit" class="btn  btn-success"><i class="nav-icon fas fa-save"></i> Registrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12">
                        <h2 style="font-size: 27px;text-align: center; margin: 0;padding: 0; font-weight: bold;">Datos Venta</h2>
                        <div class="form-group row datos_venta">
                            <div class="col-sm-6">
                                <i class="nav-icon fas fa-user"></i><label for="Datos" class="col-sm-2 col-form-label">Vendedor</label>
                                <label class="d-block text-danger"><?php echo $_SESSION['nombre']; ?></label>
                            </div>
                            <div class="col-sm-6 ">
                                <label for="Datos" class="col-sm-2 col-form-label">Acciones</label>
                                <div class="form-group" id="acciones_venta">
                                    <a href="#" class="btn btn-secondary" id="btn_anular_venta"><i class="nav-icon fas fa-ban"></i> Anular</a>
                                    <a href="#" class="btn btn-danger" id="btn_facturar_venta"><i class="nav-icon fas fa-save"></i> Generar Venta</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-striped table-inverse table-hover tbl_venta">
                            <thead class="thead-inverse">
                                <tr style="background-color: #17A2B8; color: #fff;">
                                    <th>CODIGO</th>
                                    <th>DESCRIPCIÓN</th>
                                    <th>STOCK</th>
                                    <th>CANTIDAD</th>
                                    <th>PRECIO</th>
                                    <th>PRECIO TOTAL</th>
                                    <th>ACCIONES</th>
                                </tr>
                                <tr>
                                    <td scope="row"><input type="text" name="txt_cod_producto" id="txt_cod_producto" class="form-control"></td>
                                    <td id="txt_decripcion">-</td>
                                    <td id="txt_stock">-</td>
                                    <td><input type="text" name="txt_cant_producto" id="txt_cant_producto" value="0" min="1" disabled class="form-control"></td>
                                    <td id="txt_precio">0.00</td>
                                    <td id="txt_precio_total">0.00</td>
                                    <td><a href="#" id="add_product_venta" class="btn btn-success" style="display: none;">Agregar</a></td>
                                </tr>
                                <tr style="background-color: #17A2B8; color: #fff;">
                                    <th>CODIGO</th>
                                    <th colspan="2">DESCRIPCIÓN</th>
                                    <th>CANTIDAD</th>
                                    <th>PRECIO</th>
                                    <th>PRECIO TOTAL</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody id="detalle_venta">
                                <!--Contenido desde AJAX-->
                            </tbody>
                            <tfoot id="detalle_totales">
                                <!--Content ajax-->
                            </tfoot>
                        </table>

                    </div>
                    <div class="col-md-12">
                        <table class="table table-striped table-inverse">

                        </table>

                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <?php
    include_once "../layouts/footer.php"
    ?>
    <script type="text/javascript">
        $(document).ready(function(){
            var userId = '<?php echo $_SESSION['idUser']; ?>';
            searchForDetalle(userId);
        })
    </script>