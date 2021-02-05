export var enquiryGQLType = `
  type Enquiry {
    id:ID!
    name:String
    email:String
    company:String
    content: String
    already_read:Boolean
    created_at:String
  }

  type Enquirys{
    paginatorInfo:PaginatorInfo!
    data:[Enquiry]
  }
`

export var enquiryGQLInput =`
  input EnquiryInput{
    id:ID
    name:String
    email:String
    company:String
    content: String
    already_read:Boolean
    created_at:String
  }
`

export var enquiryGQLQuery = `
  enquiries(first: Int!, page: Int, where:JSON, orderBy:JSON):Enquirys!
`

export var enquiryGQLMutation = `
  readEnquiry(id:ID):Enquiry
  removeEnquiries(ids:[ID]):[Enquiry]
`