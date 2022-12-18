import axios from 'axios';

const USER_API_BASE_URL = 'https://localhost:8443/api/v1/users';

class UserService {

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

}

export default new UserService();