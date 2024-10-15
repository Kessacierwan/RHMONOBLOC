const employeRouter = require("express").Router()
const {PrismaClient} = require("@prisma/client")
const authguard = require("../services/authguard")

const prisma = new PrismaClient()

employeRouter.get("/addEmploye",authguard,(req,res)=>{
res.render("pages/addEmploye.twig")

})

// Ajouter un employé  // 
employeRouter.post("/addEmploye",authguard,async (req,res)=>{
    try {
        const employe = await prisma.employe.create({
            data:{
                nom : req.body.nom,
                prenom : req.body.prenom,
                motDePasse : req.body.motDePasse,
                age : parseInt(req.body.age),
                sexe : req.body.sexe,
                entrepriseId: req.session.entreprise.id 

            }

        })
        res.redirect("/")
    } catch (error) {
        console.log(error)

        res.render("pages/addEmploye.twig")
    }
}) 

// GET employé a Modifier un employé // 
employeRouter.get("/modifyEmploye/:id",authguard,async (req,res)=>{
    res.render("pages/modifyEmploye.twig",{
        entreprise : req.session.entreprise,
        employe : await prisma.employe.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        })
    })
})

//POST de la modif employé // 
employeRouter.post("/modifyEmploye/:id",authguard,async (req,res)=>{
    try {
        const modifyEmploye = await prisma.employe.update({
            where : {
                id : parseInt (req.params.id)
            },
            data:{
                nom : req.body.nom,
                prenom : req.body.prenom,
                age : parseInt (req.body.age)
            }
        })
        res.redirect ('/')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// supprimer un employé //

employeRouter.get("/deleteEmploye/:id", authguard, async(req,res)=>{
    try {
        const deleteEmploye = await prisma.employe.delete({
            where :{
                id : parseInt(req.params.id)
            }
        })  
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }

})

// employeRouter.



module.exports = employeRouter