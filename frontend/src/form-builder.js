class FormBuilder{
    constructor(parent){
        this.parent = parent
        this.form = createEl("form", null, this.parent)
        this.included = []
        this.form.addEventListener("submit", (e)=>{e.preventDefault(); this.onSubmit()})
    }
    createMainModel(str){
        const construct = constructClass(str)
        this.model = {type: str, instance: new construct({}), attributes: []}
    }
    nestModel(modelProperty, str){
        const construct = constructClass(str)
        const nestedModel = {modelProperty, type: str, instance: new construct({}), attributes: []}
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
            if(!this.model.instance[i.modelProperty] ) this.model.instance[i.modelProperty] = []
            
            if(i.modelProperty.slice(-1 == "s") && i.instance.id) this.model.instance[i.modelProperty + "Id"] = i.instance.id
            
            this.model.instance[i.modelProperty].push(i.instance)
            this.populateProperties(i)}
    }
    populateProperties(model){
        for(let a of model.attributes){
            model.instance[a.property] = a.input.value
        }
    }
    async onSubmit(action = "post"){
        this.populateModels()
        
        const toInclude = this.included.map(i=>i.modelProperty)
        const res = await this.model.instance[action](null, toInclude)
        this.afterSubmission(res)
    }
    afterSubmission(){}
}

