import path from 'path'

export default (subPath: string): string=>{
    const apiPrefix = '/api/v1'
    const routePath = path.join(apiPrefix, subPath)
    return routePath.split('\\').join('/')
}
