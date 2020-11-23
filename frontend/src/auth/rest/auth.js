import { SERVER_URL } from '../../helpers'

export const login = async ({ email, password, remember = false }) => {
    return await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return await response.json()
    }).then(response => {
        if (response.token) {
            if (remember) {
                localStorage.setItem('user', JSON.stringify(response.user))
                localStorage.setItem('token', JSON.stringify(response.token))
            }
        }

        return response
    })
}

export const register = async ({ name, email, phone, password }) => {
    return await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    }).then(response => {
        if (response.token) {
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('token', JSON.stringify(response.token))
        }

        return response
    })
}
