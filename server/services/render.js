const bcrypt = require('bcrypt');
const session = require('express-session');
const {collection1,collection2} = require('../../model/mongodb');
const { ObjectId } = require('mongodb');


// ======================= login page ==========================//
exports.homeRoute = (req, res)=> {
      res.render("login");
}


//=========================== home page ========================//
exports.loginPage = (req, res) =>{
      res.redirect('/login');
}

//========================== register page ======================//
exports.registerRoute = (req, res)=> {
      res.render("register")
}

//============================ home page ========================//
exports.TodoPage = async (req, res) => {
      const userId = req.session.userId
      const data = await collection2.find({userId : userId})
    //   console.log(data)
      res.render('index', {data, userId})
}

//======================= add todo page rendering =====================//
exports.addTodo = (req, res)=> {
      const userId = req.params.id;
      res.render('addtodo', {userId})
}

//======================= update-todo page ================================//
exports.updateTodo  =async(req, res) => {
      const userId = req.session.userId
      const todoId = req.params.id
      const todo = await collection2.findOne({_id:todoId})
      res.render('updatetodo', {todo,userId})
}

//==============================user logout ==============================//
exports.logoutUser = (req, res) => {
      console.log('Reached the logout page')
      req.session.destroy((err) => {
            if (err) {
              console.error('Failed to destroy session:', err);
              return;
            }    
            res.redirect('/'); 
          });
}