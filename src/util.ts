import { types } from 'recast' // print as PRINT
import { namedTypes } from 'ast-types'
const B = types.builders

// 寻找data
export function findProperties(ast: Array<any>): Map<string, any> {
    const map = new Map()
    ast.forEach((v) => {
        map.set(v.key.name, v)
    })
    return map
}
// 寻找单独的properties
export function find(ast: Array<any>, key: string): any {
    return ast.filter((value: any) => value.type === key)[0]
}

// 寻找对象
export function findObject(ast: Array<any>, key: string): any {
    return ast.filter((value: any) => value.key.name === key)[0]
}

export const THISKEY = 'wjh_'
export const METHODSKEY = THISKEY + 'METHODS'

export function expressionStatement(iA: string, iB: string): namedTypes.ExpressionStatement {
    return B.expressionStatement(
        B.assignmentExpression('=', B.identifier(iA),
            B.identifier(
                iB// 字符转换可以改进
            )
        )
    )
}
