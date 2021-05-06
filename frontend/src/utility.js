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

function addProperty(object, property, getCB, setCB){
    Object.defineProperty(object.prototype, property, {
        get: getCB || function(){
            return this[`_${property}`]
        },
        set: setCB || function(x){
            this[`_${property}`] = x
        }
    })
}

function fromJson(response){
    return response.json()
}

function createEl(type, attributes, parent){
    const el = document.createElement(type)
    for(let a in attributes){el.setAttribute(a, attributes[a])}
    if (parent) parent.append(el)
    return el
}

function moveToActiveZone(element){
    const az = findOrCreateElementById("active-zone", main)
    az.append(element)
}

function findOrCreateElementById(id, parent = document, type="div"){
    const el = parent.querySelector(`#${id}`)
    if (el) return el 
    return createEl(type, {id}, parent)
}
function findOrCreateElementByClass({classAttr, parent = document, type="div"}){
    const el = parent.getElementsByClassName(classAttr)
    if (el) return el 
    return createEl(type, {class: classAttr}, parent)
}

function getStyle(el, cssRule){
    return getComputedStyle(el)[cssRule].match(/\d+/g)
}
