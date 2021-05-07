class Model {
    constructor({attributes, id, relationships}){
        this.id = id 
        for(let a in attributes){
            this[a] = attributes[a]
        }
        this.isSaved = true
    }
    async update(){ //Re-pulls the data from this instance and updates the infromation from the server
        const returnObj = await this.constructor.retrieve(this.id)
        return returnObj
    }
    async post(arr){ //Sends a POST request to the server
        const c = this.constructor
        const url = c.root + c.resource
        if(id) url += `${id}/`
        const options = {
            method: 'POST',
            headers: {...c.headers},
            body: JSON.stringify(c.createBody(this,arr))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        return obj.data.map(obj=> new this(obj))
    }
    async save(arr){ //Sends a PATCH request to the server
        if (!this.id) return 
        const c = this.constructor
        const url = c.root + c.resource + this.id
        const options = {
            method: 'PATCH',
            headers: {...c.headers},
            body: JSON.stringify(c.createBody(this, arr))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        this.isSaved = true
        return obj
    }
    async destroy(){ //Deletes a data object from the server by sending the DELETE request. 
        if (!this.id) return 
        const c = this.constructor
        const url = c.root + c.resource + this.id
        if(id) url += `${id}/`
        const options = {
            method: 'DELETE',
            headers: {...c.headers},
            body: JSON.stringify(c.createBody(this))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        return obj
    }
    static createBody(obj, arr){ //Object is a JS Model Instance, and arr is an array of attributes to send. If blank, all attributes are sent
        const body = {}
        if(obj.id) body.id = obj.id
        if(arr){for(let a of arr){body[a] = obj[`_${a}`]}}
        if(!arr){for(let p in obj){if(p.charAt(0)=="_"){body[p.slice(1)] = obj[p]}}}
        return JSON.stringify(body) 
    }
    static root = "http://localhost:3000/"
    static resource = ""
    static headers =  { 'Content-Type': 'application/json'}
    static instances = []
    static async retrieve(id){ //Retrieves one or all data from the server with a GET Request
        let url = this.root + this.resource
        if(id) url += `${id}/`
        const response = await fetch(url)
        const obj = await fromJson(response)
        if(Array.isArray(obj.data)){ //The return object.data is an array if multiple records are sent back, a single object otherwise
            for(let row of obj.data){this.addInstance(row)}
        } else {
            this.addInstance(obj.data)
        }
        return this.instances
    }
    static addInstance(data){ //Creates or updates a JS Object from its corresponding server object. 
        const ins = this.instances.find(instance=>instance.id == data.id)
        debugger
        if(ins){ for(let a in data.attributes) { ins[a] = data.attributes[a] } ins.isSaved = true} //If We already have an instance of this object, update its attributes
        if(!ins){this.instances.push(new this(data))} //If not create a new object instance
    }

    static removeInstance(i){
        const index = this.instances.findIndexOf(instance=>instance == i)
        this.instances.splice(index,1)
    }
}
