import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Body from './components/Body'

//url da api -> endpoint
const url = "http://localhost:3000/vehicle";

function App() {
  const [products, setProducts] = useState([]);
  const [marca, setMarca] = useState ("");
  const [modelo, setModelo] = useState ("");
  const [preco, setPreco] = useState ("");
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState (null)

  useEffect(() => {
    //aqui ele vai consultar -> get post put delete
    async function fetchData() {
      const resp = await fetch(url)
      const data = await resp.json()
      setProducts(data)
    }

    fetchData();

  }, []);


  //função para adicionar ou editar produtos
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados salvos/atualizados com sucesso')
  
    const product = { marca, modelo, preco: parseFloat(preco) };
    let res;
  
    if (editMode) {
      res = await fetch(`${url}/${editId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
  
      setEditMode(false);
      setEditId(null);
    } else {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(product),
      });
    }
  
    const data = await res.json();
    setProducts((prevProducts) => {
      if (editMode) {
        return prevProducts.map((p) => (p.id === data.id ? data : p));
      } else {
        return [...prevProducts, data];
      }
    });
  
    setMarca('');
    setModelo('');
    setPreco('');
  };
  

  //função para deletar o produto
  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  }

  //função para inciar a edicao de um produto
  const handleEdit = (product) => {
    setMarca(product.marca);
    setModelo(product.modelo);
    setPreco(product.preco);
    setEditMode(true);
    setEditId(product.id);
  }

  return (
    <>
      <Header />
      <Body
        products = {products}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
        marca = {marca}
        modelo = {modelo}
        preco = {preco}
        setMarca = {setMarca}
        setModelo = {setModelo}
        setPreco = {setPreco}
        editMode = {editMode}
        handleSubmit = {handleSubmit}
      />
      <Footer />
    </>
  )
}


export default App
