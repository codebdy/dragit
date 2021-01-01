export var splitGQLType = `
  type Subtraction{
    minute:Float
    minus: Float
    result: Float
  }

  type Compound{
    cardinal:Float
    rate:Float
    periods:Float
    result:String
  }
`

export var splitGQLInput =`
  input SubtractionInput{
    minute: Float
    minus: Float
  }

  input CompoundInput{
    cardinal:Float
    rate:Float
    periods:Float
  }
`

//export var splitGQLQuery = `
//  splitPage():SplitPage!
//`

export var splitGQLMutation = `
  subtract(params:SubtractionInput):Subtraction
  compound(params:CompoundInput):Compound
`