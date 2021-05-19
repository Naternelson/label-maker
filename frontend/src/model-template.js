class Model {
    //
    // MODEL INSTANCE METHODS AND PROPERTIES
    //
    constructor({attributes, id, relationships}){
        
        this.id = id
        if(attributes){for(let a in attributes){this[a] = attributes[a]}}
        this.relate(relationships)
        this.isSaved = !!this.id
    }

    relate(relationships){
        
        const c = this.constructor
        for(let r in relationships){
            
            if(Array.isArray(relationships[r].data)){
                this[toLowerCamel(r)] =  relationships[r].data.map(row=> c.findOrCreateById(row.type, row.id))
            } else {
                const type = relationships[r].data.type
                const id = relationships[r].data.id
                this[toLowerCamel(r)] = c.findOrCreateById(type, id)
            }
        }
    }

    async update(){ 
        //Re-pulls the data from this instance and updates the infromation from the server
        const returnObj = await this.constructor.retrieve(this.id)
        return this
    }
    async post(attributes, include ){ 
        //Sends a POST request to the server
        const c = this.constructor
        const url = c.root + c.resource
        
        const options = {
            method: 'POST',
            headers: {...c.headers},
            body: JSON.stringify(packageBody(this, include))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        
        c.buildRelationships(obj)
        
        return c.addInstance(obj.data)
    }
    async save(attributes, include){ 
        //Sends a PATCH request to the server
        if (!this.id) return 
        const c = this.constructor
        const url = c.root + c.resource + this.id
        const options = {
            method: 'PATCH',
            headers: {...c.headers},
            body: JSON.stringify(packageBody(this, include))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        c.buildRelationships(obj)
        return c.addInstance(obj.data)
    }
    async destroy(){ 
        //Deletes a data object from the server by sending the DELETE request. 
        if (!this.id) return 
        const c = this.constructor
        let url = c.root + c.resource + this.id
        const options = {
            method: 'DELETE',
            headers: {...c.headers},
            body: JSON.stringify(packageBody(this))
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        c.removeInstance(this)
        return obj
    }
    //
    // STATIC MODEL METHODS AND PROPERTIES
    //
    static root = "http://localhost:3000/"
    static resource = ""
    static headers =  { 'Content-Type': 'application/json'}
    static instances = []

    static async retrieve(id){ 
        //Retrieves one or all data from the server with a GET Request
        let url = this.root + this.resource
        if(id) url += `${id}/`
        const response = await fetch(url)
        const obj = await fromJson(response)
        this.buildRelationships(obj)
        if(Array.isArray(obj.data)){ //The return object.data is an attributes array if multiple records are sent back; a single object otherwise
            for(let row of obj.data){this.addInstance(row)}
        } else {
            this.addInstance(obj.data)
        }
        return this.instances
    }
    static buildRelationships(obj){
        for(let r of obj.included){constructClass(r.type).addInstance(r)}
    }
    static findOrCreateById(className, id){
        return constructClass(className).addInstance({id})
    }
    static addInstance(data){ 
        //Creates or updates a JS Object from its corresponding server object. 
        
        let ins = this.instances.find(instance=>instance.id == data.id)
        if(ins){ for(let a in data.attributes) { ins[a] = data.attributes[a] } ins.relate(data.relationships); ins.isSaved = true} 
        //If We already have an instance of this object, update its attributes
        if(!ins){ins = new this(data); this.instances.push(ins)} 
        //If not create a new object instance
        return ins
    }
    static removeInstance(i){
        const arr = this.instances
        const index = arr.indexOf(i)
        this.instances.splice(index,1)
    }
}
