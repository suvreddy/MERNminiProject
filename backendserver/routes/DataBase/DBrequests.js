async function getUser(params, collection) {
    let user
    try {
        let res = await collection.findOne(params)
        if (res) {
            user = JSON.parse(JSON.stringify(res))
        }
    } catch (error) {
        console.log(error)
    }
    return user
}

async function postData(params, collection) {
    let status = {
        status: false,
        data: null,
        message: ''
    }
    try {
        let res = await collection.insertOne(params)
        status.status = true
        status.data = res
    } catch (error) {
        status.message = error

    }
    return status
}

module.exports = {
    getUser,
    postData
}