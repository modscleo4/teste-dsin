import { SERVER_URL, auth_header } from '../../../helpers'

export const index = async () => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/schedules/`, {
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

export const store = async ({ user_id, date, note, services }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/schedules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ user_id, date, note, services }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const show = async (id) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/schedules/${id}/`, {
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
    return await fetch(`${SERVER_URL}/admin/schedules/${id}/`, {
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
    return await fetch(`${SERVER_URL}/admin/schedules/${id}/`, {
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

export const status = async (id, { status }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/schedules/${id}/status/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ status }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}

export const serviceStatus = async (id, service_id, { status }) => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/schedules/${id}/services/${service_id}/status/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization
        },
        body: JSON.stringify({ status }),
    }).then(async response => {
        if (response.status !== 200) {
            throw new Error(JSON.stringify(await response.json()))
        }

        return response.json()
    })
}
