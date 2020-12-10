import artilceList from "designer/PageEditor/Toolbox/metas/aritcle/listPage"

export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
          marginTop: 2,
      },
      children: [artilceList]
    },
  ] 
}
