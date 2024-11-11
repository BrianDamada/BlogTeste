import { useState, useEffect } from "react";
import "./style.css";

const Poster = () => {
  // Inicializa o estado dos posts com o conteúdo do localStorage, se existir
  const [posts, setPost] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : []; // Se houver posts, retorna os armazenados, caso contrário, um array vazio
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Função para adicionar o post
  const handleAddPost = () => {
    const newPost = { title, description, imageUrl: "" };

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        newPost.imageUrl = reader.result;

        // Adiciona o novo post no início do array para mantê-lo como o mais recente
        const updatedPosts = [newPost, ...posts];
        setPost(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Atualiza o localStorage

        // Limpa os campos
        setTitle("");
        setDescription("");
        setImage(null);
      };

      reader.readAsDataURL(image);
    } else {
      const updatedPosts = [newPost, ...posts]; // Adiciona no início para manter a ordem
      setPost(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Atualiza o localStorage

      setTitle("");
      setDescription("");
    }
  };

  // Função para excluir o post
  const handleDeletePost = (index) => {
    // Cria um novo array sem o post excluído
    const updatedPosts = posts.filter((_, i) => i !== index);

    // Atualiza o estado e o localStorage
    setPost(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center container">
      <div className="flex flex-col w-[70%]">
        <div className="flex flex-col text-left w-[30%]">
          <h1>Titulo:</h1>
          <input
            type="text"
            name="titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // captura e atualiza o valor dentro do input
          />
        </div>
        <div className="flex flex-col text-left w-[90%]">
          <h1>Descrição:</h1>
          <textarea
            type="text"
            name="descricao"
            value={description}
            className="h-20"
            onChange={(e) => setDescription(e.target.value)} // captura e atualiza o valor dentro do textarea
          />
        </div>
        <div>
          <button onClick={handleAddPost}>Subimit</button>
        </div>
        <div className="flex flex-col text-left w-[90%]">
          <h1>Adicionar Imagens</h1>
          <div className="file-upload">
            <label htmlFor="file">Escolher Arquivo</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-4">
        {posts.map((post, index) => (
          <div key={index} className="p-4 mb-2 border rounded items-center">
            <div className="flex justify-between">
              <h2 className="flex items-center text-3xl font-bold ">
                {post.title}
              </h2>
              <button
                onClick={() => handleDeletePost(index)} // Chama a função de excluir quando o botão é clicado
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Excluir
              </button>
            </div>
            <p>{post.description}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poster;
