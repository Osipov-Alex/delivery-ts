import api from "../utils/axios"
import {AxiosResponse} from 'axios'
import { IUser } from "../types"

export default class AdminService {
  static getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users')
  }
}