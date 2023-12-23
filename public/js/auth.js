const formulario = document.querySelector('form');
const url = 'http://localhost:8080/api/auth/';

formulario.addEventListener('submit',(ev)=>{

  ev.preventDefault();//no hacer refres
  const formsdata={};

  //Leemos todos los elementos del formulario
  for (const elemento of formulario.elements) {
    
    if(elemento.name.length>0){
      formsdata[elemento.name] = elemento.value;
    }

  }

  fetch(url+'login',
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formsdata)
  }
  )
  .then((resp)=>resp.json())
  .then(({msg,token})=>{        
    
    if(msg){
      return console.error(msg);
    }
    localStorage.setItem('token',token);
    window.location='chat.html'
  })
  .catch(console.warn);

  console.log('formada',formsdata);

});

function handleCredentialResponse(response) {
  
  const body = {id_token:response.credential};

  fetch(url+'google',
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  }
  )
  .then((resp)=>resp.json())
  .then(resp=>{        
    localStorage.setItem('token',resp.token);
    console.log(resp.token);
  })
  .catch(console.warn);

  //  console.log('id token',response.credential);

   
}

const btngoogle = document.getElementById('googleSinoute');

btngoogle.onclick = ()=>{
  console.log(google.accounts.id);
  google.accounts.id.revoke(localStorage.getItem('correo'),done=>{
    localStorage.clear();
    location.reload();
  });
  

}