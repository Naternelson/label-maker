// createBody(obj, attributes, include=[]){ 
//     //Object is a JS Model Instance, and attributes is an array of attributes to send. If blank, all attributes are sent. 
//     //Server Attributes are identified with a '_' in front. 
//     //Include is reserved for relationship models to include
//     const body = {}
//     if(obj.id) body.id = obj.id
//     if(attributes){for(let a of attributes){body[a] = obj[`_${a}`]}}
//     if(!attributes){for(let p in obj){if(p.charAt(0)=="_"){body[toSnakeCase(p.slice(1))] = obj[p]}}}
//     for(let model of include){
//         body[toSnakeCase(model)] = obj[model].map(instance=>this.createBody(instance)) 
//     }
//     console.log(body)
//     return body 
// }

function packageBody(model, include=[]){
    debugger
    const body = {}
    const modelName = toSnakeCase(model.constructor.name)
    body[modelName] = {}
    for(let attribute in model){
        if(attribute.charAt(0) == "_"){
            const attrName = toSnakeCase(attribute.slice(1))
            body[modelName][attrName] = model[attribute]
        }
    }
    console.log(body)
    debugger
    for(let x of include){
        const relatedModel = model[x]
        // const name = toSnakeCase(model[x][])
        body[modelName][toSnakeCase(x) + "_attributes"] = relatedModel.map(instance=>{
            const instanceAttributes = {}
            for(let y in instance){
                if(y.charAt(0) == "_"){
                    const attrName = toSnakeCase(y.slice(1))
                    instanceAttributes[attrName] = instance[y]
                }
            }
            return instanceAttributes
        })
    } 
    console.log(body)
    debugger
    return body
}