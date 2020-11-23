import { SERVER_URL, auth_header } from '../../../helpers'

export const index = async ({ role } = { role: null }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/users/${role ? `?role=${role}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization,
        },
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const store = async ({ name, email, password, role_id, active }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ name, email, password, role_id, active }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const show = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/users/${id}/`, {
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

export const update = async (id, { name, email, role_id, active }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/users/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ name, email, role_id, active }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const destroy = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/users/${id}/`, {
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
