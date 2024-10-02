import React from "react"

function Body({
    products, handleEdit, handleDelete, marca, modelo, preco, setMarca, setPreco, setModelo, editMode, handleSubmit
}) {
    return (
        <main className="body">
            {/**card lista */}
            <div className="container">
                <div className="products-card">
                    <h2>Lista de veículos:</h2>
                    <ul className="product-list">
                        {products.map((product) => (
                            <li key={product.id} className="product-item"> 
                                <div className="product-details">
                                    <h3>Marca: {product.marca}</h3>
                                    <p>Modelo: {product.modelo}</p>
                                    <p>R$:{product.preco}</p>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => handleEdit(product)}>Editar</button>
                                    <button onClick={() => handleDelete(product)}>Deletar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/**card forms é aqui */}
                <div className="form-card">
                        <h2> {editMode ? 'Editar produto': 'Adicionar Produto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <label >
                                Marca:
                                <input
                                 type="text" 
                                 name="name"
                                 value={marca}
                                 onChange={(e) => setMarca(e.target.value) }
                                 required
                                 minLength={3}
                                />
                            </label>
                            <label >
                                Modelo:
                                <input
                                 type="text" 
                                 value={modelo}
                                 name="name"
                                 onChange={(e) => setModelo(e.target.value) }
                                 required
                                 minLength={3}
                                />
                            </label>
                            <label >
                                Preço:
                                <input
                                 type="number" 
                                 value={preco}
                                 name='preco'
                                 onChange={(e) => setPreco(e.target.value) }
                                 required
                                 minLength='0.01'
                                />
                            </label>
                            <input type="submit" value={editMode ? "Atualizar" : "Criar"} />
                        </form>
                </div>



            </div>
        </main>
    )
}  

export default Body
