
import { FormLogin, FormSignup } from '../models/auth.models';
import { axiosInstance } from '../utils/customAxios';

export class AuthService {
  static instance: AuthService | null = null;

  static create() {
    if (AuthService.instance === null) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(params: FormLogin) {
    const queryGQL = {
      query: `
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
      variables: {
        email: params.email,
        password: params.password,
      },
    };
    const res = await axiosInstance('apiDomain').post('/graphql', queryGQL);
    const { errors, data } = res.data;

    if (errors) throw new Error(errors[0].message);
    return data.login;
  }

  async signup(params: FormSignup) {
    const queryGQL = {
      query: `
      mutation CreateUser($dto: AddUserDto!) {
        createUser(dto: $dto) {
          username
          email
          active
          createAt
        }
      }
    `,
      variables: {
        dto: {
          email: params.email,
          password: params.password,
          rPassword: params.rPassword,
        },
      },
    };
    const res = await axiosInstance('apiDomain').post('/graphql', queryGQL);
    const { errors, data } = res.data;

    if (errors) throw new Error(errors[0].message);

    return data.createUser;
  }
}
