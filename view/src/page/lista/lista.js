import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FiX, FiPlus } from "react-icons/fi";
import { MdSend, MdRefresh } from "react-icons/md";
import { useForm } from "react-hook-form";
import api from "../../service/api";
import Modal from "react-modal";
import "./style.css";

const Lista = () => {
  const [users, setUsers] = useState([]);
  const { handleSubmit, register, watch } = useForm();
  const [modalEdit, setEdit] = React.useState(false);
  const [modalAdd, setAdd] = React.useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    data: "",
    foto: "",
  });

  const openModal = (id) => {
    setEdit(true);
  };

  const addUser = () => {
    console.log("oi");
    setAdd(true);
  };

  const closeModal = () => {
    setEdit(false);
    setAdd(false);
  };

  useEffect(() => {
    api
      .get()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => error);
  });

  const deleteUser = (id) => {
    api.delete(`delete/${id}`);
    alert("Dado Exlcluído com Sucesso!");
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("form: ", name, value);
    if (name === "Foto") {
      let dataImage = localStorage.getItem("imgData");
      let bannerImg = document.getElementById("uploadImage");
      bannerImg.src = "data:image/png;base64," + dataImage;
    }
    setFormData({ ...formData, [name]: value });
  }

  async function handleAddUser(event: FormEvent) {
    event.preventDefault();
    const { codigo, nome, data, foto } = formData;
    const dados = { codigo, nome, data, foto };
    console.log("add->", dados);
    await api
      .post("/user", {
        CODE: dados.codigo,
        NOME: dados.nome,
        DATA: dados.data,
        FOTO: dados.foto,
      })
      .then(() => {
        setAdd(false);
        alert("Novo Dado adicionado!");
      })
      .catch((error) => error);
  }

  const handleEditUser = (data) => {
    console.log("put->", data);
    api
      .put("update", {
        CODE: data.codigo,
        NOME: data.nome,
        DATA: data.data,
        FOTO: data.foto,
        ID: data.id,
      })
      .then(() => {
        setAdd(false);
        alert("Dado atualizado!");
      })
      .catch((error) => error);
  };

  return (
    <div>
      <div className="flex">
        <h2>Listagem</h2>
        <button className="add-button" title="adicionar" onClick={addUser}>
          <FiPlus />
        </button>
      </div>
      <div className="grid">
        {users.map((user) => {
          const id = user.ID;
          return (
            <div key={id}>
              <div className="card">
                <div className="cardImage">
                  <img src={user.FOTO} alt="foto" />
                </div>
                <div className="cardBody">
                  <h1>{user.NOME}</h1>
                  <label>{user.DATA.slice(0, 10).toString()}</label>
                </div>
                <div className="cardFood">
                  <button title="editar" onClick={() => openModal(id)}>
                    <BiEdit />
                  </button>
                  <button title="deletar" onClick={() => deleteUser(id)}>
                    <BiTrash />
                  </button>
                </div>
              </div>
              <Modal
                className="modalAdd"
                isOpen={modalAdd}
                ariaHideApp={false}
                onRequestClose={closeModal}
              >
                <div className="modalHead">
                  <h2>Criação de Dados</h2>
                  <button title="fechar" onClick={closeModal}>
                    <FiX />
                  </button>
                </div>
                <form className="Form" onSubmit={handleAddUser}>
                  <div className="group">
                    <label htmlFor="Codigo">Código</label>
                    <input
                      name="codigo"
                      type="text"
                      placeholder="Digite o código do dado"
                      className="inputForm"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      name="nome"
                      type="text"
                      placeholder="Digite o nome do dado"
                      className="inputForm"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="data">Data de nascimento</label>
                    <input
                      name="data"
                      type="date"
                      placeholder="Digite o codigo do dado"
                      className="inputForm"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="foto">Foto</label>
                    <input
                      name="foto"
                      type="text"
                      id="uploadImage"
                      placeholder="Digite a url da imagem"
                      className="inputForm"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="button">
                    Enviar
                    <MdSend size="1.8rem" />
                  </button>
                </form>
              </Modal>
              <Modal
                className="modalEdit"
                isOpen={modalEdit}
                ariaHideApp={false}
                onRequestClose={closeModal}
              >
                <div className="modalHead">
                  <h2>Edição de Dados</h2>
                  <button title="fechar" onClick={closeModal}>
                    <FiX />
                  </button>
                </div>
                <form
                  className="Form"
                  method="put"
                  onSubmit={handleSubmit(handleEditUser)}
                >
                  <div className="group">
                    <input
                      name="id"
                      type="number"
                      value={user.ID}
                      hidden
                      ref={register}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="Codigo">Código</label>
                    <input
                      name="codigo"
                      type="text"
                      placeholder="Digite o código do dado"
                      className="inputForm"
                      ref={register}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      name="nome"
                      type="text"
                      placeholder="Digite o nome do dado"
                      className="inputForm"
                      ref={register}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="data">Data de nascimento</label>
                    <input
                      name="data"
                      type="date"
                      placeholder="Digite o codigo do dado"
                      className="inputForm"
                      ref={register}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="foto">Foto</label>
                    <input
                      name="foto"
                      type="text"
                      id="uploadImage"
                      placeholder="Digite a url da imagem"
                      className="inputForm"
                      ref={register}
                    />
                  </div>
                  <button type="submit" className="button">
                    Atualizar
                    <MdRefresh size="2em" />
                  </button>
                </form>
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lista;
