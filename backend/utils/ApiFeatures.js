class ApiFeatures {
    constructor(query,queryStr){
        this.query = query,
        this.queryStr= queryStr
    }
      
    search(){
        const keyword = this.queryStr.keyword ? {
             name:{
                $regex:this.queryStr.keyword,
                $options:"i"
             }
        }:{};
        // console.log("search ::", this.query);
        this.query = this.query.find({...keyword});
        // console.log("search ::", this.query);
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr} 
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        // console.log("before",queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (key)=> `$${key}` )   
        // console.log("after",queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log("filter ::", this.query);
        return this;   
    }    

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        // console.log("page ::", this.query);
        // console.log("rohit verma");
        return this;
    }

    
}

module.exports = ApiFeatures   ;