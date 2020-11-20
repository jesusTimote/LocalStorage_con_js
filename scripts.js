let agregar = [];
const Enviar = document.getElementById("Formulario");
const checkbox = document.getElementById("check");
let tabla = document.getElementById("table");
let btnGuardar = document.getElementById("Guardar");
let btnActualizar = document.getElementById("Actualizar");

//btnActualizar.style.visibility = "hidden";

const GuardarDatos = () => {
    let nombre = document.getElementById("Nombre").value;
    let apellido = document.getElementById("Apellido").value;
    let correo = document.getElementById("Correo").value;
    let usuario = document.getElementById("Usuario").value;
    let contraseña = document.getElementById("Contraseña").value;

    const Datos = {
        nombre,
        apellido,
        correo,
        usuario,
        contraseña,
    };

    if (agregar === null) {
        agregar = [];
        console.log(agregar);
    }

    if (document.body.contains(checkbox)) {
        if (checkbox.checked) {
            swal({
                text: "Registro Exitoso",
                icon: "success",
                button: "OK",
            })
            .then(()=>{
                agregar.push(Datos);
                console.log(agregar);
                localStorage.setItem("usuario", JSON.stringify(agregar));
                window.location.href = "index.html";
            })
            
            // listar();
        } else {
            swal({
                text: "Marcar los Terminos y Condiciones",
                icon: "error",
                button: "OK",
            })
        }
    } else {
        swal({
            text: "Exito al guadar",
            icon: "success",
            button: "ok",
        })
        agregar.push(Datos);
        console.log(agregar);
        localStorage.setItem("usuario", JSON.stringify(agregar));
        listar();
    }
};

Enviar.addEventListener("submit", (e) => {
    GuardarDatos();
    Enviar.reset();
    e.preventDefault();
});

let listar = function () {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));
    agregar = arrayLista; //para que se agregen con los anteriores

    $("#example").DataTable({
        destroy: true,
        data: arrayLista,
        columns: [
            {
                data: null,
                render: (data, type, full, number) => {
                    return number.row + 1;
                },
            },
            { data: "nombre" },
            { data: "apellido" },
            { data: "correo" },
            { data: "usuario" },
            { data: "contraseña" },
            {
                data: "nombre",
                render: (data) => {
                    return (
                        "<a class='btn btn-success' onclick=Editar('" +
                        data +
                        "') style='margin-left:12px' title='Editar'><i class='fas fa-edit'></i><a/>  <a class='btn btn-danger' onclick=Eliminar('" +
                        data +
                        "')><i class='fas fa-trash-alt'></i><a/>"
                    );
                },
            },
            //{"defaultContent":"<buttom class='btn btn-success'><i class='fas fa-edit'></i></buttom> | <buttom id='eliminar'  class='btn btn-danger'><i class=' fas fa-trash-alt'></i></buttom>" }
        ],
    });
};

document.addEventListener("DOMContentLoaded", listar);

function Eliminar(nombre) {
    //  console.log(nombre)
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));

    let resultadoIndex = arrayLista.findIndex((e) => e.nombre === nombre);
    swal({
        title: "Deseas Eliminar ?",
        text: "Al Eliminar ya no podras recuperar los datos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                if (resultadoIndex != -1) {
                    arrayLista.splice(resultadoIndex, 1);

                    localStorage.setItem("usuario", JSON.stringify(arrayLista));

                    listar();
                } else {
                    alert("Al Intentar Eliminar ,no se encontro el registro")
                }
                swal("Eliminado con Exito!", {
                    icon: "success",
                });
            }
        });


}

const Editar = (nombre) => {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));
    let nombres = document.getElementById("Nombre");
    let apellido = document.getElementById("Apellido");
    let correo = document.getElementById("Correo");
    let usuario = document.getElementById("Usuario");
    let contraseña = document.getElementById("Contraseña");
    let codigo = document.getElementById("Codigo");

    let resultado = arrayLista.find((e) => e.nombre == nombre);
    let resultadoIndex = arrayLista.findIndex((e) => e.nombre === nombre);

    codigo.value = resultadoIndex;
    nombres.value = resultado.nombre;
    apellido.value = resultado.apellido;
    correo.value = resultado.correo;
    usuario.value = resultado.usuario;
    contraseña.value = resultado.contraseña;

    btnGuardar.style.display = "none";
    btnActualizar.style.visibility = "visible";
};

const Modificar = () => {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));

    let nombre = document.getElementById("Nombre").value;
    let apellido = document.getElementById("Apellido").value;
    let correo = document.getElementById("Correo").value;
    let usuario = document.getElementById("Usuario").value;
    let contraseña = document.getElementById("Contraseña").value;
    let codigo = document.getElementById("Codigo").value;

    btnActualizar.style.visibility = "hidden";
    btnGuardar.style.display = "block";
    swal({
        title: "Deseas Actualizar ?",
        text: "Al Actualizar ya no podras recuperar los datos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                arrayLista[codigo].nombre = nombre;
                arrayLista[codigo].apellido = apellido;
                arrayLista[codigo].correo = correo;
                arrayLista[codigo].usuario = usuario;
                arrayLista[codigo].contraseña = contraseña;
                localStorage.setItem("usuario", JSON.stringify(arrayLista));
                Enviar.reset();
                listar();
                swal("Actualizado con Exito!", {
                    icon: "success",
                });
            }
        });

};
const Actualiza = (document.getElementById("Actualizar").onclick = Modificar);

/************Funciones alternativas ********************/

/*
const listar = () => {
    tabla.innerHTML = '';
    let  arrayLista = JSON.parse(localStorage.getItem('usuario'));
        tabla.innerHTML += '';
        arrayLista.forEach(element => {
            tabla.innerHTML += `
        <tr>
            <td> # </td>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.correo}</td>
            <td>${element.usuario}</td>
            <td>${element.contraseña}</td>
        </tr>`

        })

}
*/

/*
function Eliminar(nombre) {
    //  console.log(nombre)
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));

   for (let i = 0; i < arrayLista.length; i++) {
        console.log(arrayLista[i][2])
        if (arrayLista[i].nombre  === nombre) {
            arrayLista.splice(i, 1);
        }
    }

    localStorage.setItem("usuario", JSON.stringify(arrayLista));
    listar();
}

*/
/******************************************* */
/*
 for(let lista of arrayLista){
    if( lista.nombre==nombre){
      console.log(arrayLista.splice(lista,1))
     }

  }
  localStorage.setItem("usuario", JSON.stringify(arrayLista))
  listar();
  */

/*
window.onload = function() {

    function Eliminar(nombre){
      console.log(nombre)
   }

document.querySelector("#eliminar").onclick = Eliminar;
}
*/

//const Enviar = document.getElementById("Guardar").onclick=GuardarDatos;
