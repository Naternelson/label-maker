// class Model{
//     constructor({attributes, id, relationships}){
//         this.id = id 
//         for(let a in attributes){
//             this[a] = attributes[a]
//         }
//         this.isSaved = true
//     }
//     save(){
//         debugger
//         if (this.id) return this.patchInstance(this)
//         this.__proto__.postInstance(this)
//     }
//     delete(){
//         this.__proto__.deleteInstance(this)
//     }

//     static rootAddress = "http://localhost:3000/"
//     static backendResource = ""
//     static instances = []
//     static retrieveIndex(instance){
//         let url = this.rootAddress + this.backendResource
//         if(instance) url += `${instance.id}/`
//         return new Promise((res, rej)=>{
//             debugger
//             fetch(url).then(res=>res.json()).then((obj)=>{
//                 const collection = obj.data
//                 this.instances = []
//                 for(let c of collection){
//                     this.instances.push(new this(c))
//                 }
//                 return this.instances
//             }).then(instances=>res(instances)).catch(mes=> rej(mes))
//         })
//     }
//     patchInstance(instance){
//         debugger
//         const id = instance.id 
//         if(!id) return
//         const options = {
//             method: 'PATCH',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify(instance)
//         }
//         fetch(this.rootAddress + this.backendResource + id, options).then(()=> instance.isSaved = true ).catch((error)=>console.error(error))
//     }
//     deleteInstance(instance){
//         const id = instance.id 
//         if(!id) return
//         const options = {
//             method: 'DELETE',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify(instance)
//         }
//         fetch(this.rootAddress + this.backendResource + id, options).then(()=> instance.remove()  ).catch((error)=>console.error(error))
//     }
//     postInstance(instance){
//         const id = instance.id 
//         if(id) return
//         const options = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify(instance)
//         }
//         fetch(this.rootAddress + this.backendResource, options).then((res)=> {
//             instance.id = res.id
//         }).catch((error)=>console.error(error))
//     }
// }



class Model {
    constructor({attributes, id, relationships}){
        this.id = id 
        for(let a in attributes){
            this[a] = attributes[a]
        }
    }
    async update(){
        const returnObj = await this.constructor.retrieve(this.id)
        return returbObj
    }
    async post(){
        const c = this.constructor
        const url = c.root + c.resource
        if(id) url += `${id}/`
        options = {
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
        if(id) url += `${id}/`
        options = {
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
        options = {
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
    static async retrieve(id){

        let url = this.root + this.resource
        if(id) url += `${id}/`
        const response = await fetch(url)
        const obj = await fromJson(response)
        return obj.data.map(obj=> new this(obj))
    }
}
