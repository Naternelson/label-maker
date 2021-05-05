function addSetProperty(object, property, cb){
    Object.defineProperty(object.prototype, property, {
        set: cb || function(x){
            this[`_${property}`] = x
        }
    })
}

function addGetProperty(object, property, cb){
    Object.defineProperty(object.prototype, property, {
        get: cb || function(){
            return this[`_${property}`]
        }
    })
}

function modelProperties(object, attributes, getCB, setCB){
    for(let a of attributes){
        Object.defineProperty(object.prototype, a, {
            get: getCB || function(){
                return this[`_${a}`]
            },
            set: setCB || function(x){
                this.isSaved = false
                this[`_${a}`] = x
            }
        })
    }
}

function fromJson(response){
    return response.json()
}