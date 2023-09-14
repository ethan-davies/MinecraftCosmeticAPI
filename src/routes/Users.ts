import express, { Request, Response } from 'express'
import MojangAPI from '../utils/MojangAPI'
import Logger from '../utils/Logger'

const router = express.Router()

router.get('/cosmetics/:user', async (req: Request, res: Response) => { 
    const user = req.params.user as string

    if(user === 'testUsername') { // !! Use this for testing purposes, remove this in production. It just allows you to not have to search through the database
        try {
            return res.status(200).json({ username: user, ownedCosmetics: ['cosmeticOne', ['cosmeticTwo', 'cosmeticThree']] })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

     if(user) {
        try {
            let data = null

            if(user.length <= 16) { // Username
                data = res.status(200).json(await MojangAPI.searchByUsername(user))
            } else if(user.length === 32) { // UUID without hyphens
                data = res.status(200).json(await MojangAPI.searchByUUID(user))
            } else if(user.length === 36) { // UUID
                data = res.status(200).json(await MojangAPI.searchByUUID(user))
            } else {
                Logger.error(`ERROR WHILE SEARCHING: ${user}`)
                data = res.status(422).json({ message: 'Could not find that user.' })
            }

            if(data === null) {
                data = res.status(404).json({ message: 'User not found' })
            }

            return data

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
            Logger.error(error)
        }
     }
})

export default router
