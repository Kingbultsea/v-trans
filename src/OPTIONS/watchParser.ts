import { types, print as PRINT } from 'recast'
import { ConstructorTree } from '../global'
import { findObject, THISKEY } from '../util'

const B = types.builders

export function watchParser(dataAST: any, constructorTree: ConstructorTree) {
    let add: boolean = false

    for (const i of dataAST.value.properties) {
        add = true
        const params = [
            B.identifier(THISKEY + i.key.name)
        ]
        if (i.value.type === 'ObjectExpression') {
            objParser(params, i)
        }

        if (i.value.type.includes('Function')){
            params.push(
                i.value
            )
        }

        if (i.value.type === 'ArrayExpression') {
            // 需要做一次递归处理 需要渲染成平级的对象 对象名称要一致 如果按照语法无法一致的话.. 先尝试
            // 这个后续需要补充，先实现其他功能
            break
        }

        constructorTree.bodyString.push(
            PRINT(
                B.callExpression(B.identifier('watch'), params)
            ).code
        )
    }

    add && constructorTree.importStringArray.add('watch')
}

function objParser(params: Array<any>, i: any) {
    const handler = findObject(i.value.properties, 'handler')
    const deep = findObject(i.value.properties, 'deep')
    const immediate = findObject(i.value.properties, 'immediate')
    const options = []
    deep && options.push(
        {
            key: B.identifier('deep'),
            value: deep.value,
            kind: 'init',
            type: 'ObjectProperty'
        }
    )
    immediate && options.push(
        {
            key: B.identifier('immediate'),
            value: immediate.value,
            kind: 'init',
            type: 'ObjectProperty'
        }
    )

    handler && params.push(handler.value)
    options.length > 0 && params.push(
        // @ts-ignore
        B.objectExpression(options)
    )
}


/*
* watch<>(
* source, cb(), options? )
* source 可以直接是Key key也可能带.的  但是没有什么所谓 直接输出就可以
* options需要做一个判断
* */
