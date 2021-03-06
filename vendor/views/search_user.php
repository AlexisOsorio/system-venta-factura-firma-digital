<?php
session_start();

if ($_SESSION['rol'] != 1) {
    header("Location: ../views/index.php");
}
include_once "../../config/conexion.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lista de usuarios</title>

    <?php
    include_once "../layouts/style.php"
    ?>

    <style>
        .activar {
            color: white;
            border: 1px solid #17A2B8;
            background: #17A2B8;
            display: inline-block;
        }

        .activar a:hover {
            background: #17A2B8;
        }
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
                    <div class="col-sm-6">
                        <h2><b>Lista Usuarios</b></h2>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="../views/index.php">Inicio</a></li>
                            <li class="breadcrumb-item active">Lista Usuarios</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section>
            <div class="container">
                <?php
                $search_u = strtolower($_REQUEST['busqueda']);

                if (empty($search_u)) {
                    header("location: list_users.php");
                }
                ?>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12" style="padding-bottom: 5px;">
                            <div class="form-group row">
                                <form action="search_user.php" method="get" class=" col-sm-9 d-flex">
                                    <input class="form-control" type="text" name="busqueda" id="busqueda" placeholder="Buscar Usuario">
                                    <button type="submit" class="btn btn-outline-info"><i class="nav-icon fas fa-search" value="<?php echo $search_u; ?>"></i></button>
                                </form>

                                <ul class="nav justify-content-end">
                                    <li class="nav-item">
                                        <a href="../views/registro_users.php" class=" btn bg-primary"><i class="nav-icon fas fa-user-plus"></i>Crear Usuario</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <table class="table table-striped table-inverse">
                                <thead class="bg-info thead-inverse">
                                    <tr class="text-center">
                                        <th scope="col-sm-2">ID</th>
                                        <th scope="col-sm-2">NOMBRE</th>
                                        <th scope="col-sm-2">CORREO</th>
                                        <th scope="col-sm-2">USUARIO</th>
                                        <th scope="col-sm-2">ROL</th>
                                        <th scope="col-sm-2">ACCIONES</th>
                                    </tr>
                                </thead>
                                <?php

                                //buscador
                                $cate = '';
                                if ($search_u == 'administrador') {
                                    $cate = "OR rol LIKE '%1%'";
                                } else if ($search_u == 'supervisor') {
                                    $cate = "OR rol LIKE '%2%'";
                                } else if ($search_u == 'vendedor') {
                                    $cate = "OR rol LIKE '%3%'";
                                }
                                $sql_reg =  mysqli_query($conexion, "SELECT COUNT(*) as registros_totales FROM usuario WHERE (idusuario LIKE '%$search_u%' 
                                            OR nombre LIKE '%$search_u%' OR correo LIKE '%$search_u%' OR usuario LIKE '%$search_u%' $cate) AND estatus = 1");


                                $result_reg = mysqli_fetch_array($sql_reg);
                                $registros_totales = $result_reg['registros_totales'];

                                $pag_num = 5;

                                if (empty($_GET['pagina'])) {
                                    $pag =  1;
                                } else {
                                    $pag = $_GET['pagina'];
                                }

                                $desde_pg = ($pag - 1) * $pag_num;
                                $total_pg = ceil($registros_totales / $pag_num);

                                $query = mysqli_query($conexion, "SELECT u.idusuario, u.nombre, u.correo, u.usuario, r.rol FROM usuario u 

                                                                    INNER JOIN rol r ON u.rol = r.idrol WHERE (u.idusuario LIKE '%$search_u%' OR u.nombre LIKE '%$search_u%' OR u.correo LIKE '%$search_u%' 
                            
                                                                    OR u.usuario LIKE '%$search_u%' OR r.rol LIKE '%$search_u%') AND estatus = 1 ORDER BY u.idusuario ASC LIMIT $desde_pg,$pag_num");

                                $result = mysqli_num_rows($query);

                                if ($result > 0) {
                                    while ($data = mysqli_fetch_array($query)) {
                                ?>
                                        <tbody>
                                            <tr class="text-center">
                                                <th scope="row"><?php echo $data['idusuario']; ?></th>
                                                <td><?php echo $data['nombre']; ?></td>
                                                <td><?php echo $data['correo']; ?></td>
                                                <td><?php echo $data['usuario']; ?></td>
                                                <td><?php echo $data['rol']; ?></td>
                                                <td>
                                                    <a href="editar_usuarios.php?id=<?php echo $data['idusuario']; ?>" class="btn bg-warning"><i class="nav-icon fas fa-edit"></i> Editar Usuario</a>
                                                    <?php
                                                    if ($data['idusuario'] != 1) {
                                                    ?>
                                                        <a href="delete_users.php?id=<?php echo $data['idusuario']; ?>" class="btn bg-danger"><i class="nav-icon fas fa-trash"></i> Eliminar Usuario</a>
                                                    <?php
                                                    }
                                                    ?>
                                                </td>
                                            </tr>

                                        </tbody>
                                <?php
                                    }
                                }
                                ?>

                            </table>
                            <div>
                                <?php
                                if ($registros_totales != 0) {
                                ?>
                                    <nav aria-label="...">
                                        <ul class="pagination justify-content-end">
                                            <?php
                                            if ($pag != 1) {
                                                # code...

                                            ?>
                                                <li class="page-item">
                                                    <a class="page-link" href="?pagina=<?php echo 1; ?>&busqueda=<?php echo $search_u; ?>"><i class="nav-icon fas fa-backward-step"></i></a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="?pagina=<?php echo $pag - 1; ?>&busqueda=<?php echo $search_u; ?>" aria-label="Previous">
                                                        <span aria-hidden="true"><i class="nav-icon fas fa-backward-fast"></i></span>
                                                    </a>
                                                </li>
                                            <?php
                                            }
                                            for ($i = 1; $i <= $total_pg; $i++) {
                                                # code...
                                                if ($i == $pag) {
                                                    echo '  <li class="page-link activar">' . $i . '</li>';
                                                } else {
                                                    echo '  <li class="page-item">
                                                            <a class="page-link" href="?pagina=' . $i . '&busqueda=' . $search_u . '">' . $i . '</a>
                                                        </li>';
                                                }
                                            }
                                            if ($pag != $total_pg) {
                                            ?>
                                                <li class="page-item">
                                                    <a class="page-link" href="?pagina=<?php echo $pag + 1; ?>&busqueda=<?php echo $search_u; ?>" aria-label="Next">
                                                        <span aria-hidden="true"><i class="nav-icon fas fa-forward-fast"></i></span>
                                                    </a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="?pagina=<?php echo $total_pg; ?>&busqueda=<?php echo $search_u; ?>"><i class="nav-icon fas fa-forward-step"></i></a>
                                                </li>

                                            <?php
                                            }
                                            ?>
                                        </ul>
                                    </nav>
                                <?php
                                }
                                ?>
                            </div>
                        </div>
                    </div>

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