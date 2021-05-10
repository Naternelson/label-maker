function packageBody(model, include=[]){
    const body = {}
    const modelName = toSnakeCase(model.constructor.name)
    body[modelName] = {}
    for(let attribute in model){
        if(attribute.charAt(0) == "_"){
            const attrName = toSnakeCase(attribute.slice(1))
            body[modelName][attrName] = model[attribute]
        }
    }
    if(model.id) body[modelName].id = model.id
    for(let x of include){
        const relatedModel = model[x]
        body[modelName][toSnakeCase(x) + "_attributes"] = relatedModel.map(instance=>{
            const instanceAttributes = {}
            if(instance.id) instanceAttributes.id = instance.id
            for(let y in instance){
                if(y.charAt(0) == "_"){
                    const attrName = toSnakeCase(y.slice(1))
                    instanceAttributes[attrName] = instance[y]
                }
            }
            return instanceAttributes
        })
        if(body[modelName][toSnakeCase(x) + "_attributes"].length == 1 && body[modelName][toSnakeCase(x) + "_attributes"][0].id){
            body[modelName][toSnakeCase(x) + "_id"] = body[modelName][toSnakeCase(x) + "_attributes"][0].id
        }
    } 
    return body
}