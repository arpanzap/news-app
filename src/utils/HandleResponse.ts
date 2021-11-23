
import { Log } from './Logger'


export const logResponse = async (res: Response) => {
    Log(`Response Status for ${res.url} code : ${res.status}`, res.clone().json())
}