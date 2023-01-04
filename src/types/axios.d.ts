interface AdminLoginData {
    username: string;
    password: string;
}
interface ManageResult<T={}>{
    code?:number
    errno?:number
    data:T
}
type PromiseRes<T = {}> = Promise<ManageResult<T>>

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