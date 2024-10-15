const ordinateurRouter = require("express").Router()
const {PrismaClient} = require("@prisma/client")
const authguard = require("../services/authguard")

const prisma = new PrismaClient()


// route pour trouver les ordi sans employés // 
ordinateurRouter.get("/addOrdinateur",authguard,async(req,res)=>{
const employes = await prisma.employe.findMany({
    where :{
        entrepriseId : req.session.entreprise.id,
        ordinateur : null
    }   
})

    res.render ("pages/addOrdinateur.twig",{
        employes : employes,
        entreprise : req.session.entreprise

    })
})

// route pour trouver  les ordi sans employés //
ordinateurRouter.get("/addOrdinateur/:id", authguard, async (req, res) => {
    const employes = await prisma.employe.findMany({
      where: {
        entrepriseId: req.session.entreprise.id,
        ordinateur: null
      }
    })
  
    const ordinateur = await prisma.ordinateur.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
  
    res.render("pages/addOrdinateur.twig", {
      employes: employes,
      entreprise: req.session.entreprise,
      ordinateur: ordinateur // Add this
    })
  })




ordinateurRouter.post("/addOrdinateur", authguard,async (req,res)=>{
    try {
     const ordinateur = await prisma.ordinateur.create({
        data: {
            marque : req.body.marque,
            modele : req.body.modele,
            entrepriseId : req.session.entreprise.id,
            employeId : parseInt(req.body.employeList)

        }
        
     })
     res.redirect("/")

    } catch (error) {
        res.render ("pages/addOrdinateur.twig");
        console.log(error)
    }


})

//supprimer ordi // 
ordinateurRouter.get("/deleteOrdinateur/:id", authguard, async(req,res)=>{
    try {
        const deleteOrdinateur = await prisma.ordinateur.delete({
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


//route pour pré replir les champs // 
ordinateurRouter.get("/addOrdinateur/:id", authguard, async(req,res)=>{
    try {
        const IDordinateur = await prisma.ordinateur.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        })
        res.render("pages/addOrdinateur.twig", {
           ordinateur : IDordinateur }
        )
        
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})





module.exports = ordinateurRouter