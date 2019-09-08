// import axios from '@/config/httpConfig'
import { post, get } from '../assets/global/js/axios'

export function fetchPermission() {
    return get('/static/permission.json')
} 

export function login() {
    return get('/static/login.json')
}

