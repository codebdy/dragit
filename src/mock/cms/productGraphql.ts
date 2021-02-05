export var productGQLType = `

  enum ProductStatus {
    PUBLISHED
    DRAFT 
  }

  type ProductSpecCategory{
    id:ID
    name:String
  }
  input ProductSpecCategoryInput{
    id:ID
    name:String
  }

  type ProductSpec{
    id:ID
    image:Media
    name:String
    color:String
    category:ProductSpecCategory
    stock:Int
  }


  input ProductCategoryInput{
    id:ID
    name:String
    rx_slug:String
    description:String
  }

  input ProductSpecInput{
    id:ID
    image:MediaInput
    name:String
    color:String
    category:ProductSpecCategoryInput
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
    order:String
    content: String
    status: ProductStatus
    created_at: String
    updated_at: String 
  }

  type Products{
    paginatorInfo:PaginatorInfo!
    data:[Product]
  }


  input ProductInput{
    id: ID
    medias: [MediaInput]
    rx_slug: String
    name: String
    auther: String
    categories: [ProductCategoryInput]
    specs:[ProductSpecInput]
    seoMeta:SeoMetaInput
    order:String
    content: String
    status: ProductStatus
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