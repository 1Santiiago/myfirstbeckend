const db = require("../data/database");

const getAllUsers = (req, res) => {
  return res.json(db.users);
};

const getUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.json(user);
};

// create user

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }
  const newUser = {
    id: db.nextProductId++,
    name,
    email,
  };

  db.users.push(newUser);

  return res.json({
    message: "Usuario criado com sucesso",
    user: newUser,
  });
};

// editando user

const updateUser = (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = db.users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.send(404).json({ error: "Usuario nao encontrado" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.send(400).json({ error: "Nome e emails são obrigatório" });
  }

  db.users[userIndex] = {
    id: userId,
    name,
    email,
  };

  return res.json({
    message: 'Usuario atualizado'
  })
};


// vamos criar um delete usuario?

const deleteUser = (req, res) => {
    const userId = Number(req.params.id)
    const userIndex = db.users.findIndex((u)=> u.id === userId)

    if(userIndex === -1){
        return res.status(404).send()
    }

    db.users.splice(userIndex, 1)
    return res.json({message: 'Usuario exluido com sucesso'})
}



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
 
};
