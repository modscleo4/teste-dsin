import { SERVER_URL, auth_header } from '../../../helpers'

export const index = async () => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/client/schedules/`, {
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

export const store = async ({ date, note, services }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/client/schedules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ date, note, services }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const show = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/client/schedules/${id}/`, {
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

export const update = async (id, { date, note, services }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/client/schedules/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ date, note, services }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const destroy = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/client/schedules/${id}/`, {
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
