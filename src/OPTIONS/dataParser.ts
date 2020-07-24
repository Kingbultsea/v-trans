import { types, print as PRINT } from 'recast' // print as PRINT
import { THISKEY, expressionStatement } from '../util'
import { ConstructorTree } from '../global'

const B = types.builders

export function dataParser(dataAST: any, constructorTree: ConstructorTree) {
    if (!dataAST) {
        return
    }

    const returnArray: string[] = []

    // 转换data -> ref relative
    for (const i of dataAST.value.body.body[0].argument.properties) {
        const isLiteral: boolean = i.value.type === 'Literal'

        // 需要Import vue的函数
        if (isLiteral) {
            !constructorTree.importStringArray.has('ref') && constructorTree.importStringArray.add('ref')
        } else {
            !constructorTree.importStringArray.has('relative') && constructorTree.importStringArray.add('relative')
        }

        constructorTree.relativeStatement.set(
            i.key.name,
            expressionStatement(`${isLiteral ? 'let' : 'const'} ${THISKEY}${i.key.name}`, `${isLiteral ? 'ref' : 'relative'}(${PRINT(i.value).code})`)
        )
        returnArray.push(THISKEY + i.key.name)
    }

    // 这里需要修改 因为是return目前的watch方法其实也可以放在全局 但是一些声明周期方法就不能了..
    constructorTree.setupBody.push(
        B.returnStatement(
            B.identifier(`{ ${returnArray.join(', ')} }`)
        )
    )
}
