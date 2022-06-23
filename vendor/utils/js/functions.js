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
            data: {action,producto},
            success: function (response) {
                if (response != 'error') {
                    var info = JSON.parse(response);
                    
                    $('#producto_id').val(info.codproducto);
                    $('.name_prod').html(info.descripcion);
                }
            },

            error: function (error) {
                console.log(error);
            },
        });


        $('.modal').fadeIn();
    });
});



function closeModal() {
    $('.modal').fadeOut();
}