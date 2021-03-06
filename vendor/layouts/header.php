<?php

if (empty($_SESSION['active'])) {
    header('location: ../index.php');
}
?>
<div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="../views/index.php" class="nav-link">Inicio</a>
            </li>
        </ul>
        <?php
        date_default_timezone_set('America/Guayaquil');

        function fechaC()
        {
            $mes = array(
                "", "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            );
            return date('d') . " de " . $mes[date('n')] . " de " . date('Y');
        }
        ?>
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <p style="padding: 7px;"><b>La Maná, <?php echo fechaC(); ?> </b></p>
            </li>
            <li class="nav-item">

                <a href="../core/leave.php" class="btn bg-danger text-center"><b>Cerrar Sesion <i class="fa-solid fa-right-from-bracket"></i></b></a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->

    <div class="modal">
        <div class="bodyModal">
            
        </div>
    </div>

    <?php
    include_once "nav.php"
    ?>