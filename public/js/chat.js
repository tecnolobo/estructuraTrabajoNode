// const socket = io();
const url='http://localhost:8080/api/auth';
let usuario =null;
let socketServer;

//Referencias html
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnsalid   = document.querySelector('#btn-salid');

const validarJwt= async ()=>{

  const token= localStorage.getItem('token')||'';

  if (token.length<=10){
    window.location='index.html';
    throw new Error('No hay token en la aplicacion');

  }

  const resp = await fetch(url,
  {
    method:'GET',
    headers:{
      'x_token':token,
      'Content-Type':'application/json'
    }
  }
  );

  const {token:tokenDB,usaurioAutenticado:userDB}= await resp.json();
  localStorage.setItem('token',tokenDB);
  usuario = userDB;

  document.title = usuario.nombre;

  await conectarSocket();

}

const conectarSocket = async ()=>{
  
  socketServer = io({
    'extraHeaders':{
      'x_token': localStorage.getItem('token')
    }
  });

  socketServer.on('connect',()=>{
    console.log('sockect onlien');
  });

  
  socketServer.on('disconnect',()=>{
    console.log('sockect Offline');
  });

  socketServer.on('recibir-mensajes',(payload)=>{
    dibujarMensajes(payload);
  });

  socketServer.on('usuario-activos',(payload)=>{
    dibujarUsuario(payload);
  });

  socketServer.on('mensaje-privado',(payload)=>{
    console.log('privado',payload);
  });

}

const dibujarUsuario =(usuario=[])=>{
  let usersHtml ='';
  let tablehtml =document.createElement("table");  
  const tblBody = document.createElement("tbody");
  const tblheader = document.createElement("thead");
  let row ;
  let celda;
  let textoCelda;   
  
    row   = document.createElement("tr");
    celda = document.createElement("td");

    textoCelda = document.createTextNode('Usuario');
    celda.appendChild(textoCelda);
    row.appendChild(celda);

    celda = document.createElement("td");
    textoCelda = document.createTextNode('uid');
    celda.appendChild(textoCelda);
    row.appendChild(celda);

    tblheader.appendChild(row);
  
  usuario.forEach(({nombre,uid}) => {
    row   = document.createElement("tr");
    celda = document.createElement("td");
    
    textoCelda = document.createTextNode(nombre);
    celda.appendChild(textoCelda);
    row.appendChild(celda);
    
    celda = document.createElement("td");
    textoCelda = document.createTextNode(uid);
    celda.appendChild(textoCelda);
    row.appendChild(celda);
    
    tblBody.appendChild(row);
    
  });
  
  tablehtml.classList.add('table','table-dark','table-striped');
  tablehtml.appendChild(tblheader);
  tablehtml.appendChild(tblBody);

  ulUsuarios.innerHTML='';
  ulUsuarios.appendChild(tablehtml);

}


txtMensaje.addEventListener('keyup',({keyCode})=>{

  const mensaje = txtMensaje.value;
  const uid = txtUid.value;

  if(keyCode!==13){
    return;
  }

  if(mensaje.length===0){
    return null;
  }

  socketServer.emit('enviarMensaje',{uid,mensaje});

  txtMensaje.value = '';

});


const dibujarMensajes =(mensajes=[])=>{
  let mensajesHtml ='';
  mensajes.forEach(({nombre,uid,mensaje}) => {
    
    mensajesHtml += `
    <li>
      <p>
        <h5 class="text-primary">${nombre}:<h5/>
        <span>${mensaje}</span>
      </p>
    </li>
    `;
  });

  ulMensajes.innerHTML=mensajesHtml;

}


const main= async()=>{
  //valdiar jwt
  await validarJwt();

}

main();



