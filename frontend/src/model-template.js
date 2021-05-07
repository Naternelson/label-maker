class Model {
    constructor({attributes, id, relationships}){
        this.id = id 
        for(let a in attributes){
            this[a] = attributes[a]
        }
        this.isSaved = true
    }
    async update(){
        const returnObj = await this.constructor.retrieve(this.id)
        
        return returnObj
    }
    async post(){
        const c = this.constructor
        const url = c.root + c.resource
        if(id) url += `${id}/`
        const options = {
            method: 'POST',
            headers: {...c.headers},
            body: JSON.stringify(this)
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        return obj.data.map(obj=> new this(obj))
    }
    async patch(){
        if (!this.id) return 
        const c = this.constructor
        const url = c.root + c.resource + this.id
        const options = {
            method: 'PATCH',
            headers: {...c.headers},
            body: JSON.stringify(this)
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        this.isSaved = true
        return obj
    }
    async destroy(){
        if (!this.id) return 
        const c = this.constructor
        const url = c.root + c.resource + this.id
        if(id) url += `${id}/`
        const options = {
            method: 'DELETE',
            headers: {...c.headers},
            body: JSON.stringify(this)
        }
        const response = await fetch(url, options)
        const obj = await fromJson(response)
        return obj
    }
    static root = "http://localhost:3000/"
    static resource = ""
    static headers =  { 'Content-Type': 'application/json'}
    static instances = []
    static async retrieve(id){
        
        let url = this.root + this.resource
        if(id) url += `${id}/`
        const response = await fetch(url)
        const obj = await fromJson(response)
        if(Array.isArray(obj.data)){
            
            for(let row of obj.data){
                
                // const ins = this.instances.find(instance=>instance.id == row.id)
                // if(ins){for(let a of row.attributes){ins[a] = row.attributes[a];ins.isSaved = true}}
                // if(!ins){this.instances.push(new this(o))}
                this.addInstance(row)
            }
        } else {
            
            // const ins = this.instances.find(instance=>instance.id == obj.data.id)
            // if(ins){for(let a of row.attributes){ins[a] = row.attributes[a];ins.isSaved = true}}
            // if(!ins){this.instances.push(new this(o))}
            this.addInstance(obj.data)
        }
        console.log(this.instances)
        return this.instances
        // return Array.isArray(obj.data) ? obj.data.map(o=> new this(o)) : new this(obj.data)
    }
    static addInstance(data){
        const ins = this.instances.find(instance=>instance.id == data.id)
        if(ins){for(let a of data.attributes){ins[a] = data.attributes[a]; ins.isSaved = true}}
        if(!ins){this.instances.push(new this(data))}
    }

    static removeInstance(i){
        const index = this.instances.findIndexOf(instance=>instance == i)
        this.instances.splice(index,1)
    }
}
