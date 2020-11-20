let Iniciar = document.getElementById("FormularioLogin");


const ValidarSesion = (usuario, contraseña) => {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));
    let acceso = false;

    for (let i = 0; i < arrayLista.length; i++) {
        
        if (arrayLista[i].usuario  === usuario && arrayLista[i].contraseña  === contraseña) {
            
            
                acceso = true;
                sessionStorage.setItem("usuarioActivo", arrayLista[i].nombre + ' ' + arrayLista[i].apellido)
              
        
        }
   
    }
  
    return acceso;
    
}


const IniciarSesion = () => {

    let usuario = document.getElementById("Usuario").value;
    let contraseña = document.getElementById("Contraseña").value;
    let acceso = false;

    acceso = ValidarSesion(usuario, contraseña);
    
    if(acceso){
        swal({
            title: "Exito !",
            text: `Bienvenido ${usuario} `,
            icon: "success",
            button: "OK",
          })
          .then(()=>{
            window.location.href = "Principal.html"
          })
        
    }else{
        swal({
            title: "Error !",
            text: `Usuario / Contraseña incorrecta`,
            icon: "error",
            button: "OK",
          })
    }
        

}



Iniciar.addEventListener("submit", (e) => {
    IniciarSesion();
    e.preventDefault();
});