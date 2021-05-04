class Model{
    constructor({attributes, id, relationships}){
        this.isSaved = true
        this.id = id 
        this.setAttributes(attributes)
        
        for(let a in attributes){
            this[a] = attributes[a]
        }
    }
    static rootAddress = "http://localhost:3000/"
    static backendResource = ""
    static instances = []
    static retrieveIndex(){
        return new Promise((res, rej)=>{
            fetch(this.rootAddress + this.backendResource).then(res=>res.json()).then((obj)=>{
                const collection = obj.data
                this.instances = []
                console.log("In retrieve Index Promise", this)
                for(let c of collection){this.instances.push(new this(c))}
                return this.instances
            }).then(instances=>res(instances)).catch(mes=> rej(mes))
        })
    }
    setAttributes(attributes){
        // console.log("Attributes",this, attributes)
        // debugger
        for(let a in attributes){
            Object.defineProperty(this.__proto__, a, {
                set: function(x){
                    this.isSaved = false
                    this[`_${a}`] = x
                },
                get: function(){
                    return this[`_${a}`]
                }
            })
        }
    }
    static patchInstance(instance){
        const id = instance.id 
        if(!id) return
        options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(instance)
        }
        fetch(this.rootAddress + this.backendResource + id, options).then(()=> instance.isSaved = true ).catch((error)=>console.error(error))
    }
    static deleteInstance(instance){
        const id = instance.id 
        if(!id) return
        options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(instance)
        }
        fetch(this.rootAddress + this.backendResource + id, options).then(()=> instance.remove()  ).catch((error)=>console.error(error))
    }
    static postInstance(instance){
        const id = instance.id 
        if(id) return
        options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(instance)
        }
        fetch(this.rootAddress + this.backendResource, options).then((res)=> {
            instance.id = res.id
        }).catch((error)=>console.error(error))
    }
}