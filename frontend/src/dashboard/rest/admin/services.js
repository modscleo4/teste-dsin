import { SERVER_URL, auth_header } from '../../../helpers'

export const index = async () => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/services/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const store = async ({ name, price }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/services/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ name, price }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const show = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/services/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const update = async (id, { name, price }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/services/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ name, price }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const destroy = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/services/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}
