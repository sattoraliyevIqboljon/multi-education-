export enum ErrorCodes {
    UnknownError = 10000,
    ValidationError = 11000,

    TeacherAlreadyexists = 12000,
    TeacherNotFound = 12010,
    TeacherInvalidPassword = 12020,
    NotEnoughPermission = 13030,

    RoleAlreadyExists = 13000,
    RoleNotFound = 13010,



    InvalidOtp = 14000,
    OtpNotFound = 14010,
    OtpAlreadyExists = 14020,

    StudentAlreadyexists = 15000,
    StudentNotFound = 15010,
    StudentInvalidPassword = 15020,
    StudentNotEnoughPermission = 15030,

    GroupAlreadyexists = 16000,
    GroupNotFound = 1610,

    CourseAlreadyexists = 17000,
    CourseNotFound = 17010,







    TradeAlreadyexists = 18000,
    TradeNotFound = 18010,

    CategoryAlreadyexists = 19000,
    CategoryNotFound = 19010,

    CountryAlreadyexists = 20000,
    CountryNotFound = 20010,

    DeadlineAlreadyexists = 21000,
    DeadlineNotFound = 21010,

    InvestmentTypeAlreadyexists = 22000,
    InvestmentTypeNotFound = 22010,

    CardsAlreadyExists = 23000,
    CardsNotFound = 23010,

    EmailAlreadyExists = 24000,
    EmailNotFound = 24010,
    EmailInvalidVerify = 24020,

    PassportPhotosAlreadyExists = 25000,
    PassportPhotosNotFound = 25010,

    NewsAlreadyExists = 26000,
    NewsNotFound = 26010,
}