const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


const authguard = async (req, res, next) => {
    try {
        if (req.session.entreprise) {
            let entreprise = await prisma.entreprise.findUnique({
                where: {
                    mail: req.session.entreprise.mail
                }
            });
            if (entreprise) return next()

                
            throw { authgard: "Entreprise non connecté" }
        }
        throw { authgard: "Entreprise non connecté" }

    } catch (error) {
        res.redirect("/login") 
    }


}

module.exports = authguard 