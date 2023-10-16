const axios = require('axios');
const fs = require('fs');
const jsonObj = require('./env.json');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const randomId = require('./generateRandomId');
const userObj = require('./Users.json');

describe("Customer API integration testing", () => {

    it("User can login successfully", async () => {
        const response = await axios.post(`${jsonObj.baseUrl}/user/login`, {
            "email": "salman@roadtocareer.net",
            "password": "1234"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((res) => res.data)
        console.log(response)
        fs.writeFileSync('env.json', JSON.stringify({
            ...jsonObj, token: response.token
        }))

    })
    it("Create new user", async () => {
        const response = await axios.post(`${jsonObj.baseUrl}/user/create`, {
            "name": faker.person.fullName(),
            "email": faker.internet.email(),
            "password": "1234",
            "phone_number": `01501${randomId(100000, 999999)}`,
            "nid": "123456789",
            "role": "Customer"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY': jsonObj.secretKey
            }

        }).then((res) => res.data)
        console.log(response)
        expect(response.message).contains("User created")

        let newUserObj = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            phone_number: response.user.phone_number,
            role: response.user.role,
        }
        userObj.push(newUserObj);
        fs.writeFileSync('./Users.json', JSON.stringify(userObj));

    })
    it("Search User by id", async () => {
        const response = await axios.get(`${jsonObj.baseUrl}/user/search/id/${userObj[userObj.length-1].id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY': jsonObj.secretKey
            }

        }).then((res) => res.data)
        console.log(response)
        expect(response.message).contains("User found")
    })
})
