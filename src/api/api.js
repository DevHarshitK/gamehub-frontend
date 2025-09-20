import axios from "axios";


const API = "http://localhost:7776"


const getGames = () => axios.get(`${API}/games/all`)
const addGames = (game) => axios.post(`${API}/game`,game)
const deleteGames = (id) => axios.delete(`${API}/game/delete/${id}`)
const getMembers = () => axios.get(`${API}/members/all`)
const addMember = (member) => axios.post(`${API}/member`,member)

export { getGames, addGames, deleteGames, getMembers, addMember }