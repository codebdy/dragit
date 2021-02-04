export var productGQLType = `

  enum ProductStatus {
    PUBLISHED
    DRAFT 
  }

  type ProductSpecCategory{
    id:ID
    name:String
  }

  type ProductSpec{
    image:Media
    name:String
    color:String
    category:ProductSpecCategory,
    stock:Int
  }


  type ProductCategory{
    id:ID!
    name:String
    rx_slug:String
    description:String
  }

  type Product{
    id: ID!
    medias: [Media]
    rx_slug: String
    name: String
    auther: String
    categories: [ProductCategory]
    specs:[ProductSpec]
    seoMeta:SeoMeta
    content: String
    status: ProductStatus
    created_at: String
    updated_at: String 
  }

  type Products{
    paginatorInfo:PaginatorInfo!
    data:[Product]
  }

  input ProductCategoryInput{
    id:ID
    name:String
  }

  input ProductInput{
    id: ID
    slug: String
    title: String
    auther: String
    categories: [ProductCategoryInput]
    tags:[String]
    email: String
    shortTitle: String
    seoMeta:SeoMetaInput
    content: String
    order: String
    status: String
    medias:[MediaInput]
  }
`

export var productGQLQuery = `
  products(first: Int!, page: Int, where:JSON, orderBy:JSON):Products!
  product(id:ID):Product
`

export var productGQLMutation = `
  removeProducts(ids:[ID]):[Product]
  updateProducts(product:ProductInput, ids:[ID] ):[Product]
  saveProduct(product:ProductInput):Product
`