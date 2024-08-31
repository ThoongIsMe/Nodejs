import axios from 'axios'
import { API_ROOT } from '~/config/environment'


export const fetchBoardDetailsAPI = async(boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/example/${boardId}`)
    return response.data
}


export const creatNewColumnAPI = async(newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns/`, newColumnData)
    return response.data
}


export const creatNewCardAPI = async(newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns/`, newCardData)
    return response.data
}