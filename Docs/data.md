# GET : /data/ward

> Require 

    token : 유저 토큰을 의미합니다
    
> Response : Success

    status : 200
    data : 유저 데이터

> Response : Fail

    status : 401
    message : Unauthorized Token

# GET : /data/flowerpot

> Require 

    token : 유저 토큰을 의미합니다
    
    로그인이 되있는 상태에만 가능합니다
    
> Response : Success

    status : 200
    data : 유저 데이터

> Response : Fail

    status : 401
    message : Unauthorized Token

> Response : Fail

    status : 404
    message : FlowerPot Data Not Found\
    
    유저가 기기등록이 안되있을때 뜨는 오류

