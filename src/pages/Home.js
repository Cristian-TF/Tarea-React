import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormularioUsuario,
  TablaUsuarios,
  BotonFormulario,
} from "../components";

const usuario1 = [
  {
    nombre: "Alberto",
    apellido: "Rodriguez",
    correo: "Doraemon@gmail.com",
    rut: "15222333-2",
  },
  {
    nombre: "Andrea",
    apellido: "Valenzuela",
    correo: "Aqua@gmail.com",
    rut: "17456329-9",
  },
  {
    nombre: "Alejandro",
    apellido: "Baltares",
    correo: "Kokun@gmail.com",
    rut: "16444222-8",
  },
];

const usuario2 = {
  nombre: "Catalina",
  apellido: "Milgram",
  correo: "Darkness@gmail.com",
  rut: "17456329-9",
};

const HomePage = () => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate("/Auto", {}, [navigate]));
  //en este momento state vale lo mismo que usuario 1
  //genera una funcion setteadora que me va a permitir cambiar los datos se usuario 1 sin afectarlo directamente(setState)
  const [user, setUser] = useState(usuario1);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  const userDelete = (rutUsuario) => {
    //esta funcion filtra mi lista de usuarios
    const changeUser = user.filter((usuario) => usuario.rut != rutUsuario);
    //al momento de ocupar la funcion setState, yo le voy a cambiar el valor TEMPORAL a mis usuarios
    setUser(changeUser);
  };

  const userAdd = (usuario) => {
    const addUsuario = [
      //mantenme los datos que tengo en user y agregame lo que yo te entrego aqui (usuario)
      ...user,
      usuario,
    ];
    //luego actualizamos (o setteamos) el state
    setUser(addUsuario);
  };

  const userEdit =(usuarioEditado)=>{
    const editUser = user.map(usuario => (usuario.rut === usuarioEditado.rut ? usuarioEditado : usuario))

    setUser(editUser);
  }

  return (
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <FormularioUsuario
            userAdd={userAdd}
            usuarioEditado={usuarioEditado}
            setUsuarioEditado={setUsuarioEditado}
            userEdit={userEdit}
          />
        </div>
      </div>
      <BotonFormulario infoBoton={"Click para ir a autos"} handleOnClick={handleOnClick} />
      <hr />
      <div class="row">
        <div class="col">
          <TablaUsuarios usuarios={user} deleteUser={userDelete} setUsuarioEditado={setUsuarioEditado} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
