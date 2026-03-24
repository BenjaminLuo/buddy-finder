const serverURL = ""

export default function GetFetch(url, params = {}) {
    return fetch(`${serverURL}/api/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(res => res.json())
}
