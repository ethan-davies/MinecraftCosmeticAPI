import express, { Request, Response } from 'express'
import Logger from '../utils/Logger'

const router = express.Router()

router.get('/user/:user', async (req: Request, res: Response) => {
    const user = req.params.user as string

    if(user === 'testUsername') { // Obviously, implement your own code here to find the user and get the ownedCosmetics from a database.
        try {
            res.status(200).json({ username: user, uuid: 'testUUID', ownedCosmetics: ['cosmeticOne', ['cosmeticTwo', 'cosmeticThree']] })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
            Logger.error(error)
        }
    }
})

export default router
