import request from './request';

interface AdminLoginData {
    username: string;
    password: string;
}
interface ManageResult<T={}>{
    code:number
    data:T
}
type PromiseRes<T>=Promise<ManageResult<T>>

interface LoginResult{

   token:string
tokenHead:string
}
interface getAdminInfoRes{
    icon:string,
    menus:[],
    roles:[],
    username:string,

}
export const adminLoginApi = (data: AdminLoginData):PromiseRes<LoginResult> => request.post('/admin/login', data);

export const getAdminInfo = ( ):PromiseRes<getAdminInfoRes> => request.get('/admin/info');

