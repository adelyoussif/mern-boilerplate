const maniObject = (user, mapFn) => {
	return Object.keys(user).reduce((result, key) => {
		result[key] = mapFn(user[key])
		return result
	}, {});
}

export const trimValues = (user) => {
	return maniObject(user, (value) => {
		return value.trim()
	});
}