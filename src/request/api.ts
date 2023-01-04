import request from './request';
import qs from "qs"



export const adminLoginApi = (data: AdminLoginData):PromiseRes<LoginResult> => request.post('/admin/login', data);

export const getAdminInfo = ( ):PromiseRes<getAdminInfoRes> => request.get('/admin/info');

export const getAdminList = (data:adminListParams ):PromiseRes<getAdminListRes> => 
request.get('/admin/list',{params:data});

export const updateAdmin = (id:number,data:AdminObjItf ):PromiseRes=> request.post('/admin/update/'+id,data);
// 获取所有角色
export const getRoleListAll = (): PromiseRes<RoleObjItf[]> => request.get('/role/listAll')
// 根据用户id获取角色
export const getAdminRoleById = (id: number): PromiseRes<RoleObjItf[]> => request.get('/admin/role/' + id)

export const updateAdminRole = (data:{adminId:number,roleIds:string}): PromiseRes<RoleObjItf[]> =>
 request.post('/admin/role/update' ,null,{params:data})

// form-data
// export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseRes =>
//  request.post('/admin/role/update', qs.stringify(data))
export const getAdminStat = (): PromiseRes<IndexDataItf> => request.get('http://kumanxuan1.f3322.net:8360/admin/stat')