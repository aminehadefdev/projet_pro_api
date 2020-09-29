class helpers{
    static checkIfDataIsNotEmpty(data, obj, messageError){
        if(data == null || data == '') {
            obj.errors.push(messageError)
            if(obj.status != 401){
                obj.status = 401
            }
            if(obj.success != false){
                obj.success = false
            }
        }
    }
    static checkIfDataIsValide(regex, data, obj, messageError){
        if(!regex.test(data)){
            obj.errors.push(messageError)
            if (obj.status != 401) {
                obj.status = 401
            }
            if(obj.success != false){
                obj.success = false
            }
        }
    }
}

module.exports = helpers