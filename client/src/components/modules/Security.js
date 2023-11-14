class Security {
    static async HashPassword(password) {
        let response_hash = await fetch("http://localhost:4000/api/security/generate", {
			method: "POST",
			body: JSON.stringify({
				msg: password
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
        const data_hash = await response_hash.json()
        return data_hash.sec
    }
}

export default Security