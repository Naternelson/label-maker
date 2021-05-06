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
        debugger
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
        // debugger
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
        return Array.isArray(obj.data) ? obj.data.map(o=> new this(o)) : new this(obj.data)
    }
}
