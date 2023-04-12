// rules = {
//     name: [
//         {required:true}
//     ],
//     email:[
//         {required:true ,message:'Xin vui lòng nhập email' },
//         {regexp:'email',message:'Xin vui lòng nhập đúng địa chỉ email'}
//     ]
// }

// form ={
//     name:'Tran Minh Kha',
//     email:'tranminhkha12cb4tqt@gmail.com'
// }

// errorObj={
//     email:'Xin vui lòng nhập đúng địa chỉ email'
// }
const REGEXP ={
    email:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone:/(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    url:/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

const ERROR_MESSAGE={
    required:'Xin vui lòng nhập thông tin',
    regexp:'Xin vui lòng nhập đúng định dạng',
    minMax: (min,max) => `Xin vui lòng nhập ${min}-${max} ký tự`,
    confirm:(field) => `Xin vui lòng điền giống ${field} ở trên`
}

/**
 * 
 * @param {*} rules 
 * @param {*} form 
 * @return plan error object
 */

export const validate = (rules,form) =>{
    const errorObject={}

    for(let name in rules){
        for(let rule of rules[name]){
            if(rule.required){
                if(typeof form[name] === 'boolean' && form[name] || typeof form[name] !== 'boolean' && !form[name]?.trim())
                    {
                        errorObject[name] =rule.message || ERROR_MESSAGE.required
                    }
            }

            if(rule.regexp && form[name]){
                let regexp = rule.regexp
                if(regexp in REGEXP)
                {
                    regexp=REGEXP[regexp]
                }else if(!(regexp instanceof RegExp)) {
                  regexp = new RegExp()
                }

                if(!regexp.test(form[name])){
                    errorObject[name] =rule.message || ERROR_MESSAGE.regexp
                }
            }

            if(rule.min || rule.max) 
            {
                if(form[name]?.length < rule.min || form[name]?.length > rule.max) {
                    errorObject[name] =rule.message || ERROR_MESSAGE.minMax(rule.min,rule.max)

                }
            }
            if(rule.confirm){
                if(form[rule.confirm] !== form[name])
                {
                    errorObject[name] =rule.message || ERROR_MESSAGE.confirm(rule.confirm)

                }
            }

        }
    }


    return errorObject;
}

export const required = (message) =>({
    message,
    required:true
})

export const regexp = (pattern,message) =>({
    regexp:pattern,
    message
})

export const minMax=(min,max ,message) =>({
    min,max,message
})

export const confirmPassword= (field) =>({
    confirm:field
})