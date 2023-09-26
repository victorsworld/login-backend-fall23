module.exports = {
  login: async (req,res) => {
    if(req.body.password === 'abc'){
    res.send({
      username: req.body.username,
      password: req.body.password
    }
    )
    }else {
    res.sed("Bad Password")
    }
  },
  register: () => {},
};
