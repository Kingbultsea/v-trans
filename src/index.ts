import * as recast from 'recast' // print as PRINT
import { findProperties, find, COMPONENT_NAME } from './util'
import {
    dataParser,
    methodsParser,
    computeParser,
    watchParser,
    propsParser
} from './OPTIONS'
import { source } from './example'

const types = recast.types
const B = types.builders

export default function loader(source: string) {
    const astOrigin = recast.parse(source)
    const body = astOrigin.program.body
    const vueControler = find(body, 'ExportDefaultDeclaration')
    const properties = vueControler.declaration.properties
    const mapProperties = findProperties(properties)
    const constructorTree = {
        propsStatment: null as any,
        bodyString: [] as string[],
        setupBody: [] as any[],
        relativeStatement: new Map(),
        importStringArray: new Set(['defineComponent']) as Set<string>
    }

    // options
    dataParser(mapProperties.get('data'), constructorTree)
    methodsParser(mapProperties.get('methods'), constructorTree)
    computeParser(mapProperties.get('computed'), constructorTree)
    watchParser(mapProperties.get('watch'), constructorTree)
    propsParser(mapProperties.get('props'), constructorTree)

    // defineComponent的参数数组
    const defineComponentProperty = [
        {
            key: B.identifier('setup'),
            value: B.functionExpression(B.identifier(''), [], B.blockStatement(constructorTree.setupBody)),
            kind: 'init',
            type: 'ObjectProperty'
        },
        {
            key: B.identifier('created'),
            value: B.arrowFunctionExpression([], B.identifier('COMPONENT = this')),
            kind: 'init',
            type: 'ObjectProperty'
        }
    ] as any
    if (constructorTree.propsStatment) {
        defineComponentProperty.push(constructorTree.propsStatment)
    }

    // 暴力替换法，目前还不知道如何结合types的nodePath.replcase来达到更换。
    const cp = recast.parse(source)
    cp.program.body = cp.program.body.filter((v: any) => v.type !== 'ExportDefaultDeclaration')

    const relativeCode = [...constructorTree.relativeStatement.values()].map((v) => recast.print(v).code + '\r\n').join('')
    const outPut = `import { ${[...constructorTree.importStringArray.values()].join(', ')} } from 'vue'; \r\n`
        + recast.print(cp).code + '\r\n\r\n'
        + `let ${COMPONENT_NAME}` + '\r\n\r\n'
        + relativeCode + '\r\n'
        + constructorTree.bodyString.join('\r\n') + '\r\n\r\n'
        + recast.print(
            B.exportDefaultDeclaration(
                B.callExpression(B.identifier('defineComponent'), [B.objectExpression(
                    defineComponentProperty
                )])
            )
        ).code

    console.log('转换前')
    console.log(source)

    console.log('\r\n\r\n------------------> 转换后 <------------------')
    console.log(outPut)
}

loader(source)
