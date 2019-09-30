import axios from "axios"

const instance = axios.create({
    baseURL: "https://burger-builder-tsx.firebaseio.com/"
})

export default instance;