//========================= JQUERY =====================

$(document).ready(function () {

    //--------------------- SELECCIONAR FOTO PRODUCTO ---------------------
    $("#foto").on("change", function () {
        var uploadFoto = document.getElementById("foto").value;
        var foto = document.getElementById("foto").files;
        var nav = window.URL || window.webkitURL;
        var contactAlert = document.getElementById('form_alert');

        if (uploadFoto != '') {
            var type = foto[0].type;
            var name = foto[0].name;
            if (type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png') {
                contactAlert.innerHTML = '<p class="errorArchivo">El archivo no es válido.</p>';
                $("#img").remove();
                $(".delPhoto").addClass('notBlock');
                $('#foto').val('');
                return false;
            } else {
                contactAlert.innerHTML = '';
                $("#img").remove();
                $(".delPhoto").removeClass('notBlock');
                var objeto_url = nav.createObjectURL(this.files[0]);
                $(".prevPhoto").append("<img id='img' src=" + objeto_url + ">");
                $(".upimg label").remove();

            }
        } else {
            alert("No selecciono foto");
            $("#img").remove();
        }
    });

    $('.delPhoto').click(function () {
        $('#foto').val('');
        $(".delPhoto").addClass('notBlock');
        $("#img").remove();

        if ($("#foto_actual") && $("foto_remove")) {
            $("#foto_remove").val('imgproducto.png');

        }
    });

    //modal add stock
    $('.add_stock').click(function (e) {
        e.preventDefault();
        var producto = $(this).attr('stock');
        var action = 'infoStock';
        $.ajax({
            type: "POST",
            url: "agregar_ajax.php",
            async: true,
            data: {
                action,
                producto
            },
            success: function (response) {
                if (response != 'error') {
                    var info = JSON.parse(response);

                    //$('#producto_id').val(info.codproducto);
                    // $('.name_prod').html(info.descripcion);

                    $('.bodyModal').html(
                        '<div class="col-md-4">' +
                        '<div class="card card-success">' +
                        '<div class="card-header">' +
                        '<h1 class="card-title"><i class="nav-icon fas fa-cubes"></i> Agregar Producto</h1>' +
                        '</div>' +
                        '<div class="card-body">' +
                        '<form action="" method="POST" name="form_add_stock" id="form_add_stock" onsubmit="event.preventDefault(); sendDataProd();">' +
                        '<h2 class="name_prod" style="font-size: 25px; text-align: center; font-weight: bolder;">' + info.descripcion + '</h2>' +
                        '<div class="form-group row">' +
                        '<input type="number" name="cantidad" id="txtCantidad" placeholder="Cantidad del Producto" class="form-control" required>' +
                        '</div>' +
                        '<div class="form-group row">' +
                        '<input type="text" name="precio" id="txtPrecio" placeholder="Precio del Producto" class="form-control" required>' +
                        '</div>' +
                        '<input type="hidden" name="producto_id" id="producto_id" class="form-control" value="' + info.codproducto + '">' +
                        '<input type="hidden" name="action" class="form-control" value="addProd">' +
                        '<div class="alerta alertAddProd"></div>' +
                        '<button type="submit" class="btn btn-success"><i class="nav-icon fas fa-plus"></i> Agregar</button>' +
                        '<a href="#" class="btn bg-danger closeModal" style="float: right;" onclick="closeModal();"><i class="nav-icon fas fa-ban"></i> Cerrar</a>' +
                        '</form>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            /**/
            error: function (error) {
                console.log(error);
            },
        });
        $('.modal').fadeIn();
    });

    //modal delete product
    $('.del_stock').click(function (e) {
        e.preventDefault();
        var producto = $(this).attr('stock');
        var action = 'infoStock';
        $.ajax({
            type: "POST",
            url: "agregar_ajax.php",
            async: true,
            data: {
                action,
                producto
            },
            success: function (response) {
                if (response != 'error') {
                    var info = JSON.parse(response);

                    //$('#producto_id').val(info.codproducto);
                    // $('.name_prod').html(info.descripcion);

                    $('.bodyModal').html(
                        '<div class="col-md-4">' +
                        '<div class="card card-danger">' +
                        '<div class="card-header">' +
                        '<h1 class="card-title"><i class="nav-icon fas fa-cubes"></i> Eliminar Producto</h1>' +
                        '</div>' +
                        '<div class="card-body">' +
                        '<form action="" method="POST" name="form_del_stock" id="form_del_stock" onsubmit="event.preventDefault(); delProd();">' +
                        '<h4 class="text-center"><b>¿Esta seguro de eliminar este producto?</b></h4>' +
                        '<h2 class="name_prod" style="font-size: 25px; text-align: center; font-weight: bolder;">' + info.descripcion + '</h2>' +
                        '<input type="hidden" name="producto_id" id="producto_id" class="form-control" value="' + info.codproducto + '">' +
                        '<input type="hidden" name="action" class="form-control" value="delProd">' +
                        '<div class="alerta alertAddProd"></div>' +
                        '<button type="submit" class="btn btn-danger btn_delete"><i class="nav-icon fas fa-trash"></i> Eliminar</button>' +
                        '<a href="#" class="btn bg-secondary closeModal" style="float: right;" onclick="closeModal();"><i class="nav-icon fas fa-ban"></i> Cerrar</a>' +
                        '</form>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            /**/
            error: function (error) {
                console.log(error);
            },
        });
        $('.modal').fadeIn();
    });

    $('#search_proveedor').change(function (e) {
        e.preventDefault();
        var vendor = getUrl();
        location.href = vendor + 'search_products.php?proveedor=' + $(this).val();
    });

    //campos para registrar cliente
    $('.btn_new_client').click(function (e) {
        e.preventDefault();
        $('#nombre_client').removeAttr('disabled');
        $('#telefono_client').removeAttr('disabled');
        $('#direccion_client').removeAttr('disabled');

        $('#div_register_client').slideDown();
    });


    //buscar cliente
    $('#cedula_client').keyup(function (e) {
        e.preventDefault();

        var client = $(this).val();
        var action = 'searchCliente';

        if (client != '') {
            $.ajax({
                type: "POST",
                url: "agregar_ajax.php",
                async: true,
                data: {
                    action: action,
                    cliente: client
                },
                success: function (response) {
                    if (response == 0) {
                        $('#idclient').val('');
                        $('#nombre_client').val('');
                        $('#telefono_client').val('');
                        $('#direccion_client').val('');
                        //mostrar datos
                        $('.btn_new_client').slideDown();
                    } else {
                        var data = $.parseJSON(response);
                        $('#idclient').val(data.idcliente);
                        $('#nombre_client').val(data.nombre);
                        $('#telefono_client').val(data.telefono);
                        $('#direccion_client').val(data.direccion);
                        //ocultar boton
                        $('.btn_new_client').slideUp();

                        //se bloquean los campos 
                        $('#nombre_client').attr('disabled', 'disabled');
                        $('#telefono_client').attr('disabled', 'disabled');
                        $('#direccion_client').attr('disabled', 'disabled');

                        //ocultar boton guardar
                        $('#div_register_client').slideUp();
                    }
                },
                error: function (error) {

                },
            });
        }
    });

    //crear cliente - ventas
    $('#form_new_client').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "agregar_ajax.php",
            async: true,
            data: $('#form_new_client').serialize(),
            success: function (response) {
                if (response != 'error') {
                    //se agrega el id al campo oculto
                    $('#idclient').val(response);
                    //se bloquean los campos 
                    $('#nombre_client').attr('disabled', 'disabled');
                    $('#telefono_client').attr('disabled', 'disabled');
                    $('#direccion_client').attr('disabled', 'disabled');
                    //ocultar boton agregar clientes
                    $('.btn_new_client').slideUp();
                    //ocultar boton guardar
                    $('#div_register_client').slideUp();
                }
            },
            error: function (error) {

            },
        });
    })

    //buscar productos
    $('#txt_cod_producto').keyup(function (e) {
        e.preventDefault();
        var producto = $(this).val();
        if (producto == '') {
            $('#txt_decripcion').html('-')
            $('#txt_stock').html('-');
            $('#txt_cant_producto').val('0');
            $('#txt_precio').html('0.00');
            $('#txt_precio_total').html('0.00');
            //Bloquear Cantidad
            $('#txt_cant_producto').attr('disabled', 'disabled');
            // Ocultar Boto Agregar
            $('#add_product_venta').slideUp();
        }

        var action = 'infoStock';

        if (producto != '') {
            $.ajax({
                type: "POST",
                url: "agregar_ajax.php",
                async: true,
                data: {
                    action,
                    producto
                },
                success: function (response) {
                    if (response != 'error') {
                        var info_prod = JSON.parse(response);
                        $('#txt_decripcion').html(info_prod.descripcion);
                        $('#txt_stock').html(info_prod.existencia);
                        $('#txt_cant_producto').val('1');
                        $('#txt_precio').html(info_prod.precio);
                        $('#txt_precio_total').html(info_prod.precio);
                        //activar campo cantidad
                        $('#txt_cant_producto').removeAttr('disabled');

                        //mostrar boton agregar
                        $('#add_product_venta').slideDown();
                    } else {
                        $('#txt_decripcion').html('-');
                        $('#txt_stock').html('-');
                        $('#txt_cant_producto').val('0');
                        $('#txt_precio').html('0.00');
                        $('#txt_precio_total').html('0.00');

                        //bloquear boton agregar
                        $('#add_product_venta').attr('disabled', 'disabled');
                        //ocultar boton agregar
                        $('#add_product_venta').slideUp();
                    }

                },
                error: function (error) {

                },
            });
            $('#txt_descripcion').html('-');
            $('#txt_stock').html('-');
            $('#txt_cant_producto').val('0');
            $('#txt_precio').html('0.00');
            $('#txt_precio_total').html('0.00');

            //Bloquear Cantidad
            $('#txt_cant_producto').attr('disabled', 'disabled');
            // Ocultar Boto Agregar
            $('#add_product_venta').slideUp();
        }
    });

    //validacion de la cantidad en producto
    $('#txt_cant_producto').keyup(function (e) {
        e.preventDefault();
        var precio_total = $(this).val() * $('#txt_precio').html();
        var stock = parseInt($('#txt_stock').html());
        $('#txt_precio_total').html(precio_total);
        // Ocultat el boton Agregar si la cantidad es menor que 1
        if (($(this).val() < 1 || isNaN($(this).val())) || ($(this).val() > stock)) {
            $('#add_product_venta').slideUp();
        } else {
            $('#add_product_venta').slideDown();
        }
    });

    //agregar producto a detalle temporal
    $('#add_product_venta').click(function (e) {
        e.preventDefault();

        if ($('#txt_cant_producto').val() > 0) {
            var codproducto = $('#txt_cod_producto').val();
            var cantidad = $('#txt_cant_producto').val();
            var action = 'addProductDetall';
            $.ajax({
                url: 'agregar_ajax.php',
                type: 'POST',
                async: true,
                data: {
                    action: action,
                    producto: codproducto,
                    cantidad: cantidad
                },
                success: function (response) {

                    if (response != 'error') {
                        var info_prod = JSON.parse(response);
                        $('#detalle_venta').html(info_prod.detalle);
                        $('#detalle_totales').html(info_prod.totales);

                        $('#txt_cod_producto').val('');
                        $('#txt_descripcion').html('-');
                        $('#txt_stock').html('-');
                        $('#txt_cant_producto').val('0');
                        $('#txt_precio').html('0.00');
                        $('#txt_precio_total').html('0.00');

                        // Bloquear la cantidad
                        $('#txt_cant_producto').attr('disabled', 'disabled');

                        // Ocultar boton agregar
                        $('#add_product_venta').slideUp();
                    } else {
                        console.log('No exiten datos');
                    }
                    viewProcesar();
                },
                error: function (error) {

                }
            });
        }
    });

    //anular venta
    $('#btn_anular_venta').click(function (e) {
        e.preventDefault();
        var rows = $('#detalle_venta tr').length;
        if (rows > 0) {
            var action = 'anularVenta';
            $.ajax({
                url: 'agregar_ajax.php',
                type: 'POST',
                async: true,
                data: {
                    action: action
                },
                success: function (response) {
                    if (response != 0) {
                        location.reload();
                    }
                },
                error: function (error) {

                }
            });
        }
    });

    //facturar venta
    $('#btn_facturar_venta').click(function (e) {
        e.preventDefault();
        var rows = $('#detalle_venta tr').length;
        if (rows > 0) {
            var action = 'procesarVenta';
            var codCliente = $('#idclient').val();
            $.ajax({
                url: 'agregar_ajax.php',
                type: 'POST',
                async: true,
                data: {
                    action: action,
                    codCliente: codCliente
                },
                success: function (response) {
                    if (response != 'error') {
                        var info_prod = JSON.parse(response);
                        //console.log(info);
                        generarPDF(info_prod.codcliente, info_prod.nofactura);
                        location.reload();
                    }
                },
                error: function (error) {

                }
            });
        }
    });

    //View Bill
    $('.view_factura').click(function (e) {
        e.preventDefault();

        var codCliente = $(this).attr('cl');
        var noFactura = $(this).attr('f');
        generarPDF(codCliente, noFactura);
    })

    //changePass validacion
    $('.newPass').keyup(function () {
        validar_Pass();
    });

    //cambiar contraseña de formulario
    $('#frmElegirPass').submit(function (e) {
        e.preventDefault();
        var pass_actual = $('#txt_actualP').val();
        var pass_new = $('#txt_nuevaP').val();
        var pass_confirmado = $('#txt_confirmarP').val();
        var action = 'changeContra';

        if (pass_new != pass_confirmado) {
            $('.alertElejirPass').html('<p class="text-center"' +
                'style="background-color: #DC3545; ' +
                'color: #fff;' +
                'font-weight: bold;' +
                'padding: 5px; ' +
                'border-radius: 0.25rem;">' +
                '<i class="nav-icon fas fa-circle-xmark"></i>' +
                'Las contraseñas no coinciden</p>');
            $('.alertElejirPass').slideDown();
            return false;
        }

        if (pass_new.length < 6) {
            $('.alertElejirPass').html('<p class="text-center"' +
                'style="background-color: #FFC107; ' +
                'color: #000;' +
                'font-weight: bold;' +
                'padding: 5px; ' +
                'border-radius: 0.25rem;">' +
                '<i class="nav-icon fas fa-triangle-exclamation"></i> ' +
                'La contraseña debe ser de 6 caracteres como minimo ' +
                '<i class="nav-icon fas fa-triangle-exclamation"></i></p>');
            $('.alertElejirPass').slideDown();
            return false;
        }

        $.ajax({
            url: 'agregar_ajax.php',
            type: 'POST',
            async: true,
            data: {
                action: action,
                pass_actual: pass_actual,
                pass_new: pass_new,
                pass_confirmado: pass_confirmado
            },
            success: function (response) {
                if (response != 'error') {
                    var info_pas = JSON.parse(response);
                    if (info_pas.codeP == '00') {
                        $('.alertElejirPass').html('<p class="text-center"' +
                            'style="background-color: #28A745; ' +
                            'color: #fff;' +
                            'font-weight: bold;' +
                            'padding: 5px; ' +
                            'border-radius: 0.25rem;">' +
                            '<i class="nav-icon fas fa-check"></i> ' + info_pas.mesg + '</p>');
                        $('#frmElegirPass')[0].reset();
                    } else {
                        $('.alertElejirPass').html('<p class="text-center"' +
                            'style="background-color: #DC3545; ' +
                            'color: #fff;' +
                            'font-weight: bold;' +
                            'padding: 5px; ' +
                            'border-radius: 0.25rem;">' +
                            '<i class="nav-icon fas fa-circle-xmark"></i> ' + info_pas.mesg + '</p>');
                    }
                    $('.alertElejirPass').slideDown();
                }
            },
            error: function (error) {

            }
        });

    })

    //formulario empresa
    $('#frmEmpresa').submit(function (e) {
        e.preventDefault();
        var intRuc = $('#txtRuc').val();
        var Nombre_e = $('#txtNombre').val();
        var Rsocial = $('#txtRSocial').val();
        var intT_e = $('#txtTelefono').val();
        var e_emp = $('#txtCElectronico').val();
        var d_emp = $('#txtDireccion').val();
        var intIva = $('#txtIva').val();

        if (intRuc == '' || Nombre_e == '' || intT_e == '' || e_emp == '' || d_emp == '' || intIva == '') {
            $('.alertFormEmpresa').html('<p class="text-center"' +
                'style="background-color: #FFC107; ' +
                'color: #000;' +
                'font-weight: bold;' +
                'padding: 5px; ' +
                'border-radius: 0.25rem;">' +
                '<i class="nav-icon fas fa-triangle-exclamation"></i>' +
                ' Todos los campos son obligatorios ' +
                '<i class="nav-icon fas fa-triangle-exclamation"></i></p>');
            $('.alertFormEmpresa').slideDown();
            return false;
        }

        $.ajax({
            url: 'agregar_ajax.php',
            type: 'POST',
            async: true,
            data: $('#frmEmpresa').serialize(),
            beforeSend: function () {
                $('.alertFormEmpresa').slideUp();
                $('.alertFormEmpresa').html('');
                $('#frmEmpresa').attr('disabled', 'disabled');
            },
            success: function (response) {
                console.log(response);

                var info_em = JSON.parse(response);
                if (info_em.code == '00') {
                    $('.alertFormEmpresa').html('<p class="text-center"' +
                        'style="background-color: #28A745; ' +
                        'color: #fff;' +
                        'font-weight: bold;' +
                        'padding: 5px; ' +
                        'border-radius: 0.25rem;">' +
                        '<i class="nav-icon fas fa-check"></i> ' + info_em.mesg + '</p>');
                    $('.alertFormEmpresa').slideDown();
                } else {
                    $('.alertFormEmpresa').html('<p class="text-center"' +
                        'style="background-color: #DC3545; ' +
                        'color: #fff;' +
                        'font-weight: bold;' +
                        'padding: 5px; ' +
                        'border-radius: 0.25rem;">' +
                        '<i class="nav-icon fas fa-circle-xmark"></i> ' + info_em.mesg + '</p>');
                }
                $('.alertFormEmpresa').slideDown();
                $('#frmEmpresa input').removeAttr('disabled');
            },
            error: function (error) {

            }
        });
    })

    //button pass
    $('.btnElegirPass').submit(function (e) {
        e.preventDefault();
    })



}); //end ready

//validad contraseña
function validar_Pass() {
    var pass_new = $('#txt_nuevaP').val();
    var confirm_pas_new = $('#txt_confirmarP').val();

    if (pass_new != confirm_pas_new) {
        $('.alertElejirPass').html('<p class="text-center"' +
            'style="background-color: #DC3545; ' +
            'color: #fff;' +
            'font-weight: bold;' +
            'padding: 5px; ' +
            'border-radius: 0.25rem;">' +
            '<i class="nav-icon fas fa-circle-xmark"></i>' +
            'Las contraseñas no coinciden</p>');
        $('.alertElejirPass').slideDown();
        return false;
    }

    if (pass_new.length < 6) {
        $('.alertElejirPass').html('<p class="text-center"' +
            'style="background-color: #FFC107; ' +
            'color: #000;' +
            'font-weight: bold;' +
            'padding: 5px; ' +
            'border-radius: 0.25rem;">' +
            '<i class="nav-icon fas fa-triangle-exclamation"></i> ' +
            'La contraseña debe ser de 6 caracteres como minimo ' +
            '<i class="nav-icon fas fa-triangle-exclamation"></i></p>');
        $('.alertElejirPass').slideDown();
        return false;
    }
    $('.alertElejirPass').html('');
    $('.alertElejirPass').slideUp();
}

//generar factura
function generarPDF(cliente, factura) {
    var ancho = 750;
    var alto = 700;
    //se calcula las posiciones x,y 
    var x = parseInt((window.screen.width / 2) - (ancho / 2));
    var y = parseInt((window.screen.height / 2) - (alto / 2));

    $url = '../factura/generaFactura.php?cl=' + cliente + '&f=' + factura;
    window.open($url, "Factura", "left=" + x + ",top=" + y + ",height=" + alto + ",width=" + ancho + ",scrollbar=si,location=no,resizable=si,menubar=no");
}

//del prod_detall
function del_product_detalle(correlativo) {
    var action = 'delProductoDetalle';
    var id_detalle = correlativo;
    $.ajax({
        url: 'agregar_ajax.php',
        type: "POST",
        async: true,
        data: {
            action: action,
            id_detalle: id_detalle
        },
        success: function (response) {
            if (response != 0) {
                var info_prod = JSON.parse(response);
                $('#detalle_venta').html(info_prod.detalle);
                $('#detalle_totales').html(info_prod.totales);
                $('#txt_cod_producto').val('');
                $('#txt_descripcion').html('-');
                $('#txt_stock').html('-');
                $('#txt_cant_producto').val('0');
                $('#txt_precio').html('0.00');
                $('#txt_precio_total').html('0.00');

                // Bloquear cantidad
                $('#txt_cant_producto').attr('disabled', 'disabled');

                // Ocultar boton agregar
                $('#add_product_venta').slideUp();
            } else {
                $('#detalle_venta').html('');
                $('#detalle_totales').html('');
            }
            viewProcesar();
        },
        error: function (error) {

        }
    });
}

// mostrar/ ocultar boton Procesar
function viewProcesar() {
    if ($('#detalle_venta tr').length > 0) {
        $('#btn_facturar_venta').show();
        $('#btn_anular_venta').show();
    } else {
        $('#btn_facturar_venta').hide();
        $('#btn_anular_venta').hide();
    }
}

//buscar detalle
function searchForDetalle(id) {
    var action = 'searchForDetalle';
    var user = id;
    $.ajax({
        url: 'agregar_ajax.php',
        type: "POST",
        async: true,
        data: {
            action: action,
            user: user
        },
        success: function (response) {
            if (response == 0) {
                console.log('No hay Datos');
            } else {
                var info = JSON.parse(response);
                $('#detalle_venta').html(info.detalle);
                $('#detalle_totales').html(info.totales);

            }
            viewProcesar();
        },
        error: function (error) {

        }
    });
}

function getUrl() {
    var local = window.location;
    var pathName = local.pathname.substring(0, local.pathname.lastIndexOf('/') + 1);
    return local.href.substring(0, local.href.length - ((local.pathname + local.search + local.hash).length - pathName.length))
}

function sendDataProd() {
    $('.alertAddProd').html('');
    $.ajax({
        type: "POST",
        url: "agregar_ajax.php",
        async: true,
        data: $('#form_add_stock').serialize(),
        success: function (response) {
            if (response == 'error') {
                $('.alertAddProd').html('<p style="color: red;">Error al agregar producto</p>')
            } else {
                var info = JSON.parse(response);
                $('.row' + info.producto_id + '.celPrecio').html(info.nuevo_precio);
                $('.row' + info.producto_id + '.celStock').html(info.nueva_existencia);
                $('#txtCantidad').val('');
                $('#txtPrecio').val('');
                $('.alertAddProd').html('<p style="color: #28A745">Producto agregado con exito</p>')
            }
        },

        error: function (error) {
            console.log(error);
        },
    });
}

//eliminar producto
function delProd() {
    var prd = $('#producto_id').val();
    $('.alertAddProd').html('');
    $.ajax({
        type: "POST",
        url: "agregar_ajax.php",
        async: true,
        data: $('#form_del_stock').serialize(),
        success: function (response) {
            console.log(response);

            if (response == 'error') {
                $('.alertAddProd').html('<p style="color: red;">Error al eliminar producto</p>')
            } else {
                $('.row' + prd).remove();
                $('#form_del_stock .btn_delete').remove();
                $('.alertAddProd').html('<p style="color: #28A745">Producto eliminado con exito</p>')
            }
        },

        error: function (error) {
            console.log(error);
        },
    });
}

function closeModal() {
    $('.alertAddProd').html('');
    $('#txtCantidad').val('');
    $('#txtPrecio').val('');
    $('.modal').fadeOut();
}