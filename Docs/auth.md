# POST : /auth/login

> Require 

    id : 유저 아이디
    Data type : String
      
    password : 유저 비밀번호
    Data type : String
    
> Response : Success

    status : 200
    data : {
        token : String
        auth_type : String
    }

> Response : Fail

    status:401,
    message:"Fail to /auth/login",
    

# POST : /auth/register

> Require : Ward 
    
    id : 유저 아이디
    Data type : String
      
    password : 유저 비밀번호
    Data type : String
      
    name : 유저 이름
    Data type : String
      
    gender : 유저 성별
    Data type : String
              
    auty_type : 'ward'
    Data type : String
    
    
> Response Ward : Success

    status : 200
    data : {
        token : String
    }

> Response Ward : Fail
    
    status : 401
    message : User Already Exist
    
> Require : Guardian 
    
     id : 유저 아이디
    Data type : String
      
    password : 유저 비밀번호
    Data type : String
      
    name : 유저 이름
    Data type : String
      
    ward_id : 피보호자 아이디
    Data type : String
      
    relationship : 피보호자와의 관계
    Data_type : String
              
    auty_type : 'guardian'
    Data type : String
    
> Response Ward : Success

    status : 200
    data : {
        token : String
    }

> Response Ward : Fail
    
    status : 401
    message : User Already Exist
  
> Response Ward : Fail

    status : 404
    message : Ward Id Not Found
    
# GET : /auth/kakao

> Require 
    
    없음
    
> Response

    ㅗ