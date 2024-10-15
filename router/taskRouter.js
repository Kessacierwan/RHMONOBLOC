const taskRouter = require("express").Router()
const {PrismaClient} = require("@prisma/client")
const authguard = require("../services/authguard")

const prisma = new PrismaClient()

taskRouter.post("/addTask/:id",authguard,async(req,res)=>{
try {

    const task = await prisma.task.create({
data :{
    title : req.body.title,
    content : req.body.content,
    employeId : parseInt(req.params.id)

}

    })
    // res.render("pages/addTask.twig",{task : task})
    res.redirect("/")
} catch (error) {
    console.log(error)
    res.render("pages/addTask.twig")
    
}
})

taskRouter.get("/addTask/:id",authguard,async(req,res)=>{
    res.render("pages/addTask.twig", {employe : req.params.id})
})

taskRouter.get("/deleteTask/:id", authguard, async (req, res) => {
    try {
      const deleteTask = await prisma.task.delete({
        where: {
          id: parseInt(req.params.id)
        }
      });
      res.redirect("/"); // Redirection vers la page de dashboard
    } catch (error) {
      console.log(error)
    }
  });


  taskRouter.get("/updateTask/:id",authguard,async(req,res)=>{
    try {
        const updateTask = await prisma.task.update({
            where : {
                id: parseInt(req.params.id)
            },
            data :{
                isValid : true
            }
        })
        console.log('tache validée avec succes')
        res.redirect ("/")
    } catch (error) {
        console.log(error)
    }
  })



module.exports = taskRouter