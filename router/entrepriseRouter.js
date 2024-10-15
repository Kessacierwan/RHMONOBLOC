const entrepriseRouter = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const hashPasswordExtension = require("../services/extensions/hashPasswordExtension")
const bcrypt = require("bcrypt")
const authguard = require("../services/authguard")
// const authguard = require("")
const prisma = new PrismaClient().$extends(hashPasswordExtension)

// REGISTER // 
// récupérer la page register //
entrepriseRouter.get("/register", (req, res) => {
    res.render("pages/register.twig")
})

// envoyer les données du formulaire (inscription dans la DB) // 
entrepriseRouter.post("/register", async (req, res) => {
    try {
        if (req.body.password === req.body.confirm_password) {
            const entreprise = await prisma.entreprise.create({
                data: {
                    name: req.body.name,
                    siret: req.body.siret,
                    mail: req.body.mail,
                    director: req.body.director,
                    password: req.body.password
                }
            })
            res.redirect("/login")
        }
        else {
            throw ({ confirm_password: "Vos mots de passe ne correspondent pas" })
        }
    }

    catch (error) {
        console.log(error)
        res.render("pages/register.twig", { error: error, title: "Inscription" })
    }
})

// déconnexion // 
entrepriseRouter.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})



entrepriseRouter.get("/", authguard, async (req, res) => {
    try {
        const employes = await prisma.employe.findMany({
            where: {
                entrepriseId: parseInt(req.session.entreprise.id)
            }
        });
        const ordinateurs = await prisma.ordinateur.findMany({
            where: {
                entrepriseId: parseInt(req.session.entreprise.id)
            }
        });

        const tasks = await prisma.task.findMany({
            where: {
                employeId: { in: employes.map(e => e.id) }
            }
        });

        const validTasks = await prisma.task.findMany({
            where: {
                employeId: { in: employes.map(e => e.id) },
                isValid : true
            }
        });

        const taskCount = tasks.length;
        const validCount = validTasks.length



         progress = (validCount/taskCount)*100



        res.render("pages/dashboard.twig", {
            entreprise: req.session.entreprise,
            employes: employes,
            ordinateurs: ordinateurs,
            tasks: tasks,
            progress : progress
        });
    } catch (error) {
        console.log(error)
    }
});






// LOGIN // 
// récupérer la page de connexion // 
entrepriseRouter.get("/login", (req, res) => {
    res.render("pages/login.twig")
})


// envoyer les donné de connexion // 
entrepriseRouter.post("/login", async (req, res) => {
    try {
        const entreprise = await prisma.entreprise.findUnique({
            where: { mail: req.body.mail }

        })
        if (entreprise) {

            if (await bcrypt.compare(req.body.password, entreprise.password)) {
                req.session.entreprise = entreprise
                res.redirect('/')
            }
            else {
                throw { password: "Connexion échouée : Mot de passe incorrect" }
            }
        }
        else {
            throw {
                mail: "Connexion échouée : Adresse mail inexistante"
            }

        }
    } catch (error) {
        res.render("pages/login.twig", {
            error
        })
    }
})










module.exports = entrepriseRouter