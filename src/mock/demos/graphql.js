export var splitGQLType = `
  type Subtraction{
    minute:Int
    minus: Int
    result: Int
  }

  type Compound{
    cardinal:Int
    rate:Int
    periods:Int
    result:Int
  }

  type SplitPage{}{
    subtraction: Subtraction
    compound: Compound
  }
`

export var splitGQLInput =`
  type SubtractionInput{
    minute:Int
    minus: Int
  }

  type CompoundInput{
    cardinal:Int
    rate:Int
    periods:Int
  }
`

export var splitGQLQuery = `
  splitPage():SplitPage!
`

export var splitGQLMutation = `
  subtract(params:SubtractionInput):Subtraction
  compound(params:CompoundInput):Compound
`