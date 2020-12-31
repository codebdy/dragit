export var splitGQLType = `
  type Subtraction{
    id: ID
    minute:Int
    minus: Int
    result: Int
  }

  type Compound{
    id: ID
    cardinal:Int
    rate:Int
    periods:Int
    result:Int
  }
`

export var splitGQLInput =`
  input SubtractionInput{
    minute:String
    minus: String
  }

  input CompoundInput{
    cardinal:String
    rate:String
    periods:String
  }
`

//export var splitGQLQuery = `
//  splitPage():SplitPage!
//`

export var splitGQLMutation = `
  subtract(params:SubtractionInput):Subtraction
  compound(params:CompoundInput):Compound
`