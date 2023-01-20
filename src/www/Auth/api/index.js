

export default {
    registerUser : async (params) => {
        const formData = new FormData()
        formData.append('data', JSON.stringify(params))

        return fetch(`${global.ipServer}auth/register`, {
            method: 'POST',
            body: formData,
            headers: {

            }
        })
        .then((response) => {
            return response.json()
        })
    },
    loginUser : async (params) => {
        const formData = new FormData()
        formData.append('data', JSON.stringify(params))

        return fetch(`${global.ipServer}auth/login`, {
            method: 'POST',
            body: formData,
            headers: {

            }
        })
        .then((response) => {
            return response.json()
        })
    }


}