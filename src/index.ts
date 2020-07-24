import * as recast from 'recast' // print as PRINT
import { findProperties, find } from './util'
import {
    dataParser,
    methodsParser,
    computeParser,
    watchParser,
} from './OPTIONS'
import { source } from './example'
// import { propsParser } from './OPTIONS/propsParser'

// 需要弄一个map 收集器

const types = recast.types
const B = types.builders

export default function loader() {
    const astOrigin = recast.parse(source)
    const body = astOrigin.program.body
    const vueControler = find(body, 'ExportDefaultDeclaration')
    const properties = vueControler.declaration.properties
    const mapProperties = findProperties(properties)
    const constructorTree = {
        bodyString: [] as string[],
        setupBody: [] as any[],
        relativeStatement: new Map(),
        importStringArray: new Set() as Set<string>
    }

    dataParser(mapProperties.get('data'), constructorTree)
    methodsParser(mapProperties.get('methods'), constructorTree)
    computeParser(mapProperties.get('computed'), constructorTree)
    watchParser(mapProperties.get('watch'), constructorTree)

    // 暴力替换法，目前还不知道如何结合types的nodePath.replcase来达到更换。
    const cp = recast.parse(source)
    cp.program.body = cp.program.body.filter((v: any) => v.type !== 'ExportDefaultDeclaration')

    console.log('转换前')
    console.log(source)

    console.log('\r\n\r\n------------------> 转换后 <------------------')
    const relativeCode = [...constructorTree.relativeStatement.values()].map((v) => recast.print(v).code + '\r\n').join('')
    console.log(`import { ${[...constructorTree.importStringArray.values()].join(', ')} } from 'vue'; \r\n`
        + recast.print(cp).code + '\r\n\r\n'
        + relativeCode + '\r\n'
        + constructorTree.bodyString.join('\r\n') + '\r\n\r\n'
        + recast.print(
        B.exportDefaultDeclaration(B.objectExpression([
            {
                key: B.identifier('setup'),
                value: B.functionExpression(B.identifier(''), [], B.blockStatement(constructorTree.setupBody)),
                kind: 'init',
                type: 'ObjectProperty'
            }
            ]
        ))
    ).code)
}

loader()
