# User Schema

> id

    type : String
    유저 아이디를 의미합니다

> password

    type : String
    유저 비밀번호를 의미합니다
    
> token

    type : String
    유저 토큰을 의미합니다

> name

    type : String
    유저 이름을 의미합니다
    
> flowerpot

    유저 화분 Object입니다
    
>> temperature
    
    화분 주변 온도 Object입니다
    
>>> normal_data

    type : Number
    화분 주변 온도 값입니다
    
>>> standard_data

    type : Number
    화분 적정 온도입니다 
    
>>> average_data

    type : Number
    
    5 : 식물 적정 온도와 10도 이상 차이날 경우   (매우 나쁨)
    4 : 식물 적정 온도와 6도 이상 차이날 경우    (나쁨)     
    3 : 식물 적정 온도와 4도 이상 차이날 경우    (보통)
    2 : 식물 적정 온도와 2도 이상 차이날 경우    (좋음)
    1 : 식물 적정 온도와 0도 이상 차이날 경우    (매우좋음) 

>> flowerpot_humidity

    화분 토양 습도 Object입니다
    
>>> normal data

    type : Number
    화분 토양 습도 값입니다
    
>>> average_data

    type : Number
    
    5 : 0  ~ 20%  (매우 나쁨)
    4 : 21 ~ 40%  (나쁨)   
    3 : 41 ~ 60%  (보통)
    2 : 61 ~ 80%  (좋음)
    1 : 81 ~ 100% (매우좋음)
    
>> periphery_humidity

    화분 주변 습도 Object입니다
    
>>> normal data

    type : Number
    화분 주변 습도 값입니다
    
>>> average_data

    type : Number
    
    5 : 0  ~ 20%  (매우 나쁨)
    4 : 21 ~ 40%  (나쁨)   
    3 : 41 ~ 60%  (보통)
    2 : 61 ~ 80%  (좋음)
    1 : 81 ~ 100% (매우좋음)