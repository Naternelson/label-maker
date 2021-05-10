// class FormBuilder{
//     constructor(parent){
//         this.parent = parent
//         this.form = createEl("form", null, parent)
//         this.elements = []
//         this.formSubmissionHandler = new FormSubmissionHandler(this.form)
//     }
//     createInput(type, name, attributes){
//         const inputWrapper = createEl("div", {class: "input-wrapper" })
//         const label = createEl("label", {for: name}, inputWrapper)
//         label.innerText = toTitleCase(name)
//         const input = createEl("input", {type, name, ...attributes}, inputWrapper)
//         this.elements.push(inputWrapper)
//         return this
//     }
//     createBtn(parent = this.form, text, attributes){
//         const btn = createEl("button", {...attributes}, parent)
//         btn.innerText = text
//         this.elements.push(btn)
//         return btn
//     }

//     createTitle(text, append=true){
//         const title = createEl("div", {class: "form-title"})
//         title.innerText = toTitleCase(text)
//         append ? this.elements.unshift(title) : this.elements.push(title)
//         return this
//     }
//     customElement(el){
//         this.elements.push(el)
//         return this
//     }

//     display(index, appendTo = this.form){
//         this.form.innerHTML = ""
//         if(index) appendTo.append(this.elements[index])
//         if(!index){for(let el of this.elements) appendTo.append(el)}
//     }
// }



// class FormSubmissionHandler{
//     constructor(form){
//         this.form = form
//         this.form.addEventListener("submit", ()=>this.submit())
//         this.model
//     }
//     get inputs(){
//         return this.form.querySelectorAll("input")
//     }
//     submit()

// }

// function createProductForm(){
//     const main = document.querySelector("main")
//     const formWrapper = createEl("div", {class: "form-wrapper"}, main)
//     const productForm = createEl("form", null, formWrapper)
//     const nameLabel = createEl("label", {for: "name"}, productForm)
//     nameLabel.innerText = "Name"
//     const nameInput = createEl("input", {type: "text", name: "name"}, productForm)
//     const descriptionLabel = createEl("label", {for: "description"}, productForm)
//     descriptionLabel.innerText = "Description"
//     const descriptionInput = createEl("input", {type: "text", name: "description"}, productForm)
//     const addNewParamBtn = createEl("button", {class: "btn btn-flat"}, productForm)
//     addNewParamBtn.innerText = "Add Item Parameters"
//     addNewParamsBtn.addEventListener("click", ()=>nestForm(productForm, "ItemCodeParameter"))
//     const submitBtn = createEl("button", {class: "btn"}, productForm)
//     submitBtn.innerText = "Submit"
//     submitBtn.addEventListener("click", (e)=>{newProductHandler(e)})
// }

class FormBuilder{
    constructor(parent){
        this.parent = parent
        this.form = createEl("form", null, this.parent)
        this.included = []
        this.form.addEventListener("submit", (e)=>{e.preventDefault(); this.onSubmit()})
    }
    createMainModel(str){
        // 
        const construct = constructClass(str)
        this.model = {type: str, instance: new construct({}), attributes: []}
    }
    nestModel(modelProperty, str){
        const construct = constructClass(str)
        const nestedModel = {modelProperty, type: str, instance: new construct({}), attributes: []}
        // this.model.instance.push(nestedModel.instance)
        this.included.push(nestedModel)
        return nestedModel
    }
    createInput(attributes, parent = this.form){
        const inputWrapper = createEl("div", {class: "input-wrapper" }, parent)
        const label = createEl("label", {for: attributes.name}, inputWrapper)
        label.innerText = toTitleCase(attributes.name)
        const input = createEl("input", {...attributes}, inputWrapper)
        return input
    }
    
    mapInput(property, inputAttr, model = this.model, parent){
        const input = this.createInput(inputAttr, parent)
        model.attributes.push({property, input})
    }
    populateModels(){
        
        this.populateProperties(this.model)
        for(let i of this.included) {
            debugger
            if(!this.model.instance[i.modelProperty] ) this.model.instance[i.modelProperty] = []
            // const foo = this.model.instance[i.modelProperty]
            this.model.instance[i.modelProperty].push(i.instance)
            this.populateProperties(i)}
    }
    populateProperties(model){
        
        for(let a of model.attributes){
            model.instance[a.property] = a.input.value
        }
    }
    async onSubmit(action = "post", cb = ()=>{}){
        debugger
        this.populateModels()
        //addLoader(this.parent)
        const toInclude = this.included.map(i=>i.modelProperty)
        const res = await this.model.instance[action](null, toInclude)
        alert("Successful " + action)
        console.log(res)
        this.afterSubmission(this.model.instance)
    }
    afterSubmission(){}
}

