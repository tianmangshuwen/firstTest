

<script>
export default {
  name: 'testVue',
  render(h){
      return h('div',{attrs:{id:'test'}},this.msg)

  },
  data () {
    console.log("thisrender:",this)
    return {
      msg: 'hello!'
    }
  }
}
</script>