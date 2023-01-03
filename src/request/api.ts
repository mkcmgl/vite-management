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
    menus:[],
}
interface getAdminListRes{
    list:{}[]
}
interface adminListParams{keyword:string;pageNum:number;pageSize:number}
export const adminLoginApi = (data: AdminLoginData):PromiseRes<LoginResult> => request.post('/admin/login', data);

export const getAdminInfo = ( ):PromiseRes<getAdminInfoRes> => request.get('/admin/info');

export const getAdminList = (data:adminListParams ):PromiseRes<getAdminListRes> => request.get('/admin/list',{params:data});

