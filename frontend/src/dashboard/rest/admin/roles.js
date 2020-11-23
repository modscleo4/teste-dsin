import { SERVER_URL, auth_header } from '../../../helpers'

export const index = async () => {
    const { Authorization } = auth_header()
    return await fetch(`${SERVER_URL}/admin/roles/`, {
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
