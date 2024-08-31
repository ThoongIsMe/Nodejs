import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async(req, res, next) => {
    try {
        const createdcolumn = await columnService.creacteNew(req.body)
        res.status(StatusCodes.CREATED).json(createdcolumn)
    } catch (error) { next(error) }
}
export const columnController = {
    createNew
}