

const api = {
    getDetailsDiary : async (params) => {
        const formData = new FormData()
        formData.append('data', JSON.stringify(params))

        return fetch(`${global.ipServer}diary/getDetail`, {
            method: "POST",
            body: formData,
            headers: {

            }
        }).then((response) => {
            return response.json()
        })
    },
    getTitle: async () => {
        return fetch(`${global.ipServer}diary/getTitle`, {
            method: "POST",
            headers: {

            }
        }).then((response) => {
            return response.json()
        })
    },
    updateDiary: async (params) => {
        const formData = new FormData()
        formData.append('data', JSON.stringify(params))

        return fetch(`${global.ipServer}diary/updateDiary`, {
            method: "POST",
            body: formData,
            headers: {

            }
        }).then((response) => {
            return response.json()
        })
    },
    createDiary: async () => {
        // const formData = new FormData()
        // formData.append('data', JSON.stringify(params))

        return fetch(`${global.ipServer}diary/new`, {
            method: "POST",
            // body: formData,
            headers: {

            }
        }).then((response) => {
            return response.json()
        })
    }
}

export default api;